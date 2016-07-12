
\copy staticdata.section (name,code) FROM 'C:\reason_stuff\dbtables\section.csv' WITH DELIMITER ',' CSV HEADER


\copy staticdata.station (name) FROM 'C:\reason_stuff\dbtables\station.csv' WITH DELIMITER ',' CSV HEADER


\copy staticdata.staff (staff_id,call_sign,firstname,surname,phone,section_id,station_id,role) FROM 'C:\reason_stuff\dbtables\staff.csv' WITH DELIMITER ',' CSV HEADER


\copy staticdata.fault_codes (code,description,section_id) FROM 'C:\reason_stuff\dbtables\fault_codes.csv' WITH DELIMITER ',' CSV HEADER


\copy staticdata.zone (name) FROM 'C:\reason_stuff\dbtables\zone.csv' WITH DELIMITER ',' CSV HEADER


\copy staticdata.suburb (name,zone_id) FROM 'C:\reason_stuff\dbtables\suburb.csv' WITH DELIMITER ',' CSV HEADER


\copy staticdata.fire_codes (description) FROM 'C:\reason_stuff\dbtables\fire_codes.csv' WITH DELIMITER ',' CSV HEADER


\copy staticdata.vehicle (vehicle_id,name,type,station_id,radio) FROM 'C:\reason_stuff\dbtables\vehicle.csv' WITH DELIMITER ',' CSV HEADER


\copy staticdata.emergency_codes (description) FROM 'C:\reason_stuff\dbtables\emergency_codes.csv' WITH DELIMITER ',' CSV HEADER


\copy staticdata.caller (caller_id,firstname,surname,phone) FROM 'C:\reason_stuff\dbtables\caller.csv' WITH DELIMITER ',' CSV HEADER


\copy engineering.call (call_id,code_id,caller_id,stand_no,street,suburb_id,reported_on,description,severity,property_damage) FROM 'C:\reason_stuff\dbtables\engineering_call.csv' WITH DELIMITER ',' CSV HEADER
