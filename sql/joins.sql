DROP FUNCTION job_handler(INTEGER, TEXT, TEXT, INTEGER [], INTEGER [], TEXT, JOBSTATUS);
CREATE OR REPLACE FUNCTION job_handler(jobid INTEGER, subb TEXT, stn TEXT, newcalls INTEGER [], newstaff INTEGER [], createdby TEXT, newstatus JOBSTATUS)
	RETURNS TEXT AS 
	$$
		DECLARE 
			c INTEGER;
			s INTEGER;
			d BOOL;
			oldcalls INTEGER [];
			oldstaff INTEGER [];
			suburbid staticdata.suburb.suburb_id%TYPE;
			stationid staticdata.station.station_id%TYPE;
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
				SELECT INTO stationid station_id FROM staticdata.station WHERE name = UPPER(stn);
				UPDATE engineering.job
					SET status = newstatus, station_id = stationid
					WHERE job_id = jobid;
			ELSE --insert query--
				SELECT INTO suburbid suburb_id FROM staticdata.suburb WHERE name = UPPER(subb);
				IF newstatus = 'PENDING' THEN --create and assign job
					SELECT INTO stationid station_id FROM staticdata.station WHERE name = UPPER(stn);
					INSERT INTO engineering.job(job_id, status, suburb_id, station_id, opened_by)
						VALUES(jobid, newstatus, suburbid, stationid, createdby);
				ELSE --create job without assigning
					INSERT INTO engineering.job(job_id, status, suburb_id, opened_by)
						VALUES(jobid, newstatus, suburbid, createdby);
					FOREACH s IN ARRAY newstaff
					LOOP
						INSERT INTO engineering.assignment(job_id, staff_id)
							VALUES(jobid, s);
						UPDATE staticdata.staff
							SET status = 'BUSY'
							WHERE staff_id = s;
					END LOOP;
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
