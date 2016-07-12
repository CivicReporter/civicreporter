SET CLIENT_ENCODING TO UTF8;
SET STANDARD_CONFORMING_STRINGS TO ON;
BEGIN;
CREATE TABLE "gis"."boundary" (gid serial,
"reszone" varchar(45),
"existing" varchar(45),
"shape_leng" numeric,
"shape_area" numeric);
ALTER TABLE "gis"."boundary" ADD PRIMARY KEY (gid);
SELECT AddGeometryColumn('gis','boundary','geom','32735','MULTIPOLYGON',2);
COPY "gis"."boundary" ("reszone","existing","shape_leng","shape_area",geom) FROM stdin;
Rifle Range	Existing	33985.011116664813000	42420387.374329478000000	0106000020DF7F0000010000000103000000010000008700000040A4DFBE304F24417FFB3AB834AD5D4140BD52560854244124B9FCA716AD5D41A067B34A2160244101DE029DEDAB5D4198B20CD129632441D50968CEA2AB5D41E02D90008A612441827346D0FFAA5D41C086A797AA612441840D4F2BEEAA5D4198E61D8719612441A323B990AEAA5D41F897DD139F6124412D211FFCA1AA5D41180DE0CDA6602441DE0209066AAA5D41C8A145165D60244186C9541561AA5D4120F46CF67E5E24417DAEB6F654AA5D41283108ECBD5D2441B8AF030B3BAA5D41F831E62E505C2441E3C79863D1A95D41907EFB3ABF5C244196B20C9DCAA95D41201FF44CB95C2441DF4F8DEBB4A95D4148B6F35DCE5C24415474243799A95D41C876BEFFEB5C24418C4AEAF06CA95D41903A016DA45C2441098A1F3760A95D4118E258976F5C24414703780F4DA95D41787AA56C595C24411B9E5E593FA95D41D03B4E91545C24417D3F359231A95D4190976EB2615C2441F0A7C6D728A95D4138234A3B825C24413CBD52621BA95D41402CD4BA545C244117B7D1000EA95D41A82C439C285B24415B423ED0F2A85D4170567DCE8F592441992A1841D8A85D4190B96BA9405A2441560E2D92AFA85D414060E5F0005B24416F8104FDBFA85D4198218E75565B244199BB9618B6A85D41E851B8FEBB5B24411D5A64639FA85D4140A4DF3ECB5B24418273460096A85D4150E3A53BF95B2441EC51B8F28DA85D41002B87D6D75B24412DB29D3B84A85D41D868004F6A5C2441371AC07F52A85D4170787A25665C24411AC05B604CA85D41283A92CB705B2441C05B20D150A85D4198438B8CA8592441AED85F5A5DA85D41E0C798BB4157244166F7E48968A85D41B0BFECBE78562441E258174B2CA85D4130C4B18E4E552441250681E9D2A75D41C8EEC9631A552441FA7E6A58B3A75D4130D49A0601552441143FC6289FA75D416809F9E0075524414CA60AA296A75D4158A835CDBB542441C6DCB5B871A75D4138D6C5AD4B542441832F4C523BA75D41D0915CBE5A4F2441E4839EC5FCA65D4140A4DF9E404F24415BB1BF60F4A65D41C8BAB8ED0C4F244138F8C2A0F1A65D41081B9E1ED94F2441ABCFD566C4A65D4180C0CAE1D44F24411C7C6112C2A65D41F897DD93E94E2441D0B35931A1A65D413811369C754E24412D431C0F86A65D4120B072486C4E24412F6EA3855EA65D41F85C6DC5E24C24412063EEA215A65D41C86D34E0554C24414D840DEBCAA55D41F0B050CBE44C244154E3A577B9A55D41A8DFBE6ED74B24412D431C5364A55D4168006FA1BD4B244195D4096850A55D41585227A0D24A2441780B249430A55D41F0C9C3C26449244160764F5232A45D411083C0AAF8472441F54A596207A45D41B81E85EB15472441C7293A9EAFA35D41104FAF74C2432441B37BF294CDA35D41081214FF574324415839B4649EA35D4168DE714AF63F2441A857CAEABCA35D41B0506B5A833F24415E4BC8579FA35D41F0A7C6ABED3E2441849ECDBA9FA35D4158EC2F7BAA3E2441903177518EA35D4168AA6054F33D2441061214B78FA35D41D8D78193493C24419A779C3A89A35D41484772F9CF3A2441BADA8AB9ACA35D41C07D1D98993A2441B30C7100BAA35D41A01A2F9D813A2441BC749318BAA35D4180D93D996C3A2441143FC6FCC4A35D41984C152C2B3C2441B81E8573DEA35D41D0B35915583C244189416099E4A35D4178BE9F7A7F3E24413B014D940BA45D41789318441C402441742497DB30A45D415817B79189402441C74B37914CA45D41780B24081D3F2441DDB584A869A45D416891ED3C773F24414013617F8AA45D4158204151DB3D24412063EE769AA45D41B0E1E995DF3B244186C9541DA4A45D410893A9229D3B2441226C7852A8A45D4148C8075D553A244196438BD8ACA45D4168BC7453263A2441F697DD03B4A45D41B8847C70213A2441DE938731B9A45D415839B468493A2441BC9690D7BCA45D41E82631C85D3A244124B9FC27C0A45D41E8AE25248F3A24416FF08585C3A45D41F8EDEBE0FD3A24417A36ABD6C4A45D41A82C439C3A3B244192CB7F28C7A45D41F83A708E663B24417FD93D85CBA45D41506210586E3B2441F7065F68D1A45D41002B8796523B2441E4839EE9D5A45D41B815FBEB4C3C24417AC7294A14A55D4170A301DC1D3A24414CA60AAA14A55D41F8EDEB203A3724412FDD247A15A55D41B896908F92352441190456461CA55D414825756212352441228E759D24A55D417814AE2770352441CEAACF213BA55D41C854C188C63524413A92CBDF4FA55D4148B6F3BDBE3624418AB0E1798BA55D4180AEB6423A392441E71DA73CF1A55D4180D93D99D33C2441DF4F8DC384A65D412041F143DB3C2441423EE8F5B8A65D4110363C9D363C2441D93D79D8EDA65D416809F9207F3B24417593189C03A75D4140FAED2B4F392441AB3E576F3EA75D41A84E4053883824418126C24E7EA75D4140E8D98CAB382441B003E7ACEAA75D4178E926713438244196B20C411FA85D41A011A53D2A372441D044D8204DA85D4178BE9FBA0035244152499DE864A85D41E8263168172C24415EBA49F429A95D41A05E290B09252441E561A12EC6A95D41F0C9C322EF2424411DC9E5BBD2A95D4110A5BD0106262441A913D034F0A95D418004C58F33272441FD87F40B09AA5D41F0EBC0591E292441598638E233AA5D4138894180D2292441894160C558AA5D41385EBA29B52C2441787AA51CE9AB5D41C07D1DD8F42D2441B072688D9BAC5D4148BF7DBDD22E2441BBB88DAA91AC5D4168BC74B305302441341136D492AC5D41C820B0920C3224411B9E5E71BBAC5D41D02B65B90933244174B515EBCFAC5D4130B29DEF6E3524412EFF21150AAD5D4100780B44B2362441083D9B7D24AD5D41E80434112C372441E92631A02DAD5D41F86C563D57462441E2E9951ECAAC5D4148E17AD465482441E6AE25A0BCAC5D4130A2B4B7894A244188F4DB571AAD5D41F8285CAFAB4B2441894160F14BAD5D4140A4DFBE304F24417FFB3AB834AD5D41
\.
CREATE INDEX ON "gis"."boundary" USING GIST ("geom");
COMMIT;
