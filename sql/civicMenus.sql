
DROP SCHEMA IF EXISTS security CASCADE;

CREATE SCHEMA IF NOT EXISTS security;

DROP TABLE IF EXISTS security.groups;

CREATE TABLE IF NOT EXISTS security.groups(
	id SERIAL NOT NULL,
	name VARCHAR(45) NOT NULL,
	PRIMARY KEY(id),
	UNIQUE(id)
);

DROP TABLE IF EXISTS security.user;

CREATE TABLE IF NOT EXISTS security.user(
	id SERIAL NOT NULL,
	firstname VARCHAR(100) NOT NULL,
	lastname VARCHAR(100) NOT NULL,
	userName VARCHAR(20) NOT NULL,
	password VARCHAR(38) NOT NULL,
	email VARCHAR(100) NOT NULL,
	picture VARCHAR(100) NULL,
	groupid INT NOT NULL,
	active BOOL NOT NULL DEFAULT FALSE,
  	created_on TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  	last_update TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(id, groupid),	
	UNIQUE (id) ,
	CONSTRAINT user_groups
		FOREIGN KEY (groupid)
	    REFERENCES security.groups (id)
	    ON DELETE NO ACTION
	    ON UPDATE NO ACTION
);

CREATE INDEX user_groups_idx ON security.user(groupid);
CREATE TRIGGER upd_user BEFORE UPDATE ON security.user FOR EACH ROW EXECUTE PROCEDURE upd_time();

BEGIN;

	INSERT INTO security.groups(name)
		VALUES('admin'),('call centre'),('gis'),('fire');

	INSERT INTO security.user(firstname, lastname, userName, password, email, groupid, active)
		VALUES	('Reason', 'Mlambo', 'reason', 'MyPassword#15', 'rmlambo@geointel.com', 1, 't'),
				('Brian', 'Chikura', 'brian', 'Mypassword&15', 'bchikura@geointel.com', 2, 't'),
				('John', 'Rimwe', 'john', 'p@S$w0Rd!15', 'jrimwe@geointel.com', 4, 'f');

COMMIT;

DROP TABLE IF EXISTS security.menu;

CREATE TABLE IF NOT EXISTS security.menu(
	id SERIAL NOT NULL,
	ttext VARCHAR(45) NOT NULL,
	iconCls VARCHAR(45) NULL,
	parentid INT NULL,
	classname VARCHAR(45) NULL,
	PRIMARY KEY(id),
	CONSTRAINT menu_menu
		FOREIGN KEY(parentid)
		REFERENCES security.menu(id)
	    ON DELETE NO ACTION
	    ON UPDATE NO ACTION
);

CREATE INDEX menu_menu_idx 
	ON security.menu(parentid);


DROP TABLE IF EXISTS security.permissions;

CREATE TABLE IF NOT EXISTS security.permissions(
	menuid INT NOT NULL,
	groupid INT NOT NULL,
	PRIMARY KEY(menuid, groupid),
	CONSTRAINT permissions_menu
		FOREIGN KEY(menuid)
		REFERENCES security.menu(id)
	    ON DELETE NO ACTION
	    ON UPDATE NO ACTION,
	CONSTRAINT permissions_groups
		FOREIGN KEY(groupid)
		REFERENCES security.groups(id)
	    ON DELETE NO ACTION
	    ON UPDATE NO ACTION
);

CREATE INDEX permissions_menu_idx 
	ON security.permissions(menuid);

CREATE INDEX permissions_groups_idx 
	ON security.permissions(groupid);

BEGIN;
	
	INSERT INTO security.menu(ttext, iconCls)
		VALUES	('Security', 'menu_admin'),
				('Static Data', 'menu_staticdata'),
				('Sewer & Water','menu_engineering');

	INSERT INTO security.menu(ttext, iconCls, parentid, classname)
		VALUES	('Groups & Permissions', 'menu_groups', 1, 'panel'),
				('Users', 'menu_users', 1, 'users'),
				('Sections', 'menu_section', 2, 'sectionsgrid'),
				('Emergency Codes', 'menu_staticdata', 2, 'emergencycodesgrid'),
				('Fault Codes', 'menu_staticdata', 2, 'faultcodesgrid'),
				('Fire Codes', 'menu_staticdata', 2, 'firecodesgrid'),
				('Properties', 'menu_properties', 2, 'propertiesgrid'),
				('Staff', 'menu_staff', 2, 'staffgrid'),
				('Stations', 'menu_station', 2, 'stationsgrid'),
				('Suburbs', 'menu_suburb', 2, 'suburbsgrid'),
				('Vehicles', 'menu_vehicle', 2, 'vehiclesgrid'),
				('Zones', 'menu_zones', 2, 'zonesgrid'),
				('Calls', 'menu_calls', 3, 'engcallsgrid'),
				('Jobs', 'menu_jobs', 3, 'jobspanel'),
				('Duty Roster', 'menu_roster', 3, 'engdutyroster');

	INSERT INTO security.permissions(menuid, groupid)
		VALUES
			(1, 1),(2, 1),(3, 1),(4, 1),(5, 1),(6, 1),
			(7, 1),(8, 1),(9, 1),(10, 1),(11, 1),(12, 1),
			(13, 1),(14, 1),(15, 1),(16, 1),(17, 1),(18, 1),(3, 2),
			(16, 2),(17, 2),(18, 2);

COMMIT;


