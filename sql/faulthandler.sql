
--function to handle fault reporting
CREATE OR REPLACE FUNCTION fault_handler(codeid INTEGER, fname TEXT, sname TEXT, phn TEXT, stdno INTEGER, strt TEXT, suburbid INTEGER, natid TEXT, prpdmg INTEGER, dscrp TEXT)
	RETURNS TEXT AS 
	$$
		DECLARE 
			callerid staticdata.caller.caller_id%TYPE;	
			callid engineering.call.call_id%TYPE;
		BEGIN
			SELECT INTO callerid SETVAL('staticdata.caller_caller_id_seq', (SELECT MAX(caller_id) FROM staticdata.caller));
			INSERT INTO staticdata.caller(firstname, surname, nid, phone)
				VALUES(UPPER(fname), UPPER(sname), UPPER(natid), phn);
			SELECT INTO callid SETVAL('engineering.call_call_id_seq', (SELECT MAX(call_id) FROM engineering.call));
			INSERT INTO engineering.call(code_id, caller_id, stand_no, street, suburb_id, property_damage, reported_on, description) 
				VALUES(codeid, callerid+1, stdno, UPPER(strt), suburbid, prpdmg, now(), UPPER(dscrp));
			RETURN TRUE;
		END;
	$$ 
	LANGUAGE plpgsql;


--function to handle fault updates
CREATE OR REPLACE FUNCTION fault_upd(callid INTEGER, codeid INTEGER, callerid INTEGER, fname TEXT, sname TEXT, phn TEXT, stdno INTEGER, strt TEXT, suburbid INTEGER, natid TEXT, prpdmg INTEGER, dscrp TEXT)
	RETURNS TEXT AS 
	$$
		BEGIN
			UPDATE staticdata.caller SET firstname = UPPER(fname), surname = UPPER(sname), nid = UPPER(natid), phone = phn
				WHERE caller_id = callerid;
			UPDATE engineering.call SET code_id = codeid, caller_id = callerid, stand_no = stdno, street = UPPER(strt), suburb_id = suburbid, property_damage = prpdmg, description = UPPER(dscrp)
				WHERE call_id = callid;
			RETURN TRUE;
		END;
	$$ 
	LANGUAGE plpgsql;


--function to handle fault jobs
--DROP FUNCTION job_handler(INTEGER, TEXT, TEXT, INTEGER [], INTEGER [], TEXT, JOBSTATUS);
CREATE OR REPLACE FUNCTION job_handler(jobid INTEGER, suburbid INTEGER, stationid INTEGER, newcalls INTEGER [], newstaff INTEGER [], createdby TEXT, newstatus JOBSTATUS, location TEXT)
	RETURNS TEXT AS 
	$$
		DECLARE 
			c INTEGER;
			s INTEGER;
			d BOOL;
			oldcalls INTEGER [];
			oldstaff INTEGER [];
		BEGIN
			SELECT INTO d true FROM engineering.job WHERE job_id = jobid;
			IF d THEN --update query--
				SELECT INTO oldcalls ARRAY(SELECT call_id FROM engineering.call WHERE job_id = jobid);
				SELECT INTO oldstaff ARRAY(SELECT staff_id FROM engineering.assignment WHERE job_id = jobid);
				FOREACH c IN ARRAY oldcalls
				LOOP
					IF NOT (c = ANY (newcalls)) THEN --remove old call from job--
						UPDATE engineering.call
							SET job_id = NULL, status = 'OPEN'
							WHERE call_id = c;
					END IF;
				END LOOP;
				FOREACH s IN ARRAY oldstaff
				LOOP
					IF NOT (s = ANY (newstaff)) THEN --remove old staff from job--
						DELETE FROM engineering.assignment
							WHERE job_id = jobid AND staff_id = s;
						UPDATE staticdata.staff
							SET status = 'AVAILABLE'
							WHERE staff_id = s;
					END IF;
				END LOOP;
				FOREACH c IN ARRAY newcalls
				LOOP
					IF NOT (c = ANY (oldcalls)) THEN --add new call to job--
						UPDATE engineering.call
							SET job_id = jobid, status = 'PENDING'
							WHERE call_id = c;
					END IF;
				END LOOP;
				FOREACH s IN ARRAY newstaff
				LOOP
					IF NOT (s = ANY (oldstaff)) THEN --add new staff to job--
						INSERT INTO engineering.assignment(job_id, staff_id)
							VALUES(jobid, s);
						UPDATE staticdata.staff
							SET status = 'BUSY'
							WHERE staff_id = s;
					END IF;
				END LOOP;
				IF newstatus = 'ASSIGNED' THEN --update and assign job
					UPDATE engineering.job
						SET status = newstatus, station_id = stationid, geom = ST_POINTFROMTEXT(location::text, 32735)
						WHERE job_id = jobid;
				ELSE --update job without assigning
					UPDATE engineering.job
						SET status = newstatus, geom = ST_POINTFROMTEXT(location::text, 32735)
						WHERE job_id = jobid;
				END IF;
			ELSE --insert query--
				IF newstatus = 'ASSIGNED' THEN --create and assign job
					INSERT INTO engineering.job(job_id, status, suburb_id, station_id, opened_by, geom)
						VALUES(jobid, newstatus, suburbid, stationid, createdby, ST_POINTFROMTEXT(location::text, 32735));
					FOREACH s IN ARRAY newstaff
					LOOP
						INSERT INTO engineering.assignment(job_id, staff_id)
							VALUES(jobid, s);
						UPDATE staticdata.staff
							SET status = 'BUSY'
							WHERE staff_id = s;
					END LOOP;
				ELSE --create job without assigning
					INSERT INTO engineering.job(job_id, status, suburb_id, opened_by, geom)
						VALUES(jobid, newstatus, suburbid, createdby, ST_POINTFROMTEXT(location::text, 32735));
				END IF;
				FOREACH c IN ARRAY newcalls
				LOOP
					UPDATE engineering.call
						SET job_id = jobid, status = 'PENDING'
						WHERE call_id = c;
				END LOOP;				
			END IF;
			RETURN TRUE;
		END;
	$$ 
	LANGUAGE plpgsql;

--function to handle job updates
CREATE OR REPLACE FUNCTION job_closer()
  RETURNS TRIGGER AS 
  $$
    DECLARE    	
		oldstaff INTEGER [];
		s INTEGER;
    BEGIN
		SELECT INTO oldstaff ARRAY(SELECT staff_id FROM engineering.assignment WHERE job_id = NEW.job_id);
    	IF NEW.status ='CLOSED' THEN
       		NEW.closed_on = CURRENT_TIMESTAMP;
       		UPDATE engineering.call
       			SET status = 'CLOSED'
       			WHERE job_id = NEW.job_id;
			FOREACH s IN ARRAY oldstaff
			LOOP
				--remove old staff from job--
				UPDATE staticdata.staff
					SET status = 'AVAILABLE'
					WHERE staff_id = s;
			END LOOP;
       	ELSIF NEW.status ='CANCELLED' THEN
       		NEW.closed_on = CURRENT_TIMESTAMP;
       		UPDATE engineering.call
       			SET status = 'OPEN', job_id = NULL
       			WHERE job_id = NEW.job_id;
			FOREACH s IN ARRAY oldstaff
			LOOP
				--remove old staff from job--
				DELETE FROM engineering.assignment
					WHERE job_id = NEW.job_id AND staff_id = s;
				UPDATE staticdata.staff
					SET status = 'AVAILABLE'
					WHERE staff_id = s;
			END LOOP;
       	END IF;
    	RETURN NEW;
    END;
  $$ 
  LANGUAGE plpgsql;

--function to handle static table inserts
CREATE OR REPLACE FUNCTION serial_pk()
  RETURNS TRIGGER AS 
  $$
  	DECLARE
  		pk INTEGER;
    BEGIN
    	CASE TG_TABLE_NAME
    		WHEN 'emergency_codes' THEN 
    			SELECT INTO pk MAX(code_id) + 1 FROM staticdata.emergency_codes;
    			NEW.code_id = pk;
    		WHEN 'fault_codes' THEN 
    			SELECT INTO pk MAX(code_id) + 1 FROM staticdata.fault_codes;
    			NEW.code_id = pk;
    		WHEN 'fire_codes' THEN 
    			SELECT INTO pk MAX(code_id) + 1 FROM staticdata.fire_codes;
    			NEW.code_id = pk;
    		WHEN 'property' THEN 
    			SELECT INTO pk MAX(property_id) + 1 FROM staticdata.property;
    			NEW.property_id = pk;
    		WHEN 'section' THEN 
    			SELECT INTO pk MAX(section_id) + 1 FROM staticdata.section;
    			NEW.section_id = pk;
    		WHEN 'staff' THEN 
    			SELECT INTO pk MAX(staff_id) + 1 FROM staticdata.staff;
    			NEW.staff_id = pk;
    		WHEN 'station' THEN 
    			SELECT INTO pk MAX(station_id) + 1 FROM gis.station;
    			NEW.station_id = pk;
    		WHEN 'suburb' THEN 
    			SELECT INTO pk MAX(suburb_id) + 1 FROM gis.suburb;
    			NEW.suburb_id = pk;
    		WHEN 'vehicle' THEN 
    			SELECT INTO pk MAX(vehicle_id) + 1 FROM staticdata.vehicle;
    			NEW.vehicle_id = pk;
    		WHEN 'fire_catchment' THEN 
    			SELECT INTO pk MAX(catch_id) + 1 FROM gis.fire_catchment;
    			NEW.catch_id = pk;
    		WHEN 'sewer_catchment' THEN 
    			SELECT INTO pk MAX(catch_id) + 1 FROM gis.sewer_catchment;
    			NEW.catch_id = pk;
    		WHEN 'water_catchment' THEN 
    			SELECT INTO pk MAX(catch_id) + 1 FROM gis.water_catchment;
    			NEW.catch_id = pk;
    		WHEN 'road' THEN 
    			SELECT INTO pk MAX(gid) + 1 FROM gis.road;
    			NEW.gid = pk;
    		WHEN 'user' THEN 
    			SELECT INTO pk MAX(id) + 1 FROM security.user;
    			NEW.id = pk;
    	END CASE; 
    	RETURN NEW;
    END;
  $$ 
  LANGUAGE plpgsql;

--trigger for job_closer

CREATE TRIGGER close_job
	BEFORE UPDATE ON engineering.job
		FOR EACH ROW EXECUTE PROCEDURE job_closer();

--triggers for staticdata inserts

CREATE TRIGGER serial_ec BEFORE INSERT ON staticdata.emergency_codes FOR EACH ROW EXECUTE PROCEDURE serial_pk();
CREATE TRIGGER serial_ftc BEFORE INSERT ON staticdata.fault_codes FOR EACH ROW EXECUTE PROCEDURE serial_pk();
CREATE TRIGGER serial_frc BEFORE INSERT ON staticdata.fire_codes FOR EACH ROW EXECUTE PROCEDURE serial_pk();
CREATE TRIGGER serial_pt BEFORE INSERT ON staticdata.property FOR EACH ROW EXECUTE PROCEDURE serial_pk();
CREATE TRIGGER serial_sx BEFORE INSERT ON staticdata.section FOR EACH ROW EXECUTE PROCEDURE serial_pk();
CREATE TRIGGER serial_stf BEFORE INSERT ON staticdata.staff FOR EACH ROW EXECUTE PROCEDURE serial_pk();
CREATE TRIGGER serial_stn BEFORE INSERT ON gis.station FOR EACH ROW EXECUTE PROCEDURE serial_pk();
CREATE TRIGGER serial_sb BEFORE INSERT ON gis.suburb FOR EACH ROW EXECUTE PROCEDURE serial_pk();
CREATE TRIGGER serial_vh BEFORE INSERT ON staticdata.vehicle FOR EACH ROW EXECUTE PROCEDURE serial_pk();
CREATE TRIGGER serial_fc BEFORE INSERT ON gis.fire_catchment FOR EACH ROW EXECUTE PROCEDURE serial_pk();
CREATE TRIGGER serial_sc BEFORE INSERT ON gis.sewer_catchment FOR EACH ROW EXECUTE PROCEDURE serial_pk();
CREATE TRIGGER serial_wc BEFORE INSERT ON gis.water_catchment FOR EACH ROW EXECUTE PROCEDURE serial_pk();
CREATE TRIGGER serial_rd BEFORE INSERT ON gis.road FOR EACH ROW EXECUTE PROCEDURE serial_pk();
CREATE TRIGGER serial_us BEFORE INSERT ON security.user FOR EACH ROW EXECUTE PROCEDURE serial_pk();

BEGIN;
	SELECT fault_handler
		('SB','MRS','NCUBE','772655306',7598,'joseph msipa st','Nkulumane',1,'t','PASSED TO MR SITHOLE AT 0746HRS AND HE STATED WILL ATTEND');
	SELECT fault_handler
		('BF','Mrs a','Khumalo','776775523',3977,NULL,'Iminyela',1,'t','PASSED TO MR SITHOLE AT 0746HRS AND HE STATED WILL ATTEND');
	SELECT fault_handler
		('BM','precious','mthupa','09269673',39,'moyana rd','Iminyela',1,'f','annual maintenance due');
	SELECT job_handler
		(1, '{1}', 'reason');
	SELECT job_handler
		(2, '{2}', 'reason');
	SELECT job_handler
		(3, '{3,4}', 'brian');
COMMIT;

SELECT fault_upd
		(3,'BF',3,'Mrs a','Khumalo','776775523',3977,'dumbuchena st','Iminyela',1,'t','PASSED TO MR SITHOLE AT 0746HRS AND HE STATED WILL ATTEND');


