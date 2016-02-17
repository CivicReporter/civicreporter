::creating psql loader files from esri shapefiles
::GiST indexes (-I) added automatically after table creation

cmd /c shp2pgsql -c -D -s 32735 -I "C:\Users\techsys_2\Documents\BULAWAYO CITY COUNCIL\RiffleRange_shp\boundary.shp" gis.boundary > boundary_loader.sql
cmd /c shp2pgsql -c -D -s 32735 -I "C:\Users\techsys_2\Documents\BULAWAYO CITY COUNCIL\RiffleRange_shp\meteringzone.shp" gis.meteringzone > zone_loader.sql
cmd /c shp2pgsql -c -D -s 32735 -I "C:\Users\techsys_2\Documents\BULAWAYO CITY COUNCIL\RiffleRange_shp\property.shp" gis.property > property_loader.sql
cmd /c shp2pgsql -c -D -s 32735 -I "C:\Users\techsys_2\Documents\BULAWAYO CITY COUNCIL\RiffleRange_shp\road.shp" gis.road > road_loader.sql
cmd /c shp2pgsql -c -D -s 32735 -I "C:\Users\techsys_2\Documents\BULAWAYO CITY COUNCIL\RiffleRange_shp\suburb.shp" gis.suburb > suburb_loader.sql