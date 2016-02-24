
--function to handle fault reporting
CREATE OR REPLACE FUNCTION fault_handler(cod TEXT, fname TEXT, sname TEXT, phn TEXT, stdno INTEGER, strt TEXT, subb TEXT, svrty INTEGER, prpdmg BOOL, dscrp TEXT)
	RETURNS TEXT AS 
	$$
		DECLARE 
			callerid staticdata.caller.caller_id%TYPE;
			suburbid staticdata.suburb.suburb_id%TYPE;	
			callid engineering.call.call_id%TYPE;
			codeid staticdata.fault_codes.code_id%TYPE;
		BEGIN
			SELECT INTO callerid SETVAL('staticdata.caller_caller_id_seq', (SELECT MAX(caller_id) FROM staticdata.caller));
			INSERT INTO staticdata.caller(firstname, surname, phone)
				VALUES(UPPER(fname), UPPER(sname), phn);
			SELECT INTO suburbid suburb_id FROM staticdata.suburb WHERE name = UPPER(subb);
			SELECT INTO codeid code_id FROM staticdata.fault_codes WHERE code = UPPER(cod);
			SELECT INTO callid SETVAL('engineering.call_call_id_seq', (SELECT MAX(call_id) FROM engineering.call));
			INSERT INTO engineering.call(code_id, caller_id, stand_no, street, suburb_id, severity, property_damage, reported_on, description) 
				VALUES(codeid, callerid+1, stdno, UPPER(strt), suburbid, svrty, prpdmg, now(), UPPER(dscrp));
			RETURN TRUE;
		END;
	$$ 
	LANGUAGE plpgsql;


--function to handle fault updates
CREATE OR REPLACE FUNCTION fault_upd(callid INTEGER, cod TEXT, callerid INTEGER, fname TEXT, sname TEXT, phn TEXT, stdno INTEGER, strt TEXT, subb TEXT, svrty INTEGER, prpdmg BOOL, dscrp TEXT)
	RETURNS TEXT AS 
	$$
		DECLARE 
			suburbid staticdata.suburb.suburb_id%TYPE;	
			codeid staticdata.fault_codes.code_id%TYPE;
		BEGIN
			UPDATE staticdata.caller SET firstname = UPPER(fname), surname = UPPER(sname), phone = phn
				WHERE caller_id = callerid;
			SELECT INTO suburbid suburb_id FROM staticdata.suburb WHERE name = UPPER(subb);
			SELECT INTO codeid code_id FROM staticdata.fault_codes WHERE code = UPPER(cod);
			UPDATE engineering.call SET code_id = codeid, caller_id = callerid, stand_no = stdno, street = UPPER(strt), suburb_id = suburbid, severity = svrty, property_damage = prpdmg, description = UPPER(dscrp)
				WHERE call_id = callid;
			RETURN TRUE;
		END;
	$$ 
	LANGUAGE plpgsql;


--function to handle fault jobs
CREATE OR REPLACE FUNCTION job_handler(jobid INTEGER, subb TEXT ,newcalls INTEGER [], createdby TEXT)
	RETURNS TEXT AS 
	$$
		DECLARE 
			c INTEGER;
			d BOOL;
			oldcalls INTEGER [];
			suburbid staticdata.suburb.suburb_id%TYPE;
		BEGIN
			SELECT INTO d true FROM engineering.job WHERE job_id = jobid;
			IF d THEN --update query--
				SELECT INTO oldcalls ARRAY(SELECT call_id FROM engineering.call WHERE job_id = jobid);
				FOREACH c IN ARRAY oldcalls
				LOOP
					IF NOT (c = ANY (newcalls)) THEN --remove old call from job--
						UPDATE engineering.call
							SET job_id = NULL, status = 'OPEN'
							WHERE call_id = c;
					END IF;
				END LOOP;
				FOREACH c IN ARRAY newcalls
				LOOP
					UPDATE engineering.call
						SET job_id = jobid, status = 'PENDING'
						WHERE call_id = c;
				END LOOP;
			ELSE --insert query--
				SELECT INTO suburbid suburb_id FROM staticdata.suburb WHERE name = UPPER(subb);
				INSERT INTO engineering.job(job_id, suburb_id, opened_by)
					VALUES(jobid, suburbid, createdby);
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
    BEGIN
    	IF NEW.status ='CLOSED' THEN
       		NEW.closed_on = CURRENT_TIMESTAMP;
       		UPDATE engineering.call
       			SET status = 'CLOSED'
       			WHERE job_id = NEW.job_id;
       	ELSIF NEW.status ='CANCELLED' THEN
       		NEW.closed_on = CURRENT_TIMESTAMP;
       		UPDATE engineering.call
       			SET status = 'OPEN', job_id = NULL
       			WHERE job_id = NEW.job_id;
       	END IF;
      RETURN NEW;
    END;
  $$ 
  LANGUAGE plpgsql;

--trigger for job_closer

CREATE TRIGGER close_job
	BEFORE UPDATE ON engineering.job
		FOR EACH ROW EXECUTE PROCEDURE job_closer();


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


