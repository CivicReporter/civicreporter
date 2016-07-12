SET CLIENT_ENCODING TO UTF8;
SET STANDARD_CONFORMING_STRINGS TO ON;
BEGIN;
CREATE TABLE "gis"."suburb" (gid serial,
"id" numeric(10,0),
"suburb" varchar(45),
"infra_age" varchar(45),
"shape_leng" numeric,
"shape_area" numeric);
ALTER TABLE "gis"."suburb" ADD PRIMARY KEY (gid);
SELECT AddGeometryColumn('gis','suburb','geom','32735','MULTIPOLYGON',2);
COPY "gis"."suburb" ("id","suburb","infra_age","shape_leng","shape_area",geom) FROM stdin;
0	COWDRAY PARK	10 - 20YRS	4234.549842407319400	186118.141911042910000	0106000020DF7F0000010000000103000000010000000B000000C876BE3F092A2441840D4F8F48AA5D41C0C117A64C252441A54E4063D9A95D41B069DED13B2524412CD49AD6DAA95D4110A5BD0106262441A913D034F0A95D418004C58F33272441FD87F40B09AA5D41F0EBC0591E292441598638E233AA5D4138894180D2292441894160C558AA5D4150A60A46132C24414694F65E91AB5D41100BB5668B2C244112143FF2F2AA5D41081B9EDE352C244168B3EABFB3AA5D41C876BE3F092A2441840D4F8F48AA5D41
0	EMAKHANDENI	20 - 40YRS	1719.788336777733800	54070.617159516929000	0106000020DF7F00000100000001030000000100000007000000C0C117A64C252441A54E4063D9A95D4190B96BC92B2A244160E5D0AE64A95D415096210E022A2441C05B201558A95D41A05E290B09252441E561A12EC6A95D41F0C9C322EF2424411DC9E5BBD2A95D41B069DED13B2524412CD49AD6DAA95D41C0C117A64C252441A54E4063D9A95D41
0	MATSHOBANA	GREATER THAN 40YRS	3758.563806280068100	295511.798691105330000	0106000020DF7F0000010000000103000000010000000B00000018FBCB2E3C3E24412506818D7BA65D4198081B1E903D24417DAEB6964AA65D4168226CB8733524414E6210481EA55D414825756212352441228E759D24A55D417814AE2770352441CEAACF213BA55D41C854C188C63524413A92CBDF4FA55D4148B6F3BDBE3624418AB0E1798BA55D4180AEB6423A392441E71DA73CF1A55D41F8A06713B83C244188855A5B80A65D418048BFFDED3C2441C13923FA80A65D4118FBCB2E3C3E24412506818D7BA65D41
0	ENTUMBANE	20 - 40YRS	10299.492027712933000	1708162.636743602600000	0106000020DF7F0000010000000103000000010000001F000000385EBAC93E3F2441C66D34B4EEA65D4118FBCB2E3C3E24412506818D7BA65D418048BFFDED3C2441C13923FA80A65D4170E7FB09B93C2441ABCFD58280A65D4180D93D99D33C2441DF4F8DC384A65D412041F143DB3C2441423EE8F5B8A65D4110363C9D363C2441D93D79D8EDA65D416809F9207F3B24417593189C03A75D4140FAED2B4F392441AB3E576F3EA75D41A84E4053883824418126C24E7EA75D4140E8D98CAB382441B003E7ACEAA75D4178E926713438244196B20C411FA85D41A011A53D2A372441D044D8204DA85D4178BE9FBA0035244152499DE864A85D41E8263168172C24415EBA49F429A95D415096210E022A2441C05B201558A95D4190B96BC92B2A244160E5D0AE64A95D41885AD37C022E24413108ACB009A95D41984C158C2B322441EBE23612A7A85D41506B9AF71D4224418A8EE4F620A85D41D022DB79E645244197900F9E03A85D4178711BED9045244155C1A89C01A85D4120D26F3FD8432441E0BE0E48F7A75D41F8A9F1922542244116FBCB86E7A75D41F0FDD4585E412441AE47E136CFA75D4160A1D6D4F24024417B14AE1FB5A75D41903A01ED50402441107A36CF90A75D41D868006F444024418D28ED018EA75D41885AD39C25402441865AD3785EA75D41206C78BA643F24412B871699FFA65D41385EBAC93E3F2441C66D34B4EEA65D41
0	WINDSOR PARK	GREATER THAN 40YRS	6657.661986319940300	2614661.344402984700000	0106000020DF7F000001000000010300000001000000080000003090A0F83D3924417CF2B01015AA5D41885AD37C022E24413108ACB009A95D41C0C117A64C252441A54E4063D9A95D41C876BE3F092A2441840D4F8F48AA5D4190C2F588CD322441F163CCC118AB5D41B059F5D9873524411973D7BEAAAA5D41E0BE0EFC87352441903177B9AAAA5D413090A0F83D3924417CF2B01015AA5D41
0	RICHMOND	GREATER THAN 40YRS	9038.485679123154100	3448192.597003354200000	0106000020DF7F00000100000001030000000100000020000000A8605472A23D2441D95F763B03AD5D4168B3EAF3733D2441DDB5840CFBAC5D41D03B4E712B3D2441AB3E576BF4AC5D41400AD763A33C2441AE47E1FAE7AC5D41384ED1D1763C2441C2172693DBAC5D41780B2488573C24413C4ED1DDD2AC5D4188DB68C07B3C2441B4C876A2CBAC5D411851DABB983C244104560ED9C5AC5D41F05A427E453C2441CE88D2BEB0AC5D4128ED0D5ECC3B24417B832F8C91AC5D4120EBE2B6D13B24414772F94F7CAC5D41303333B34A3C24418B6CE70F4DAC5D4120F46CD6383C2441F7E461C92CAC5D4178C729FA9D3C24414182E28F15AC5D4178C7295A3E3D24417B832F1800AC5D414082E2878A39244162A1D67496AB5D4108F01628EA382441B9FC87ECABAB5D4190C2F588CD322441F163CCC118AB5D41C876BE3F092A2441840D4F8F48AA5D41081B9EDE352C244168B3EABFB3AA5D41100BB5668B2C244112143FF2F2AA5D4150A60A46132C24414694F65E91AB5D41385EBA29B52C2441787AA51CE9AB5D41C07D1DD8F42D2441B072688D9BAC5D4148BF7DBDD22E2441BBB88DAA91AC5D4168BC74B305302441341136D492AC5D41C820B0920C3224411B9E5E71BBAC5D41D02B65B90933244174B515EBCFAC5D4130B29DEF6E3524412EFF21150AAD5D4100780B44B2362441083D9B7D24AD5D41E80434112C372441E92631A02DAD5D41A8605472A23D2441D95F763B03AD5D41
0	UPPER GLENVILLE	GREATER THAN 40YRS	3084.213795173007400	547705.444554529270000	0106000020DF7F00000100000001030000000100000009000000B059F5D9873524411973D7BEAAAA5D41E8AE250487352441287E8CA1AAAA5D4190C2F588CD322441F163CCC118AB5D4108F01628EA382441B9FC87ECABAB5D414082E2878A39244162A1D67496AB5D41B8F3FD74AA3B2441C520B03A42AB5D4178C7291AAA3B2441FE43FA3142AB5D416891ED7CA535244160764FCEAEAA5D41B059F5D9873524411973D7BEAAAA5D41
0	GLENVILLE	GREATER THAN 40YRS	3512.890187041733000	768236.794749893130000	0106000020DF7F00000100000001030000000100000008000000B8270F0B513F24415227A0A9A5AA5D413090A0F83D3924417CF2B01015AA5D41E8AE250487352441287E8CA1AAAA5D41E0BE0EFC87352441903177B9AAAA5D4178C7291AAA3B2441FE43FA3142AB5D41B8F3FD74AA3B2441C520B03A42AB5D41187C61722D3F24415BB1BFC8B6AA5D41B8270F0B513F24415227A0A9A5AA5D41
0	TRENANCE	GREATER THAN 40YRS	10983.647398566292000	5385761.634266804900000	0106000020DF7F00000100000001030000000100000011000000F8EDEB80ED4524411CEBE29A3DA95D4178C7297A0C4624411FF46C8A3BA95D41204A7BA3D0492441D9CEF73705A95D41D044D8B0C34A2441AA605486F7A85D4178A52C43284D24418D28EDFDAEA85D4190A0F851BA4E2441304CA6627FA85D41B003E7CCE34E24416519E2BC63A85D4128CB1047C44E244116FBCB3636A85D4148B6F31D8A4E2441A69BC438E2A75D41F03845277A4624413333336301A85D41D022DB79E645244197900F9E03A85D41984C158C2B322441EBE23612A7A85D41885AD37C022E24413108ACB009A95D413090A0F83D3924417CF2B01015AA5D41B8270F0B513F24415227A0A9A5AA5D41A0EFA78640412441386744618DA95D41F8EDEB80ED4524411CEBE29A3DA95D41
0	BREEDON EVERARD	GREATER THAN 40YRS	5117.035811520559000	1425880.302995745100000	0106000020DF7F00000100000001030000000100000009000000D88AFD053C452441E5D022B7A2AA5D41C86D34E07947244162105899A1AA5D41000000204147244129ED0D2291AA5D41E0BE0E9C014A2441B459F5B526A95D41204A7BA3D0492441D9CEF73705A95D41F8EDEB80ED4524411CEBE29A3DA95D41A0EFA78640412441386744618DA95D41B8270F0B513F24415227A0A9A5AA5D41D88AFD053C452441E5D022B7A2AA5D41
0	RICHMOND SOUTH	GREATER THAN 40YRS	4812.171457018266700	1012495.651312051900000	0106000020DF7F00000100000001030000000100000010000000E8482E5FDB4224416210582901AB5D41D88AFD053C452441E5D022B7A2AA5D41B8270F0B513F24415227A0A9A5AA5D41187C61722D3F24415BB1BFC8B6AA5D4178C7291AAA3B2441FE43FA3142AB5D414082E2878A39244162A1D67496AB5D4178C7295A3E3D24417B832F1800AC5D41A83E57FB823E2441C3D32B79FCAB5D41A8DFBE6E493F2441B29DEFCBFAAB5D41D8F97EAAAB3F2441BADA8A9DEFAB5D41401CEBA2883F24416ABC74ABE0AB5D4180C0CA215B3F24415C204141CDAB5D4100DE0249013F2441567DAED6BCAB5D41E8F21F92A73E24410B4625CDADAB5D41B047E11AEA43244143AD69D23EAB5D41E8482E5FDB4224416210582901AB5D41
0	THE JUNGLE	GREATER THAN 40YRS	2243.788721046067600	268050.861207545850000	0106000020DF7F0000010000000103000000010000000800000048EA04B4E248244141F163ACDFAA5D412085EBF1974724411FF46C76A1AA5D41000000204147244129ED0D2291AA5D41C86D34E07947244162105899A1AA5D41D88AFD053C452441E5D022B7A2AA5D41E8482E5FDB4224416210582901AB5D41B047E11AEA43244143AD69D23EAB5D4148EA04B4E248244141F163ACDFAA5D41
0	NORTH TRENANCE	GREATER THAN 40YRS	9242.497490949881500	4189815.809243658600000	0106000020DF7F0000010000000103000000010000001E00000010A5BD81F3532441AA82512917AD5D4178832FEC91512441083D9B3983AC5D4148EA04B4E248244141F163ACDFAA5D410893A982CA46244112A5BDD507AB5D41B047E11AEA43244143AD69D23EAB5D41E8F21F92A73E24410B4625CDADAB5D4180C0CA215B3F24415C204141CDAB5D41401CEBA2883F24416ABC74ABE0AB5D41D8F97EAAAB3F2441BADA8A9DEFAB5D41A8DFBE6E493F2441B29DEFCBFAAB5D4178C7295A3E3D24417B832F1800AC5D4178C729FA9D3C24414182E28F15AC5D4120F46CD6383C2441F7E461C92CAC5D41303333B34A3C24418B6CE70F4DAC5D4120EBE2B6D13B24414772F94F7CAC5D4128ED0D5ECC3B24417B832F8C91AC5D411851DABB983C244104560ED9C5AC5D4188DB68C07B3C2441B4C876A2CBAC5D41780B2488573C24413C4ED1DDD2AC5D41384ED1D1763C2441C2172693DBAC5D41400AD763A33C2441AE47E1FAE7AC5D41D03B4E712B3D2441AB3E576BF4AC5D4168B3EAF3733D2441DDB5840CFBAC5D41A8605472A23D2441D95F763B03AD5D41F86C563D57462441E2E9951ECAAC5D4148E17AD465482441E6AE25A0BCAC5D4130A2B4B7894A244188F4DB571AAD5D41F8285CAFAB4B2441894160F14BAD5D4140A4DFBE304F24417FFB3AB834AD5D4110A5BD81F3532441AA82512917AD5D41
0	UMGUZA ESTATE	GREATER THAN 40YRS	4150.700539445521800	969002.871011706190000	0106000020DF7F00000100000001030000000100000008000000189E5EE90A592441DCD781A39BAC5D41400AD703CE5824419FCDAA4790AC5D4158A835CD1E54244176711B99B0AB5D4150FC18934C4E2441D712F255E4AB5D4178832FEC91512441083D9B3983AC5D4110A5BD81F3532441AA82512917AD5D4140BD52560854244124B9FCA716AD5D41189E5EE90A592441DCD781A39BAC5D41
0	KILLALO	GREATER THAN 40YRS	4984.945564836054500	465538.860833252900000	0106000020DF7F0000010000000103000000010000000B00000048378961615B24418941601556AC5D41C05296E1CD582441B81E85D3DEAB5D41B0506BBA925824410EBE3021D4AB5D4180D93D595557244101DE02557CAB5D4158A835CD1E54244176711B99B0AB5D41400AD703CE5824419FCDAA4790AC5D41189E5EE90A592441DCD781A39BAC5D41A067B34A2160244101DE029DEDAB5D4140AD693EA8612441401361F3C7AB5D4180C0CAE1705F2441674469DFFAAB5D4148378961615B24418941601556AC5D41
0	NORTH LYNNE	GREATER THAN 40YRS	5317.601082826442500	1684838.840599558100000	0106000020DF7F00000100000001030000000100000011000000385EBA89DA62244173689171AAAB5D4170A3011CC362244134A2B4038EAB5D417858A8D5E462244158CA32C487AB5D41E02D90008A612441827346D0FFAA5D41C086A797AA612441840D4F2BEEAA5D4198E61D8719612441A323B990AEAA5D41F897DD139F6124412D211FFCA1AA5D41180DE0CDA6602441DE0209066AAA5D41489D80069D6024418D976ED668AA5D41E0C798DB73602441B7D100FA64AA5D41B88D06D00457244199BB96F859AB5D4180D93D595557244101DE02557CAB5D41B0506BBA925824410EBE3021D4AB5D41C05296E1CD582441B81E85D3DEAB5D4148378961615B24418941601556AC5D41682BF6F7D3612441BA6B09BDC3AB5D41385EBA89DA62244173689171AAAB5D41
0	LOBENVALE	GREATER THAN 40YRS	4980.615832804562200	1361665.660435917100000	0106000020DF7F00000100000001030000000100000014000000E0C798DB73602441B7D100FA64AA5D4160C3D3AB286024417C6132C15FAA5D4120F46CF67E5E24417DAEB6F654AA5D41C8073D3B3B5E2441FFB27BDE4BAA5D4110F2418FA35D2441CC5D4BF444AA5D410812145F825D2441E17A14763CAA5D412897FFF0D75C2441D3BCE3D810AA5D41A82C433C645C2441B840822ED7A95D41383CBDF2635C2441A60A4619D7A95D4108CE19B1A95B24413EE8D9C8E3A95D41D066D587465B2441B98D0650E5A95D41D8C56D54EB5A24416D567DEEE3A95D41605DDCC6A05A244148BF7DCDE2A95D41E81DA748535A2441E09C1129E0A95D41A08026822D5A24418FE4F293DCA95D41F0164810EF5924411DC9E5A7D6A95D41807346B4015524410F9C33F621AA5D41506B9AB7FD522441FA7E6AC440AA5D41B88D06D00457244199BB96F859AB5D41E0C798DB73602441B7D100FA64AA5D41
0	HARRISVILLE TSP	GREATER THAN 40YRS	5814.675645095105200	1932958.069129185300000	0106000020DF7F0000010000000103000000010000000A00000058A835CD1E54244176711B99B0AB5D4180D93D595557244101DE02557CAB5D41B88D06D00457244199BB96F859AB5D41506B9AB7FD522441FA7E6AC440AA5D410022FDF6AC4D24412063EEAA8EAA5D41000000204147244129ED0D2291AA5D412085EBF1974724411FF46C76A1AA5D4148EA04B4E248244141F163ACDFAA5D4150FC18934C4E2441D712F255E4AB5D4158A835CD1E54244176711B99B0AB5D41
0	HIGHMOUNT	20 - 40YRS	6404.111661052291300	2581621.072401342900000	0106000020DF7F0000010000000103000000010000000F0000000022FDF6AC4D24412063EEAA8EAA5D41807346B4015524410F9C33F621AA5D4130DD24C692542441AC1C5A2890A95D41986E12031E54244175029AB0F6A85D41D8F97E4A835224410BB5A619DDA85D41381AC0FB27512441D5E76A73A6A85D41A879C709815024414DF38E8797A85D41B0BFEC1E3D502441470378B385A85D4190A0F851BA4E2441304CA6627FA85D4178A52C43284D24418D28EDFDAEA85D41D044D8B0C34A2441AA605486F7A85D41204A7BA3D0492441D9CEF73705A95D41E0BE0E9C014A2441B459F5B526A95D41000000204147244129ED0D2291AA5D410022FDF6AC4D24412063EEAA8EAA5D41
0	SAUERSTOWN WEST	GREATER THAN 40YRS	3193.681204964460000	541235.930090856850000	0106000020DF7F0000010000000103000000010000000A000000F0164810EF5924411DC9E5A7D6A95D41782D217F3B59244134A2B433B7A95D41480C02CBDF582441DBF97E7A93A95D41D8F0F42A98582441C3D32B095BA95D4178711B0DD7572441FB5C6D6521A95D4180C0CAC173562441AB3E577B0AA95D41986E12031E54244175029AB0F6A85D4130DD24C692542441AC1C5A2890A95D41807346B4015524410F9C33F621AA5D41F0164810EF5924411DC9E5A7D6A95D41
0	SAUERSTOWN	GREATER THAN 40YRS	5645.451400567453700	995628.969886412150000	0106000020DF7F0000010000000103000000010000002B000000383CBDF2635C2441A60A4619D7A95D41F831E62E505C2441E3C79863D1A95D41784F1E768F5C2441C58F3187CDA95D4178E09CB1AF5C24417FD93D6DC6A95D41A0EFA726B75C2441865AD32CA1A95D41D8C56D54C05C2441FE43FAD98DA95D41D8C56D74E05C244175029A307EA95D41C876BEFFEB5C24418C4AEAF06CA95D41903A016DA45C2441098A1F3760A95D4118E258976F5C24414703780F4DA95D41083D9BD5665C244117B7D1A447A95D41E02D90C0555C2441EC51B82642A95D417814AEC75A5C24414BEA043040A95D41787AA56C595C24411B9E5E593FA95D41D03B4E91545C24417D3F359231A95D4190976EB2615C2441F0A7C6D728A95D4138234A3B825C24413CBD52621BA95D41402CD4BA545C244117B7D1000EA95D41A82C439C285B24415B423ED0F2A85D4170567DCE8F592441992A1841D8A85D41A8DFBECE9F592441A857CA92D4A85D4140136103A64F2441C7293AEE35A85D4128CB1047C44E244116FBCB3636A85D41B003E7CCE34E24416519E2BC63A85D4190A0F851BA4E2441304CA6627FA85D41B0BFEC1E3D502441470378B385A85D41A879C709815024414DF38E8797A85D41381AC0FB27512441D5E76A73A6A85D41D8F97E4A835224410BB5A619DDA85D41986E12031E54244175029AB0F6A85D4180C0CAC173562441AB3E577B0AA95D4178711B0DD7572441FB5C6D6521A95D41D8F0F42A98582441C3D32B095BA95D41480C02CBDF582441DBF97E7A93A95D41782D217F3B59244134A2B433B7A95D41F0164810EF5924411DC9E5A7D6A95D41A08026822D5A24418FE4F293DCA95D41E81DA748535A2441E09C1129E0A95D41605DDCC6A05A244148BF7DCDE2A95D41D8C56D54EB5A24416D567DEEE3A95D41D066D587465B2441B98D0650E5A95D4108CE19B1A95B24413EE8D9C8E3A95D41383CBDF2635C2441A60A4619D7A95D41
0	ROWENA	GREATER THAN 40YRS	4632.470441761314800	624564.049091964150000	0106000020DF7F00000100000001030000000100000013000000C07D1DB8B85B24418E06F01EA0A85D41F8C2640ACB5B2441787AA5AC8DA85D41F8EDEB80EC5B2441A167B33E8AA85D41002B87D6D75B24412DB29D3B84A85D41D868004F6A5C2441371AC07F52A85D4170787A25665C24411AC05B604CA85D41283A92CB705B2441C05B20D150A85D4198438B8CA8592441AED85F5A5DA85D41E0C798BB4157244166F7E48968A85D41305530EAE756244132E6AE9D4DA85D4100000020E04F2441CD3B4EB5E1A75D4148B6F31D8A4E2441A69BC438E2A75D4128CB1047C44E244116FBCB3636A85D4140136103A64F2441C7293AEE35A85D41A8DFBECE9F592441A857CA92D4A85D4190B96BA9405A2441560E2D92AFA85D414060E5F0005B24416F8104FDBFA85D4198218E75565B244199BB9618B6A85D41C07D1DB8B85B24418E06F01EA0A85D41
0	NORTH END	GREATER THAN 40YRS	5988.665270556884000	895677.188285684680000	0106000020DF7F00000100000001030000000100000018000000C09F1A6FEB4C244132E6AE3D17A65D41D89AE6DDBA4C24413108AC0019A65D41285C8F02F64D2441EC51B85A59A65D4128530543244E2441F8C2645A6FA65D4110583994294E2441B4C876B682A65D4148B6F31D8A4E2441A69BC438E2A75D4100000020E04F2441CD3B4EB5E1A75D41305530EAE756244132E6AE9D4DA85D41B0BFECBE78562441E258174B2CA85D4130C4B18E4E552441250681E9D2A75D41C8EEC9631A552441FA7E6A58B3A75D4130D49A0601552441143FC6289FA75D416809F9E0075524414CA60AA296A75D4158A835CDBB542441C6DCB5B871A75D4138D6C5AD4B542441832F4C523BA75D41D0915CBE5A4F2441E4839EC5FCA65D4140A4DF9E404F24415BB1BF60F4A65D41C8BAB8ED0C4F244138F8C2A0F1A65D41081B9E1ED94F2441ABCFD566C4A65D4180C0CAE1D44F24411C7C6112C2A65D41F897DD93E94E2441D0B35931A1A65D413811369C754E24412D431C0F86A65D4120B072486C4E24412F6EA3855EA65D41C09F1A6FEB4C244132E6AE3D17A65D41
0	BARBOUR FIELDS	20 - 40YRS	5135.850332383573900	1143185.542954371500000	0106000020DF7F00000100000001030000000100000013000000F03845277A4624413333336301A85D41E0240661C34824415C20418917A75D4178832FAC5E45244151DA1BE019A75D4178E926B19741244155302AD9D0A65D41C0CAA1254A422441C2172657ABA65D4160A1D6345B412441D95F762F60A65D4198779C825A412441931804F258A65D41201FF42C0641244142CF668548A65D414837894129402441CB10C7B662A65D41E09387C5A63F24410F9C33726BA65D412897FFB05B3F24418F53747870A65D4118FBCB2E3C3E24412506818D7BA65D41385EBAC93E3F2441C66D34B4EEA65D41885AD39C25402441865AD3785EA75D41903A01ED50402441107A36CF90A75D41F0FDD4585E412441AE47E136CFA75D41F8A9F1922542244116FBCB86E7A75D4178711BED9045244155C1A89C01A85D41F03845277A4624413333336301A85D41
0	MZILIKAZI	GREATER THAN 40YRS	7820.340182621197500	2142983.838160609800000	0106000020DF7F0000010000000103000000010000002000000048B6F31D8A4E2441A69BC438E2A75D4110583994294E2441B4C876B682A65D4128530543244E2441F8C2645A6FA65D41285C8F02F64D2441EC51B85A59A65D41D89AE6DDBA4C24413108AC0019A65D41506B9A97D74B24419FCDAA7F2AA65D4160DC46E3554B2441E63FA49F46A65D4178E09CB1CE4A24412E90A0B87FA65D4158423E48314A244103098AE37DA65D41903A010D9B492441C520B0AA70A65D41384ED1312C4824411EA7E84054A65D41C086A7F753472441E258173349A65D4128CB1047F0462441E86A2B3645A65D41E0E995123146244188635D303CA65D4178A52C43F5452441ACADD89F28A65D41B047E19AA845244164CC5DFB11A65D41B02E6E03A745244167D5E76E01A65D41D834EFB884452441832F4C12F5A55D413008AC7C30452441D88173AEE5A55D41C8293AB22E45244144696F10D3A55D41E0718A8EB944244158A835FDDFA55D41B8847C300643244160E5D00610A65D4188A7574ABC4224410F9C332E18A65D41201FF42C0641244142CF668548A65D4198779C825A412441931804F258A65D4160A1D6345B412441D95F762F60A65D41C0CAA1254A422441C2172657ABA65D4178E926B19741244155302AD9D0A65D4178832FAC5E45244151DA1BE019A75D41E0240661C34824415C20418917A75D41F03845277A4624413333336301A85D4148B6F31D8A4E2441A69BC438E2A75D41
0	NGUBOYENJA	GREATER THAN 40YRS	2552.069159523093300	374396.792139024530000	0106000020DF7F0000010000000103000000010000000F00000088A7574A663F2441A245B687DCA55D4198559F6B3A3D2441F46C56D9CDA55D41B0EA7395613C2441143FC634D3A55D41088A1F835B3C24417AA52C5BD3A55D41A089B0A1783B24410612141BE0A55D41B003E70CE83A24412653053BE8A55D4198081B1E903D24417DAEB6964AA65D4118FBCB2E3C3E24412506818D7BA65D41E09387C5A63F24410F9C33726BA65D41201FF42C0641244142CF668548A65D4188A7574ABC4224410F9C332E18A65D41E8D0223B9B4124412EFF2179F3A55D411826532516412441091B9E6EECA55D4158302A49684024417CF2B0A8EBA55D4188A7574A663F2441A245B687DCA55D41
0	THORNGROVE	GREATER THAN 40YRS	6896.916441375922700	1600783.194795046700000	0106000020DF7F0000020000000103000000010000000C000000607FD9FD463724412D211F141AA55D41801D38E749372441EB73B57515A55D41F8EDEB203A3724412FDD247A15A55D41B896908F92352441190456461CA55D41484772B973352441000000481EA55D41C0C1170658362441ED0DBE4C3FA55D41283A928B9336244163EE5A3E35A55D4110363CBDD53624416519E22435A55D41303333B3A3372441158C4A862BA55D41903A01ADAB372441143FC66828A55D41A82C439C6037244182E2C75022A55D41607FD9FD463724412D211F141AA55D410103000000010000002A000000606DC5BE734A244151DA1B6C28A55D41504013E14E492441AED85FB2A2A45D41F0D24D223C492441A1D634239AA45D41181DC9652748244191ED7C4774A45D41385EBAA9B74724410B46259D44A45D41F08E5394AE4724412EFF21BD40A45D4110022BA7AC472441E8D9ACCE40A45D4118265385AD3E244196B20C5192A45D4188EB51D8853E24418126C2DA93A45D4158204151DB3D24412063EE769AA45D41B0E1E995DF3B244186C9541DA4A45D410893A9229D3B2441226C7852A8A45D4148C8075D553A244196438BD8ACA45D4168BC7453263A2441F697DD03B4A45D41B8847C70213A2441DE938731B9A45D415839B468493A2441BC9690D7BCA45D41E82631C85D3A244124B9FC27C0A45D41E8AE25248F3A24416FF08585C3A45D41F8EDEBE0FD3A24417A36ABD6C4A45D41A82C439C3A3B244192CB7F28C7A45D41F83A708E663B24417FD93D85CBA45D41506210586E3B2441F7065F68D1A45D41002B8796523B2441E4839EE9D5A45D4158D3BC23F53B244177BE9F6AFEA45D41582041312E3C2441C364AA54FEA45D416888631DC93C2441A7E8484EE6A45D41B069DEB1F03C2441F7065FA0D3A45D41B837F862743D24414772F92FCCA45D41B07268F1223E2441840D4F33D4A45D4178C7297A773E2441B3EA73B1E6A45D41F07C3F55E63F2441BE9F1A1B03A55D41D80968C21A3F2441F7065F8C25A55D4140C6DC755B4024415E4BC8D74BA55D4120F46C36AB432441C3D32B458CA55D41F085C9340C4524415DFE43A2C4A55D41C8293AB22E45244144696F10D3A55D41009A085B7E452441FDF675E0B2A55D4138CD3BAE1D472441B1E1E9F16CA55D4120D26F7FDF47244132E6AEA55FA55D41E8FBA951144824418D28ED055CA55D4120C9E53F6E4924417E8CB9F34AA55D41606DC5BE734A244151DA1B6C28A55D41
0	MAKOKOBA	GREATER THAN 40YRS	778.210993047583660	32678.017073225699000	0106000020DF7F00000100000001030000000100000006000000E0718A8EB944244158A835FDDFA55D4160EE5AE270442441287E8C85D8A55D41182FDD24DB42244133333307D6A55D41E0E00B93CE4224417CF2B06CFFA55D41B8847C300643244160E5D00610A65D41E0718A8EB944244158A835FDDFA55D41
0	THORNGROVE WEST	GREATER THAN 40YRS	5592.737845787040900	1157029.871941930100000	0106000020DF7F00000100000001030000000100000026000000E0E00B93CE4224417CF2B06CFFA55D41182FDD24DB42244133333307D6A55D4160EE5AE270442441287E8C85D8A55D41E0718A8EB944244158A835FDDFA55D41C8293AB22E45244144696F10D3A55D41F085C9340C4524415DFE43A2C4A55D4120F46C36AB432441C3D32B458CA55D4140C6DC755B4024415E4BC8D74BA55D41D80968C21A3F2441F7065F8C25A55D41F07C3F55E63F2441BE9F1A1B03A55D4178C7297A773E2441B3EA73B1E6A45D41B07268F1223E2441840D4F33D4A45D41B837F862743D24414772F92FCCA45D41B069DEB1F03C2441F7065FA0D3A45D416888631DC93C2441A7E8484EE6A45D41582041312E3C2441C364AA54FEA45D4158D3BC23F53B244177BE9F6AFEA45D41B815FBEB4C3C24417AC7294A14A55D4170A301DC1D3A24414CA60AAA14A55D41801D38E749372441EB73B57515A55D41607FD9FD463724412D211F141AA55D41A82C439C6037244182E2C75022A55D41903A01ADAB372441143FC66828A55D41303333B3A3372441158C4A862BA55D4110363CBDD53624416519E22435A55D41283A928B9336244163EE5A3E35A55D41C0C1170658362441ED0DBE4C3FA55D41B003E70CE83A24412653053BE8A55D41A089B0A1783B24410612141BE0A55D41B0EA7395613C2441143FC634D3A55D4198559F6B3A3D2441F46C56D9CDA55D4188A7574A663F2441A245B687DCA55D4158302A49684024417CF2B0A8EBA55D411826532516412441091B9E6EECA55D41E8D0223B9B4124412EFF2179F3A55D4188A7574ABC4224410F9C332E18A65D41B8847C300643244160E5D00610A65D41E0E00B93CE4224417CF2B06CFFA55D41
0	WESTONDALE	GREATER THAN 40YRS	4047.402121188482900	296801.263364597920000	0106000020DF7F00000300000001030000000100000005000000B89690CF1B3C24413A234A93DDA35D4100BC05529C3A2441EE5A42EEBEA35D41F0A7C6CB773A24417AA52C2FBFA35D4180D93D996C3A2441143FC6FCC4A35D41B89690CF1B3C24413A234A93DDA35D4101030000000100000004000000B8627F99473D244195D40988F5A35D4188F4DB57313C2441F0A7C64BDFA35D41D0B35915583C244189416099E4A35D41B8627F99473D244195D40988F5A35D4101030000000100000010000000F08E5394AE4724412EFF21BD40A45D41280F0B3518472441FB3A700EFEA35D4110A5BD41E14224412EFF21E51DA45D411071ACAB58422441014D84ED2DA45D4180613275734124410DE02D5838A45D41C05B2041DF3F24411AC05B902AA45D4128E483DE933F2441EBE2368A24A45D41789318441C402441742497DB30A45D415817B79189402441C74B37914CA45D41780B24081D3F2441DDB584A869A45D416891ED3C773F24414013617F8AA45D4118265385AD3E244196B20C5192A45D4188EB51D8853E24418126C2DA93A45D41B08BDBA8A03E24410E2DB26D93A45D4110022BA7AC472441E8D9ACCE40A45D41F08E5394AE4724412EFF21BD40A45D41
0	WESTGATE	GREATER THAN 40YRS	4947.302241354126600	685426.894551584260000	0106000020DF7F000001000000010300000001000000210000001083C0AAF8472441F54A596207A45D41B81E85EB15472441C7293A9EAFA35D41104FAF74C2432441B37BF294CDA35D41081214FF574324415839B4649EA35D4168DE714AF63F2441A857CAEABCA35D41B0506B5A833F24415E4BC8579FA35D41F0A7C6ABED3E2441849ECDBA9FA35D4158EC2F7BAA3E2441903177518EA35D4168AA6054F33D2441061214B78FA35D41D8D78193493C24419A779C3A89A35D41484772F9CF3A2441BADA8AB9ACA35D41C07D1D98993A2441B30C7100BAA35D41A01A2F9D813A2441BC749318BAA35D41F0A7C6CB773A24417AA52C2FBFA35D4100BC05529C3A2441EE5A42EEBEA35D41B89690CF1B3C24413A234A93DDA35D41984C152C2B3C2441B81E8573DEA35D4188F4DB57313C2441F0A7C64BDFA35D41B8627F99473D244195D40988F5A35D4178BE9F7A7F3E24413B014D940BA45D4128E483DE933F2441EBE2368A24A45D41C05B2041DF3F24411AC05B902AA45D4180613275734124410DE02D5838A45D411071ACAB58422441014D84ED2DA45D4110A5BD41E14224412EFF21E51DA45D41280F0B3518472441FB3A700EFEA35D4110022BA7AC472441E8D9ACCE40A45D41F085C954B5472441E7FBA9B544A45D41385EBAA9B74724410B46259D44A45D41D8E76AAB6549244124B9FCF332A45D41F0C9C3C26449244160764F5232A45D4120C9E53F4E492441A167B3AA2FA45D411083C0AAF8472441F54A596207A45D41
0	CITY CENTRE	GREATER THAN 40YRS	5943.287409111817400	992981.612527128540000	0106000020DF7F00000100000001030000000100000021000000F0C9C3C26449244160764F5232A45D4120C9E53F4E492441A167B3AA2FA45D41F08E5394AE4724412EFF21BD40A45D41385EBAA9B74724410B46259D44A45D41181DC9652748244191ED7C4774A45D41504013E14E492441AED85FB2A2A45D41606DC5BE734A244151DA1B6C28A55D4120C9E53F6E4924417E8CB9F34AA55D4120D26F7FDF47244132E6AEA55FA55D4138CD3BAE1D472441B1E1E9F16CA55D41009A085B7E452441FDF675E0B2A55D41C8293AB22E45244144696F10D3A55D413008AC7C30452441D88173AEE5A55D41D834EFB884452441832F4C12F5A55D41B02E6E03A745244167D5E76E01A65D41B047E19AA845244164CC5DFB11A65D41E0E995123146244188635D303CA65D41C086A7F753472441E258173349A65D41384ED1312C4824411EA7E84054A65D4158423E48314A244103098AE37DA65D4178E09CB1CE4A24412E90A0B87FA65D4160DC46E3554B2441E63FA49F46A65D41506B9A97D74B24419FCDAA7F2AA65D41D89AE6DDBA4C24413108AC0019A65D41C09F1A6FEB4C244132E6AE3D17A65D41F85C6DC5E24C24412063EEA215A65D41C86D34E0554C24414D840DEBCAA55D41F0B050CBE44C244154E3A577B9A55D41A8DFBE6ED74B24412D431C5364A55D4168006FA1BD4B244195D4096850A55D41585227A0D24A2441780B249430A55D41D8E76AAB6549244124B9FCF332A45D41F0C9C3C26449244160764F5232A45D41
0	QUEENS PARK WES	GREATER THAN 40YRS	912.592716419414840	2812.190628382996200	0106000020DF7F0000030000000103000000010000000700000050E3A53BF95B2441EC51B8F28DA85D41F8EDEB80EC5B2441A167B33E8AA85D41F8C2640ACB5B2441787AA5AC8DA85D41C07D1DB8B85B24418E06F01EA0A85D41E851B8FEBB5B24411D5A64639FA85D4140A4DF3ECB5B24418273460096A85D4150E3A53BF95B2441EC51B8F28DA85D4101030000000100000004000000083D9BD5665C244117B7D1A447A95D417814AEC75A5C24414BEA043040A95D41E02D90C0555C2441EC51B82642A95D41083D9BD5665C244117B7D1A447A95D410103000000010000000800000048B6F35DCE5C24415474243799A95D41D8C56D74E05C244175029A307EA95D41D8C56D54C05C2441FE43FAD98DA95D4178E09CB1AF5C24417FD93D6DC6A95D41784F1E768F5C2441C58F3187CDA95D41907EFB3ABF5C244196B20C9DCAA95D41201FF44CB95C2441DF4F8DEBB4A95D4148B6F35DCE5C24415474243799A95D41
0	NEWMANSFORD	GREATER THAN 40YRS	884.866306151394720	11033.881803573715000	0106000020DF7F0000010000000103000000010000000500000088DB6800B45D2441ADFA5C2D38AA5D41A82C433C645C2441B840822ED7A95D412897FFF0D75C2441D3BCE3D810AA5D410812145F825D2441E17A14763CAA5D4188DB6800B45D2441ADFA5C2D38AA5D41
0	NORTHGATE	GREATER THAN 40YRS	346.363986675014470	2629.526322352428900	0106000020DF7F00000200000001030000000100000006000000283108ECBD5D2441B8AF030B3BAA5D4188DB6800B45D2441ADFA5C2D38AA5D410812145F825D2441E17A14763CAA5D4110F2418FA35D2441CC5D4BF444AA5D41C8073D3B3B5E2441FFB27BDE4BAA5D41283108ECBD5D2441B8AF030B3BAA5D4101030000000100000005000000C8A145165D60244186C9541561AA5D4160C3D3AB286024417C6132C15FAA5D41E0C798DB73602441B7D100FA64AA5D41E09C11E5796024417E8CB99364AA5D41C8A145165D60244186C9541561AA5D41
0	KINGSDALE	GREATER THAN 40YRS	53.623068563847021	39.756644242270248	0106000020DF7F00000100000001030000000100000004000000E09C11E5796024417E8CB99364AA5D41E0C798DB73602441B7D100FA64AA5D41489D80069D6024418D976ED668AA5D41E09C11E5796024417E8CB99364AA5D41
0	QUEENSDALE	GREATER THAN 40YRS	308.038548815119440	3775.685531382098800	0106000020DF7F000001000000010300000001000000050000007858A8D5E462244158CA32C487AB5D4170A3011CC362244134A2B4038EAB5D41385EBA89DA62244173689171AAAB5D4198B20CD129632441D50968CEA2AB5D417858A8D5E462244158CA32C487AB5D41
\.
CREATE INDEX ON "gis"."suburb" USING GIST ("geom");
COMMIT;
