INSERT INTO engineering.dashboardcalls (station_id)
	VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9);
	
--function to retrieve element partner from a 2d array
CREATE OR REPLACE FUNCTION array_search(needle ANYELEMENT, haystack ANYARRAY)
	RETURNS INT AS 
	$$
		DECLARE 
			a INTEGER;
		BEGIN
			SELECT INTO a i 
				FROM GENERATE_SUBSCRIPTS($2,1) AS i
				WHERE $2[i][1] = $1
				ORDER BY i;
			RETURN $2[a][2];
		END;
	$$ 
	LANGUAGE plpgsql;
	
--function to search for element in array subset
CREATE OR REPLACE FUNCTION array_search2(needle ANYELEMENT, haystack ANYARRAY)
	RETURNS BOOL AS 
	$$
		DECLARE 
			a BOOL := 'f';
		BEGIN
			SELECT INTO a TRUE 
				FROM GENERATE_SUBSCRIPTS($2,1) AS i
				WHERE $2[i][1] = $1
				ORDER BY i;
			RETURN a;
		END;
	$$ 
	LANGUAGE plpgsql;

--function to handle dashboard updates
CREATE OR REPLACE FUNCTION dashboard_upd()
	RETURNS TEXT AS 
	$$
		DECLARE 
			o INTEGER := 0;
			p INTEGER := 0;
			c INTEGER := 0;
			o24 INTEGER;
			o48 INTEGER;
			o72 INTEGER;
			o96 INTEGER;
			p24 INTEGER;
			p48 INTEGER;
			p72 INTEGER;
			p96 INTEGER;
			c24 INTEGER;
			c48 INTEGER;
			c72 INTEGER;
			c96 INTEGER;
			oc INTEGER [];
			rec RECORD;
		BEGIN
			SELECT INTO oc ARRAY(SELECT DISTINCT suburb_id FROM engineering.call WHERE suburb_id < 19 ORDER BY suburb_id);--to revise query after sorting out catchments
			
			FOR rec IN SELECT DISTINCT suburb_id FROM staticdata.suburb WHERE suburb_id < 19 ORDER BY suburb_id--same as above
			LOOP
				SELECT INTO o COALESCE(COUNT(call_id), 0) FROM engineering.call WHERE status = 'OPEN' AND suburb_id = rec.suburb_id;
				SELECT INTO p COALESCE(COUNT(call_id), 0) FROM engineering.call WHERE status = 'PENDING' AND suburb_id = rec.suburb_id;
				SELECT INTO c COALESCE(COUNT(call_id), 0) FROM engineering.call WHERE status = 'CLOSED' AND suburb_id = rec.suburb_id;-- SHOULD GET ONLY CLOSED ON THIS DAY
					
				SELECT INTO o24 COALESCE(COUNT(call_id), 0) FROM engineering.call WHERE status = 'OPEN' AND suburb_id = rec.suburb_id AND (CURRENT_TIMESTAMP - reported_on) < INTERVAL '24 hours';
				SELECT INTO o48 COALESCE(COUNT(call_id), 0) FROM engineering.call WHERE status = 'OPEN' AND suburb_id = rec.suburb_id AND (CURRENT_TIMESTAMP - reported_on) BETWEEN INTERVAL '24 hours' AND INTERVAL '47 hours';
				SELECT INTO o72 COALESCE(COUNT(call_id), 0) FROM engineering.call WHERE status = 'OPEN' AND suburb_id = rec.suburb_id AND (CURRENT_TIMESTAMP - reported_on) BETWEEN INTERVAL '48 hours' AND INTERVAL '72 hours';
				SELECT INTO o96 COALESCE(COUNT(call_id), 0) FROM engineering.call WHERE status = 'OPEN' AND suburb_id = rec.suburb_id AND (CURRENT_TIMESTAMP - reported_on) > INTERVAL '72 hours';
					
				SELECT INTO p24 COALESCE(COUNT(call_id), 0) FROM engineering.call WHERE status = 'PENDING' AND suburb_id = rec.suburb_id AND (CURRENT_TIMESTAMP - reported_on) < INTERVAL '24 hours';
				SELECT INTO p48 COALESCE(COUNT(call_id), 0) FROM engineering.call WHERE status = 'PENDING' AND suburb_id = rec.suburb_id AND (CURRENT_TIMESTAMP - reported_on) BETWEEN INTERVAL '24 hours' AND INTERVAL '47 hours';
				SELECT INTO p72 COALESCE(COUNT(call_id), 0) FROM engineering.call WHERE status = 'PENDING' AND suburb_id = rec.suburb_id AND (CURRENT_TIMESTAMP - reported_on) BETWEEN INTERVAL '48 hours' AND INTERVAL '72 hours';
				SELECT INTO p96 COALESCE(COUNT(call_id), 0) FROM engineering.call WHERE status = 'PENDING' AND suburb_id = rec.suburb_id AND (CURRENT_TIMESTAMP - reported_on) > INTERVAL '72 hours';
					
				SELECT INTO c24 COALESCE(COUNT(call_id), 0) FROM engineering.call WHERE status = 'CLOSED' AND suburb_id = rec.suburb_id AND (last_update - reported_on) < INTERVAL '24 hours';
				SELECT INTO c48 COALESCE(COUNT(call_id), 0) FROM engineering.call WHERE status = 'CLOSED' AND suburb_id = rec.suburb_id AND (last_update - reported_on) BETWEEN INTERVAL '24 hours' AND INTERVAL '47 hours';
				SELECT INTO c72 COALESCE(COUNT(call_id), 0) FROM engineering.call WHERE status = 'CLOSED' AND suburb_id = rec.suburb_id AND (last_update - reported_on) BETWEEN INTERVAL '48 hours' AND INTERVAL '72 hours';
				SELECT INTO c96 COALESCE(COUNT(call_id), 0) FROM engineering.call WHERE status = 'CLOSED' AND suburb_id = rec.suburb_id AND (last_update - reported_on) > INTERVAL '72 hours';
				
				INSERT INTO engineering.dashboardcalls (station_id, open_calls, pending_calls, closed_calls, total_calls, hr24, hr48, hr72, hr96, rec_date)
					VALUES (rec.suburb_id, o, p, c, o+p+c, ARRAY[o24,p24,c24], ARRAY[o48,p48,c48], ARRAY[o72,p72,c72], ARRAY[o96,p96,c96], CURRENT_DATE);
			END LOOP;
			RETURN TRUE;
		END;
	$$ 
	LANGUAGE plpgsql;