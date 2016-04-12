-- MySQL Script generated by MySQL Workbench
-- 10/31/15 12:16:26
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

-- -----------------------------------------------------
-- Trigger function for updating timestamps
-- -----------------------------------------------------

CREATE OR REPLACE FUNCTION upd_time()
  RETURNS TRIGGER AS 
  $$
    BEGIN
       NEW.last_update = CURRENT_TIMESTAMP;
      RETURN NEW;
    END;
  $$ 
  LANGUAGE plpgsql;

-- -----------------------------------------------------
-- Special data type for job status
-- -----------------------------------------------------
DROP TYPE IF EXISTS jobstatus CASCADE;


CREATE TYPE jobstatus
  AS ENUM ('OPEN','PENDING','CLOSED','CANCELLED');

CREATE TYPE staffstatus
  AS ENUM ('OFF DUTY','BUSY','AVAILABLE','STANDBY'); 


-- -----------------------------------------------------
-- Schema staticdata
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS staticdata CASCADE;


CREATE SCHEMA IF NOT EXISTS staticdata;



-- -----------------------------------------------------
-- Table staticdata.section
-- -----------------------------------------------------
DROP TABLE IF EXISTS staticdata.section ;


CREATE TABLE IF NOT EXISTS staticdata.section (
  section_id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  code VARCHAR(45) NOT NULL,
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (section_id)
);


CREATE TRIGGER upd_section BEFORE UPDATE ON staticdata.section FOR EACH ROW EXECUTE PROCEDURE upd_time();

-- -----------------------------------------------------
-- Table staticdata.station
-- -----------------------------------------------------
DROP TABLE IF EXISTS staticdata.station ;


CREATE TABLE IF NOT EXISTS staticdata.station (
  station_id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (station_id)
);


CREATE TRIGGER upd_station BEFORE UPDATE ON staticdata.station FOR EACH ROW EXECUTE PROCEDURE upd_time();

-- -----------------------------------------------------
-- Table staticdata.staff
-- -----------------------------------------------------
DROP TABLE IF EXISTS staticdata.staff ;


CREATE TABLE IF NOT EXISTS staticdata.staff (
  staff_id INT NOT NULL,
  call_sign INT NOT NULL,
  firstname VARCHAR(45) NULL,
  surname VARCHAR(45) NOT NULL,
  phone VARCHAR(45) NULL,
  section_id INT NOT NULL,
  station_id INT NOT NULL,
  role VARCHAR(45) NOT NULL,
  active BOOL NOT NULL DEFAULT FALSE,
  status STAFFSTATUS NOT NULL DEFAULT 'AVAILABLE',
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (staff_id) ,
  UNIQUE (call_sign) ,
  CONSTRAINT staff_section
    FOREIGN KEY (section_id)
    REFERENCES staticdata.section (section_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT staff_station
    FOREIGN KEY (station_id)
    REFERENCES staticdata.station (station_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX staff_section_idx ON staticdata.staff (section_id);
CREATE INDEX staff_station_idx ON staticdata.staff (station_id);
CREATE TRIGGER upd_staff BEFORE UPDATE ON staticdata.staff FOR EACH ROW EXECUTE PROCEDURE upd_time();



-- -----------------------------------------------------
-- Table staticdata.fault_codes
-- -----------------------------------------------------
DROP TABLE IF EXISTS staticdata.fault_codes ;


CREATE TABLE IF NOT EXISTS staticdata.fault_codes (
  code_id SERIAL NOT NULL,
  code VARCHAR(10) NOT NULL,
  description VARCHAR(100) NOT NULL,
  section_id INT NOT NULL,
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (code_id) ,
  CONSTRAINT faultcodes_section
    FOREIGN KEY (section_id)
    REFERENCES staticdata.section (section_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX faultcodes_section_idx ON staticdata.fault_codes (section_id);
CREATE TRIGGER upd_fault_codes BEFORE UPDATE ON staticdata.fault_codes FOR EACH ROW EXECUTE PROCEDURE upd_time();



-- -----------------------------------------------------
-- Table staticdata.fire_codes
-- -----------------------------------------------------
DROP TABLE IF EXISTS staticdata.fire_codes ;


CREATE TABLE IF NOT EXISTS staticdata.fire_codes (
  code_id SERIAL NOT NULL,
  description VARCHAR(45) NOT NULL,
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (code_id)
);

CREATE TRIGGER upd_fire_codes BEFORE UPDATE ON staticdata.fire_codes FOR EACH ROW EXECUTE PROCEDURE upd_time();


-- -----------------------------------------------------
-- Table staticdata.emergency_codes
-- -----------------------------------------------------
DROP TABLE IF EXISTS staticdata.emergency_codes ;


CREATE TABLE IF NOT EXISTS staticdata.emergency_codes (
  code_id SERIAL NOT NULL,
  description VARCHAR(45) NOT NULL,
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (code_id)
);


CREATE TRIGGER upd_emergency_codes BEFORE UPDATE ON staticdata.emergency_codes FOR EACH ROW EXECUTE PROCEDURE upd_time();


-- -----------------------------------------------------
-- Table staticdata.caller
-- -----------------------------------------------------
DROP TABLE IF EXISTS staticdata.caller ;


CREATE TABLE IF NOT EXISTS staticdata.caller (
  caller_id SERIAL NOT NULL,
  firstname VARCHAR(45) NULL,
  surname VARCHAR(45) NULL,
  phone VARCHAR(45) NULL,
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (caller_id)
);

CREATE TRIGGER upd_caller BEFORE UPDATE ON staticdata.caller FOR EACH ROW EXECUTE PROCEDURE upd_time();


-- -----------------------------------------------------
-- Table staticdata.zone
-- -----------------------------------------------------
DROP TABLE IF EXISTS staticdata.zone ;


CREATE TABLE IF NOT EXISTS staticdata.zone (
  zone_id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (zone_id)
);

CREATE TRIGGER upd_zone BEFORE UPDATE ON staticdata.zone FOR EACH ROW EXECUTE PROCEDURE upd_time();


-- -----------------------------------------------------
-- Table staticdata.suburb
-- -----------------------------------------------------
DROP TABLE IF EXISTS staticdata.suburb ;


CREATE TABLE IF NOT EXISTS staticdata.suburb (
  suburb_id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  zone_id INT NOT NULL,
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (suburb_id) ,
  CONSTRAINT zone_id
    FOREIGN KEY (zone_id)
    REFERENCES staticdata.zone (zone_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX zone_id_idx ON staticdata.suburb (zone_id) ;
CREATE TRIGGER upd_suburb BEFORE UPDATE ON staticdata.suburb FOR EACH ROW EXECUTE PROCEDURE upd_time();



-- -----------------------------------------------------
-- Table staticdata.property
-- -----------------------------------------------------
DROP TABLE IF EXISTS staticdata.property ;


CREATE TABLE IF NOT EXISTS staticdata.property (
  property_id SERIAL NOT NULL,
  suburb_id INT NOT NULL,
  stand_no INT NOT NULL,
  street VARCHAR(45) NULL,
  owner VARCHAR(45) NULL,
  value NUMERIC(7,2) NULL,
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (property_id, suburb_id) ,
  UNIQUE (property_id),
  CONSTRAINT property_suburb
    FOREIGN KEY (suburb_id)
    REFERENCES staticdata.suburb (suburb_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX property_suburb_idx ON staticdata.property (suburb_id);
CREATE TRIGGER upd_property BEFORE UPDATE ON staticdata.property FOR EACH ROW EXECUTE PROCEDURE upd_time();



-- -----------------------------------------------------
-- Table staticdata.vehicle
-- -----------------------------------------------------
DROP TABLE IF EXISTS staticdata.vehicle ;


CREATE TABLE IF NOT EXISTS staticdata.vehicle (
  vehicle_id INT NOT NULL,
  name VARCHAR(45) NOT NULL,
  type VARCHAR(45) NOT NULL,
  station_id INT NOT NULL,
  radio INT NULL,
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (vehicle_id) ,
  CONSTRAINT vehicle_station
    FOREIGN KEY (station_id)
    REFERENCES staticdata.station (station_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX vehicle_station_idx ON staticdata.vehicle (station_id);
CREATE TRIGGER upd_vehicle BEFORE UPDATE ON staticdata.vehicle FOR EACH ROW EXECUTE PROCEDURE upd_time();



-- -----------------------------------------------------
-- Schema engineering
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS engineering CASCADE;


CREATE SCHEMA IF NOT EXISTS engineering;


-- -----------------------------------------------------
-- Table engineering.job
-- -----------------------------------------------------
DROP TABLE IF EXISTS engineering.job ;


CREATE TABLE IF NOT EXISTS engineering.job (
  job_id SERIAL NOT NULL,
  suburb_id INT NOT NULL,
  status JOBSTATUS NOT NULL DEFAULT 'OPEN',
  opened_on TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  closed_on TIMESTAMP(0) NULL,
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  opened_by VARCHAR(45),
  closed_by VARCHAR(45),
  UNIQUE (job_id),
  PRIMARY KEY (job_id),
  CONSTRAINT job_suburb
    FOREIGN KEY (suburb_id)
    REFERENCES staticdata.suburb (suburb_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TRIGGER upd_engjob BEFORE UPDATE ON engineering.job FOR EACH ROW EXECUTE PROCEDURE upd_time();


-- -----------------------------------------------------
-- Table engineering.call
-- -----------------------------------------------------
DROP TABLE IF EXISTS engineering.call ;


CREATE TABLE IF NOT EXISTS engineering.call (
  call_id SERIAL NOT NULL,
  code_id INT NOT NULL,
  caller_id INT NOT NULL,
  stand_no INT NULL,
  street VARCHAR(45) NULL,
  suburb_id INT NOT NULL,
  reported_on TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status JOBSTATUS NOT NULL DEFAULT 'OPEN',
  description VARCHAR(200) NULL,
  severity INT NOT NULL DEFAULT 1 CHECK(severity BETWEEN 1 AND 5),
  property_damage BOOL NOT NULL DEFAULT FALSE,
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  job_id INT,
  UNIQUE (call_id),
  PRIMARY KEY (call_id, caller_id),
  CONSTRAINT fault_faultcodes
    FOREIGN KEY (code_id)
    REFERENCES staticdata.fault_codes (code_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fault_caller
    FOREIGN KEY (caller_id)
    REFERENCES staticdata.caller (caller_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fault_suburb
    FOREIGN KEY (suburb_id)
    REFERENCES staticdata.suburb (suburb_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fault_job
    FOREIGN KEY (job_id)
    REFERENCES engineering.job (job_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


CREATE INDEX fault_faultcodes_idx ON engineering.call (code_id);
CREATE INDEX fault_caller_idx ON engineering.call (caller_id);
CREATE INDEX fault_suburb_idx ON engineering.call (suburb_id);
CREATE INDEX fault_job_idx ON engineering.call (job_id);
CREATE TRIGGER upd_engcall BEFORE UPDATE ON engineering.call FOR EACH ROW EXECUTE PROCEDURE upd_time();

-- -----------------------------------------------------
-- Table engineering.linked_faults
-- -----------------------------------------------------
DROP TABLE IF EXISTS engineering.linked_faults ;

/*
CREATE TABLE IF NOT EXISTS engineering.linked_faults (
  job_id INT NOT NULL,
  parent_fault INT NOT NULL,
  child_fault INT NOT NULL,
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (parent_fault, child_fault) ,
  CONSTRAINT linkedfaults_fault_parent
    FOREIGN KEY (parent_fault)
    REFERENCES engineering.call (call_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT linkedfaults_fault_child
    FOREIGN KEY (child_fault)
    REFERENCES engineering.call (call_id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT linkedfaults_job
    FOREIGN KEY (job_id)
    REFERENCES engineering.job (job_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX linkedfaults_fault_child_idx ON engineering.linked_faults (child_fault);
CREATE INDEX linkedfaults_job_idx ON engineering.linked_faults (job_id);
CREATE TRIGGER upd_engfaults BEFORE UPDATE ON engineering.linked_faults FOR EACH ROW EXECUTE PROCEDURE upd_time();
*/
-- -----------------------------------------------------
-- Table engineering.assignment
-- -----------------------------------------------------
DROP TABLE IF EXISTS engineering.assignment ;


CREATE TABLE IF NOT EXISTS engineering.assignment (
  assign_id SERIAL NOT NULL,
  job_id INT NOT NULL,
  staff_id INT NOT NULL,
  assigned_on TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (assign_id),
  PRIMARY KEY (job_id, staff_id),
  CONSTRAINT faultassign_job
    FOREIGN KEY (job_id)
    REFERENCES engineering.job (job_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT faultassign_staff
    FOREIGN KEY (staff_id)
    REFERENCES staticdata.staff (staff_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX jobassignment_staff_idx ON engineering.assignment (staff_id);
CREATE TRIGGER upd_engassignment BEFORE UPDATE ON engineering.assignment FOR EACH ROW EXECUTE PROCEDURE upd_time();



-- -----------------------------------------------------
-- Schema fire
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS fire CASCADE;

/*
CREATE SCHEMA IF NOT EXISTS fire;



-- -----------------------------------------------------
-- Table fire.call
-- -----------------------------------------------------
DROP TABLE IF EXISTS fire.call ;


CREATE TABLE IF NOT EXISTS fire.call (
  call_id SERIAL NOT NULL,
  code_id INT NOT NULL,
  caller_id INT NOT NULL,
  stand_no INT NULL,
  street VARCHAR(45) NULL,
  suburb_id INT NOT NULL,
  reported_on TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  description VARCHAR(200) NULL,
  status JOBSTATUS NOT NULL DEFAULT 'OPEN',
  severity INT NOT NULL DEFAULT 1 CHECK(severity BETWEEN 1 AND 5),
  sus_cause VARCHAR(100) NOT NULL DEFAULT 'Unkown',
  extinguished_by VARCHAR(45) NOT NULL,
  property_damage BOOL NOT NULL DEFAULT FALSE,
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (call_id),
  PRIMARY KEY (call_id, caller_id),
  CONSTRAINT fire_firecodes
    FOREIGN KEY (code_id)
    REFERENCES staticdata.fire_codes (code_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fire_caller
    FOREIGN KEY (caller_id)
    REFERENCES staticdata.caller (caller_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fire_suburb
    FOREIGN KEY (suburb_id)
    REFERENCES staticdata.suburb (suburb_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX fire_firecodes_idx ON fire.call (code_id);
CREATE INDEX fire_caller_idx ON fire.call (caller_id);
CREATE INDEX fire_suburb_idx ON fire.call (suburb_id);
CREATE TRIGGER upd_firecall BEFORE UPDATE ON fire.call FOR EACH ROW EXECUTE PROCEDURE upd_time();



-- -----------------------------------------------------
-- Table fire.damage
-- -----------------------------------------------------
DROP TABLE IF EXISTS fire.damage ;


CREATE TABLE IF NOT EXISTS fire.damage (
  id SERIAL NOT NULL,
  call_id INT NOT NULL,
  property_id INT NOT NULL,
  insurance VARCHAR(45) NOT NULL DEFAULT 'Unkown',
  damage INT NOT NULL DEFAULT 1 CHECK(damage BETWEEN 1 AND 5),
  occupier VARCHAR(45) NULL,
  loss NUMERIC(7,2) NULL,
  charged BOOL NOT NULL DEFAULT FALSE,
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (call_id, property_id) ,
  UNIQUE (id) ,
  CONSTRAINT firedamage_fire
    FOREIGN KEY (call_id)
    REFERENCES fire.call (call_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT firedamage_property
    FOREIGN KEY (property_id)
    REFERENCES staticdata.property (property_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX firedamage_property_idx ON fire.damage (property_id);
CREATE TRIGGER upd_firedamage BEFORE UPDATE ON fire.damage FOR EACH ROW EXECUTE PROCEDURE upd_time();


-- -----------------------------------------------------
-- Table fire.job
-- -----------------------------------------------------
DROP TABLE IF EXISTS fire.job ;


CREATE TABLE IF NOT EXISTS fire.job (
  job_id SERIAL NOT NULL,
  call_id INT NOT NULL,
  status JOBSTATUS NOT NULL DEFAULT 'OPEN',
  opened_on TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  closed_on TIMESTAMP(0) NULL,
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
--  UNIQUE (job_id),
  PRIMARY KEY (job_id, call_id),
  CONSTRAINT job_fire
    FOREIGN KEY (call_id)
    REFERENCES fire.call (call_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX job_fire_idx ON fire.job (call_id);
CREATE TRIGGER upd_firejob BEFORE UPDATE ON fire.job FOR EACH ROW EXECUTE PROCEDURE upd_time();


-- -----------------------------------------------------
-- Table fire.charges
-- -----------------------------------------------------
DROP TABLE IF EXISTS fire.charges ;


CREATE TABLE IF NOT EXISTS fire.charges (
  id SERIAL NOT NULL,
  job_id INT NOT NULL,
  property_id INT NOT NULL,
  receipt_no VARCHAR(45) NOT NULL,
  charge_description VARCHAR(100) NOT NULL,
  charge_amount NUMERIC(7,2) NOT NULL,
  charge_address VARCHAR(200) NOT NULL,
  zrp_contact VARCHAR(45) NOT NULL DEFAULT 'None Assigned',
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (job_id, property_id) ,
  UNIQUE (id) ,
  UNIQUE (receipt_no) ,
  CONSTRAINT firecharges_job
    FOREIGN KEY (job_id)
    REFERENCES fire.job (job_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT firecharges_property
    FOREIGN KEY (property_id)
    REFERENCES staticdata.property (property_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX firecharges_property_idx ON fire.charges (property_id);
CREATE TRIGGER upd_firecharge BEFORE UPDATE ON fire.charges FOR EACH ROW EXECUTE PROCEDURE upd_time();



-- -----------------------------------------------------
-- Table fire.assignment
-- -----------------------------------------------------
DROP TABLE IF EXISTS fire.assignment ;


CREATE TABLE IF NOT EXISTS fire.assignment (
  assign_id SERIAL NOT NULL,
  job_id INT NOT NULL,
  staff_id INT NOT NULL,
  vehicle_id INT NOT NULL,
  dispatched_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  on_scene TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  released_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  returned TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (assign_id),
  PRIMARY KEY (vehicle_id, staff_id, job_id) ,
  CONSTRAINT fireassign_vehicle
    FOREIGN KEY (vehicle_id)
    REFERENCES staticdata.vehicle (vehicle_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fireassign_staff
    FOREIGN KEY (staff_id)
    REFERENCES staticdata.staff (staff_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fireassign_job
    FOREIGN KEY (job_id)
    REFERENCES fire.job (job_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX fireassign_staff_idx ON fire.assignment (staff_id);
CREATE INDEX fireassign_job_idx ON fire.assignment (job_id);
CREATE TRIGGER upd_fireassignment BEFORE UPDATE ON fire.assignment FOR EACH ROW EXECUTE PROCEDURE upd_time();


-- -----------------------------------------------------
-- Table fire.linked_vehicle_assignment
-- -----------------------------------------------------
DROP TABLE IF EXISTS fire.linked_vehicle_assignment ;


CREATE TABLE IF NOT EXISTS fire.linked_vehicle_assignment (
  job_id INT NOT NULL,
  parent_vehicle INT NOT NULL,
  child_vehicle INT NOT NULL,
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (parent_vehicle, child_vehicle) ,
  CONSTRAINT linkedvehicles_parentvehicle
    FOREIGN KEY (parent_vehicle)
    REFERENCES staticdata.vehicle (vehicle_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT linkedvehicles_job
    FOREIGN KEY (job_id)
    REFERENCES fire.job (job_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX linkedvehicles_job_idx ON fire.linked_vehicle_assignment (job_id);
CREATE TRIGGER upd_firevassignment BEFORE UPDATE ON fire.linked_vehicle_assignment FOR EACH ROW EXECUTE PROCEDURE upd_time();


*/
-- -----------------------------------------------------
-- Schema ambulance
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS ambulance CASCADE;

/*
CREATE SCHEMA IF NOT EXISTS ambulance;




-- -----------------------------------------------------
-- Table ambulance.call
-- -----------------------------------------------------
DROP TABLE IF EXISTS ambulance.call ;


CREATE TABLE IF NOT EXISTS ambulance.call (
  call_id SERIAL NOT NULL,
  code_id INT NOT NULL,
  caller_id INT NOT NULL,
  stand_no INT NULL,
  street VARCHAR(45) NULL,
  suburb_id INT NOT NULL,
  reported_on TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status JOBSTATUS NOT NULL DEFAULT 'OPEN',
  description VARCHAR(200) NULL,
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (call_id),
  PRIMARY KEY (call_id, caller_id),
  CONSTRAINT emergency_emcodes
    FOREIGN KEY (code_id)
    REFERENCES staticdata.emergency_codes (code_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT emergency_caller
    FOREIGN KEY (caller_id)
    REFERENCES staticdata.caller (caller_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT emergency_suburb
    FOREIGN KEY (suburb_id)
    REFERENCES staticdata.suburb (suburb_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX emergency_emcodes_idx ON ambulance.call (code_id);
CREATE INDEX emergency_caller_idx ON ambulance.call (caller_id);
CREATE INDEX emergency_suburb_idx ON ambulance.call (suburb_id);
CREATE TRIGGER upd_ambcall BEFORE UPDATE ON ambulance.call FOR EACH ROW EXECUTE PROCEDURE upd_time();


-- -----------------------------------------------------
-- Table ambulance.job
-- -----------------------------------------------------
DROP TABLE IF EXISTS ambulance.job ;


CREATE TABLE IF NOT EXISTS ambulance.job (
  job_id SERIAL NOT NULL,
  call_id INT NOT NULL,
  status JOBSTATUS NOT NULL DEFAULT 'OPEN',
  opened_on TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  closed_on TIMESTAMP(0) NULL,
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
--  UNIQUE (job_id),
  PRIMARY KEY (job_id, call_id),
  CONSTRAINT job_emergency
    FOREIGN KEY (call_id)
    REFERENCES ambulance.call (call_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX job_emergency_idx ON ambulance.job (call_id);
CREATE TRIGGER upd_ambjob BEFORE UPDATE ON ambulance.job FOR EACH ROW EXECUTE PROCEDURE upd_time();


-- -----------------------------------------------------
-- Table ambulance.assignment
-- -----------------------------------------------------
DROP TABLE IF EXISTS ambulance.assignment ;


CREATE TABLE IF NOT EXISTS ambulance.assignment (
  assign_id SERIAL NOT NULL,
  job_id INT NOT NULL,
  staff_id INT NOT NULL,
  vehicle_id INT NOT NULL,
  dispatched_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  on_scene TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  released_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  returned TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (assign_id),
  PRIMARY KEY (vehicle_id, staff_id, job_id) ,
  CONSTRAINT emassign_vehicle
    FOREIGN KEY (vehicle_id)
    REFERENCES staticdata.vehicle (vehicle_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT emassign_staff
    FOREIGN KEY (staff_id)
    REFERENCES staticdata.staff (staff_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT emassign_job
    FOREIGN KEY (job_id)
    REFERENCES ambulance.job (job_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX assign_staff_idx ON ambulance.assignment (staff_id);
CREATE INDEX assign_job_idx ON ambulance.assignment (job_id);
CREATE TRIGGER upd_ambassignment BEFORE UPDATE ON ambulance.assignment FOR EACH ROW EXECUTE PROCEDURE upd_time();


-- -----------------------------------------------------
-- Table ambulance.cancelled
-- -----------------------------------------------------
DROP TABLE IF EXISTS ambulance.cancelled ;


CREATE TABLE IF NOT EXISTS ambulance.cancelled (
  job_id INT NOT NULL,
  cancelled_on TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  cancel_reason VARCHAR(100) NOT NULL,
  cancelled_by VARCHAR(45) NOT NULL,
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (job_id) ,
  CONSTRAINT cancelledjobs_job
    FOREIGN KEY (job_id)
    REFERENCES ambulance.job (job_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


CREATE TRIGGER upd_ambcancel BEFORE UPDATE ON ambulance.cancelled FOR EACH ROW EXECUTE PROCEDURE upd_time();

-- -----------------------------------------------------
-- Table ambulance.charges
-- -----------------------------------------------------
DROP TABLE IF EXISTS ambulance.charges ;


CREATE TABLE IF NOT EXISTS ambulance.charges (
  id SERIAL NOT NULL,
  job_id INT NOT NULL,
  receipt_no VARCHAR(45) NOT NULL,
  charge_description VARCHAR(100) NOT NULL,
  charge_amount NUMERIC(7,2) NOT NULL,
  charge_address VARCHAR(200) NOT NULL,
  last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (job_id) ,
  UNIQUE (id) ,
  UNIQUE (receipt_no) ,
  CONSTRAINT ambucharges_job
    FOREIGN KEY (job_id)
    REFERENCES ambulance.job (job_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


CREATE TRIGGER upd_ambcharge BEFORE UPDATE ON ambulance.charges FOR EACH ROW EXECUTE PROCEDURE upd_time();

*/

-- -----------------------------------------------------
-- Schema gis
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS gis CASCADE;

CREATE SCHEMA IF NOT EXISTS gis;
