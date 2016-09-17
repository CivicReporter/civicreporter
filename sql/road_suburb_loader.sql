insert into gis.road_suburb(road_id, suburb_id)
(select r.gid, s.suburb_id from gis.road r, gis.suburb s
where st_intersects(r.geom,s.geom)
order by suburb_id);