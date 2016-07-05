::modify to path of your PostgreSQL installation
::set PATH = "%PATH%;C:\Program Files\PostgreSQL\9.4\bin;"

::connect to your database and enable spatial extensions
::cmd /c psql -U postgres -d civicdb -c "CREATE EXTENSION postgis;"
::cmd /c psql -U postgres -d civicdb -c "CREATE EXTENSION postgis_topology;"
::cmd /c psql -U postgres -d civicdb -c "DROP SCHEMA IF EXISTS gis CASCADE;"
::cmd /c psql -U postgres -d civicdb -c "CREATE SCHEMA IF NOT EXISTS gis;"

::checking installed postgis version
::cmd /k psql -U postgres -d civicdb -c "SELECT * FROM pg_available_extensions WHERE name LIKE 'postgis%';"

::importing osm data into postgis database
cmd /k osm2pgsql -U postgres -d civicdb -W -H 127.0.0.1 -c -k -C 800 -S ./default.style ./byo_data.osm





