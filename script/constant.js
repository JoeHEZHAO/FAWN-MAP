//Fdacs:
url1 = "http://fdacswx.fawn.ifas.ufl.edu/index.php/read/station/format/json";
url2 = "http://fdacswx.fawn.ifas.ufl.edu/index.php/read/latestobz/format/json";
url3 = "http://fdacswx.fawn.ifas.ufl.edu/index.php/read/sevendaytimestamp/station_id/"
url3_1 = "/format/json";

//FAWN:
//url4 = "http://fawn.ifas.ufl.edu/controller.php/graphjson/data/150";
url4 = "http://fawn.ifas.ufl.edu/controller.php/graphjson/data/";
url5_1 = "http://fawn.ifas.ufl.edu/controller.php/week/obs/";
url5_2 = ";json?asText=1";
url6 = "http://fawn.ifas.ufl.edu/controller.php/latestmapjson/";

//Forecast
url_forcast1 = "http://forecast.weather.gov/MapClick.php?lat=";
url_forcast2 = "&lon=";
url_forcast3 = "&unit=0&lg=english&FcstType=json";

FawnStationFinder = [
'Alachua','Apopka','Arcadia','Avalon',
'Balm',
'Belle Glade',
'Bronson',
'Carrabelle',
'Citra',
'Clewiston',
'Dade City',
'DeFuniak Springs',
'Dover',
'Fort Lauderdale',
'Frostproof',
'Hastings',
'Homestead',
'Immokalee',
'Indian River',
'Jay',
'Joshua',
'Kenansville',
'Lake Alfred',
'Lecanto',
'Live Oak',
'Macclenny',
'Marianna',
'Mayo',
'Monticello',
'North Port',
'Ocklawaha',
'Okahumpka',
'Okeechobee',
'Ona',
'Palmdale',
'Pierson',
'Putnam Hall',
'Quincy',
'Sebring',
'St. Lucie West',
'Umatilla',
'Wellington'
]

FdacswxStdGrowerFinder = {
 "BAS0109" : "Lykes Bros"
,"Immokalee Grove" : "Immokalee Groves"
,"Zone 317" : "Southern Gardens Citrus"
,"Deseret - Magnolia Grove" : "Dan Skousen"
,"BAS0315" : "New Harvest, Inc."
,"BRI0705" : "New Harvest, Inc."
,"Southern Sisters" : "Roger Gurganus"
,"KAI KAI" : "Kai Kai Farm"
,"DIXIE BELLE" : "Marty McKenna"
,"PEBBLEDALE FARM LAKELAND" : "PEBBLEDALE FARM"
,"118 Grove" : "Duda"
,"Kirchman" : "Heller Brothers"
,"Living Colors Nursery" : "Living Colors Nursery, Inc"
,"Devil Garden North" : "Southern Gardens Citrus"
,"BEEHVN" : "Bee Heaven Farm"
,"Heller Immokalee" : "Heller Brothers"
,"Southern Hill Farms" : "Southern Hill Farms"
,"Deseret - Stapley Grove" : "Dan Skousen"
,"Prairie Tract" : "Krause Grove Service"
,"Windward Grove" : "Hancock Citrus"
,"Hawthorne Creek Grove" : "Barnes Citrus Inc."
,"Quincey Cattle" : "Don Quincey"
,"Duck Curve" : "Florida Specialties"
,"Florisweet Grove" : "Florisweet Enterprises"
,"Longino Ranch North" : "Cliff Coddington"
,"Grand Island Citrus" : "Spring Valley Farms LLC"
,"Alva Grove" : "Alva Land Management"
,"NEWS Grove" : "Duda"
,"455 GROVE" : "LENNON GROVE SERVICE"
,"BGG-Hancock Grove" : "Blue Goose Growers"
,"JUBILEE ORCHARDS" : "JUBILEE ORCHARDS"
,"Vo-Lasalle Farms" : "Steve Crump"
,"ACG YALAHEE" : "ALLAPATAH CRAGG GROVES CORPORATION"
,"Pine Tree Citrus" : "Thayer"
,"BAS0802" : "Lykes Bros"
,"CCLP Manatee" : "Consolidated Citrus LP"
,"Tommy Jones" : "Tommy Jones"
,"OCP-5 North" : "Old Corkscrew Plantation"
,"South Unit 2" : "Southern Gardens Citrus"
,"Deseret-Ruskin" : "Deseret Cattle and Citrus"
,"BBG-Grassy Island" : "Blue Goose Growers"
,"Clear Springs H" : "David Royal"
,"CCLP Immokalee" : "Consolidated Citrus LP"
,"CCLP Desoto" : "Consolidated Citrus LP"
,"CPI" : "Cooperative Producers Inc."
,"Tillis Farms" : "Murry Tillis"
,"Zone 322" : "Southern Gardens Citrus"
,"Dunson Sun River Grove" : "Dunson Harvesting"
,"Moon Ranch" : "Robert J. Barben, Inc."
,"Valencia" : "Premier Citrus"
,"Ranch One" : "Cooperative Producers Inc."
,"SMR North Grove" : "SMR Farms"
,"Blueberry Hill" : "Blueberry Hill, Inc."
,"BAS0103" : "New Harvest, Inc."
,"ADS-LP-EN" : "Duda"
,"CCLP Hickory" : "Consolidated Citrus LP"
,"ESG South" : "The ESG Companies"
,"English Brothers" : "English Brothers"
,"Grove 8" : "Hilliard Brothers of Florida"
,"BRI0415" : "New Harvest, Inc."
,"Bishop Farms Cypress" : "Craig Bishop"
,"Bynum Farm West" : "20 Mile Bend Grove LLC"
,"Clear Springs B" : "David Royal"
,"Field 12 North West" : "Seldom Rest Inc."
,"Church Road Grove" : "Alva Land Management"
,"CMK BLK 1" : "New Harvest, Inc."
,"L2-G24North End" : "Pines Ranch, Inc."
,"Longino Ranch South" : "Cliff Coddington"
,"Devil Garden South" : "Southern Gardens Citrus"
,"LKP GR 9" : "New Harvest, Inc."
,"Overlook South" : "Twenty Twenty Groves, Inc."
,"Blueberry" : "Nelson & Co"
,"Field 9 South West" : "Seldom Rest Inc."
,"CMK BLK 5" : "New Harvest, Inc."
,"Babbitts Nursery" : "Dale Babbitt"
,"FCC Section 2-42" : "Florida Agri Management Co."
,"Sun Ray" : "Premier Citrus"
,"Deseret - Bayrock Grove" : "Dan Skousen"
,"Dinner Island" : "Krause Grove Service"
,"Sandlin 2" : "Damon Sandlin"
,"Island Grove Farm 8" : "Island grove ag products"
,"Packers - Packer Grove" : "The Packers of Indian River Ltd."
,"BGG-Cow Creek/Cracker Trail" : "Blue Goose Growers"
,"Mudge Ranch" : "Tim Mudge"
,"Kilpatrick" : "Hilliard Brothers of Florida"
,"CMDM" : "CMDM Corporation"
,"L1-G5East" : "Pines Ranch, Inc."
,"Eagle Island Grove" : "Immokalee Groves"
,"Mineral Branch" : "Twenty Twenty Groves, Inc."
,"Imperial Grove" : "Lake Placid Caretakers"
,"Island Grove Hawthorne" : "Island grove ag products"
,"Bynum Farm East" : "20 Mile Bend Grove LLC"
,"Florida Specialties" : "Florida Specialties"
,"FCC Section 14-3" : "Florida Agri Management Co."
,"Rantz Smith Farms" : "Rantz Smith"
,"T2 Grove" : "Thayer"
,"Farm 7" : "Hilliard Brothers of Florida"
,"Star Grove 2" : "Heller Brothers"
,"BAILEY FARM SOUTH" : "Bailey Farms South, LLC"
,"Dunson Myakka Grove" : "Dunson Harvesting"
,"8-West" : "TRB Groves"
,"Sandlin 1" : "Damon Sandlin"
,"Citrus" : "Nelson & Co"
,"Trust II" : "Lake Placid Caretakers"
,"Lochloosa Lake Farms" : "Mike and Dianne Lane, LLC"
,"UNITED NURSERY" : "United Nursery"
,"Kirchman2" : "Heller Brothers"
,"BRI0919" : "New Harvest, Inc."
,"EVANS BROTHERS" : "Evans Brothers Blueberry"
,"BAS0508" : "New Harvest, Inc."
,"BAS0605" : "Lykes Bros"
,"WEST & WEST FARM" : "SCOTT WEST"
,"Kenninsville" : "UF IFAS Osceola Ext"
,"FCC14" : "florida Citrus Company, LLC"
,"Gerber" : "AGRI-BASICS, INC."
,"Bonnet Lake" : "734 Citrus Holdings, LLC"
,"Blueberry Bunch Farms" : "Blueberry Bunch Farms LLC"
,"Overlook Central" : "Twenty Twenty Groves, Inc."
,"Bass Grove" : "Hancock Citrus"
,"Seldom Rest South" : "Seldom Rest Inc."
,"L2-G39East" : "Pines Ranch, Inc."
,"BRI1010" : "New Harvest, Inc."
,"Lake Livingston" : "Twenty Twenty Groves, Inc."
,"Camp Mack Weather Station" : "Lykes Brothers"
,"5-D Blueberry" : "5-D Blueberry Farm"
,"CCLP Gopher Ridge" : "Consolidated Citrus LP"
,"PEBBLEDALE FARM ONA" : "PEBBLEDALE FARM"
,"Blue Sky" : "Blue Sky Farms"
,"Adrian Land" : "Adrian Land"
,"Capron Trail" : "Premier Citrus"
,"Office" : "Twenty Twenty Groves, Inc."
,"Shop 89 Grove" : "SMR Farms"
,"LKP GR 7" : "New Harvest, Inc."
,"Gordon-South" : "Twenty Twenty Groves, Inc."
,"F Walker" : "Francis Walker"
,"Berry Hill" : "Thayer"
,"Star Grove" : "Heller Brothers"
,"Island Pond" : "734 Citrus Holdings, LLC"
,"Barben Farms" : "Bobby Barben"
,"Becker Tree Farm" : "Becker Tree Farm"
,"JOHNS FARM" : "JIM JOHNS"
,"Overlook North" : "Twenty Twenty Groves, Inc."
,"ALTURAS GROVE" : "LENNON GROVE SERVICE"
,"Merritt/Snively Grove" : "James A. Snively"
,"1-East" : "TRB Groves"
,"Barben Tri County" : "Robert H. Barben"
,"Hwy 17" : "Twenty Twenty Groves, Inc."
,"Dunson Family Acres Grove" : "Dunson Harvesting"
,"SMR Shop Grove" : "SMR Farms"
,"Gordon-North" : "Twenty Twenty Groves, Inc."
,"Tauchen Grove" : "Hancock Citrus"
,"LKP GR 1" : "New Harvest, Inc."
,"Hartt Rd Site" : "S.Y. Hartt & Sons, Inc."
,"ADS-LB-NEES Grove" : "Duda"
,"Sun Pure" : "Premier Citrus"
,"OCP-1 South" : "Old Corkscrew Plantation"
,"FL Blue Farms" : "Brittany Lee"
,"Seldom Rest North" : "Seldom Rest Inc."
,"Bishop Farms Sweet Pond" : "Craig Bishop"
,"Gator Grove" : "Lake Placid Caretakers"
,"Lake Jesup" : "Nelson & Co"
,"GASKILL GROVE" : "LENNON GROVE SERVICE"
,"BBG-Bernard E Egan" : "Blue Goose Growers"
,"Lily" : "734 Citrus Holdings, LLC"
,"BAS0707" : "New Harvest, Inc."
,"Allison Farms" : "Carl Allison"
,"Hidden Acres Ranch" : "Hidden Acres Ranch"
,"Lake Placid Weather Station" : "Lykes Brothers"
,"L1-G7West" : "Pines Ranch, Inc."
,"LOST LAKE" : "Horace L. Durrance"
,"Dunson TMS Grove" : "Dunson Harvesting"
,"Dunson ACN Grove" : "Dunson Harvesting"
,"Red, White, Blueberries" : "Red, White, Blueberries Farm"
,"BGG-Medley" : "Blue Goose Growers"
,"BRIGR1" : "Lykes Bros"
,"FCC1" : "Florida Citrus Company, LLC"
,"ESG North" : "The ESG Companies"
,"Mid Florida Nursery" : "Bruce Rumph"
,"Nursery Grove" : "Hancock Citrus"
,"GB-West River" : "Graves Bros Co"
,"BRI0813" : "Lykes Bros"
,"Limestone" : "Carlton Farms"
,"PAM-DC" : "Paul Mislevy"
,"MEI-HTD" : "Mislevy Enterprises"
,"River Rd. Weather" : "3RT Farms"
,"Holoppaw" : "Premier Citrus"
,"Bassinger Grove" : "Alva Land Management"
,"Packers Emerald Grove" : "The Packers of Indian River Ltd."
,"Granddaddys" : "Ledford Farms"
,"Long & Scott Farms" : "Long and Scott Farms"
,"FIVE STAR FAMILY GROWERS" : "FIVE STAR FAMILY GROWERS"
,"L2-G33South" : "Pines Ranch, Inc."
,"South Unit 1" : "Southern Gardens Citrus"
,"Deseret-St Cloud" : "Deseret Cattle and Citrus"
,"ADS-BG-State G" : "Duda"
,"BigTrap" : "Seldom Rest Inc."
,"Far Reach Ranch" : "Far Reach Ranch"
,"Swan Grove" : "Bobby Barben"
,"Zone 311" : "Southern Gardens Citrus"
}
