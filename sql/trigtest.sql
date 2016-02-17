CREATE OR REPLACE FUNCTION upd_time()
  RETURNS TRIGGER AS 
  $$
    BEGIN
       NEW.last_update = CURRENT_TIMESTAMP;
      RETURN NEW;
    END;
  $$ 
  LANGUAGE plpgsql;

DROP TABLE IF EXISTS hsvg_class CASCADE;

CREATE TABLE IF NOT EXISTS hsvg_class(
	id SERIAL,
	name VARCHAR(10),
	surname VARCHAR(15),
	last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UNIQUE(id)
);


CREATE TRIGGER upd_hsvg BEFORE UPDATE ON hsvg_class FOR EACH ROW EXECUTE PROCEDURE upd_time();

INSERT INTO hsvg_class(name)
	VALUES
		('REASON'),
		('JAQUELINE'),
		('MIRANDAH'),
		('ELLEN');
