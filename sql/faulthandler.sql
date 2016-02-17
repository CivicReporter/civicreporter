
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
CREATE OR REPLACE FUNCTION job_handler(callid INTEGER, createdby TEXT)
	RETURNS TEXT AS 
	$$
		DECLARE
			jobid engineering.job.job_id%TYPE;
		BEGIN
		/*	IF TG_OP = 'INSERT' THEN
				INSERT INTO engineering.job(call_id, opened_on, last_update) 
				VALUES(NEW.call_id, now(),now());
			ELSIF TG_OP = 'DELETE' THEN
				DELETE FROM engineering.job
				WHERE call_id = OLD.call_id;
			END IF;
		*/
			INSERT INTO engineering.job(opened_by)
				VALUES(createdby);
			SELECT INTO jobid SETVAL('engineering.job_job_id_seq', (SELECT MAX(job_id) FROM engineering.job));
			UPDATE engineering.call
				SET job_id = jobid
				WHERE call_id = callid;
			RETURN TRUE;
		END;
	$$ 
	LANGUAGE plpgsql;

--function to handle job updates
CREATE OR REPLACE FUNCTION job_closer()
  RETURNS TRIGGER AS 
  $$
    BEGIN
    	IF NEW.status IN ('CLOSED','CANCELLED') THEN
       		NEW.closed_on = CURRENT_TIMESTAMP;
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
	SELECT job_handler
		(1, 'reason');
	SELECT job_handler
		(2, 'reason');
	SELECT job_handler
		(3, 'brian');
COMMIT;

SELECT fault_upd
		(3,'BF',3,'Mrs a','Khumalo','776775523',3977,'dumbuchena st','Iminyela',1,'t','PASSED TO MR SITHOLE AT 0746HRS AND HE STATED WILL ATTEND');


