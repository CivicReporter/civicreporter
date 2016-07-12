::

cmd /c psql -U r0723875m -d civicdb -f boundary_loader.sql
cmd /c psql -U r0723875m -d civicdb -f zone_loader.sql
cmd /c psql -U r0723875m -d civicdb -f property_loader.sql
cmd /c psql -U r0723875m -d civicdb -f road_loader.sql
cmd /c psql -U r0723875m -d civicdb -f suburb_loader.sql


