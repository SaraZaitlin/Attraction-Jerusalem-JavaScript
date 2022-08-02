# Attraction-Jerusalem-JavaScript

Submission of a year project c.
Author: Sara Zaitlin ID: 209181874
Author: Elisheva Roi ID: 322277161

About the website:
A site for searching for attractions in Jerusalem near the user, the site was developed in JavaScript in a webStrom work environment.
General instructions:
1. When entering the site, permission must be granted to access the location of the device from which they entered the site.
2. You can open the site in any browser.
3. When the user enters the site he can search for attractions near him (when he is in Jerusalem) or search for attractions by address in Jerusalem.
4. The site will identify the user's location when the user asks for certain attractions to give him the attractions closest to him.

![image](https://user-images.githubusercontent.com/88738433/182319209-de8e12af-bc05-4570-a52c-dbfccf0a6302.png)

The home page has 2 filter options.

![image](https://user-images.githubusercontent.com/88738433/182316282-f9a31781-43b6-4d86-91ac-9bd7d45139d3.png)

 1.It is possible to filter the attractions by age - which includes: children, families and adults.
 
![image](https://user-images.githubusercontent.com/88738433/182316399-e76dbf4b-1af6-4c5d-915e-2102208c66d4.png)

 2.It is possible to filter the attractions by type - this includes: parks, museums, malls, restaurants and zoos.
 ![image](https://user-images.githubusercontent.com/88738433/182316562-bb6831db-7d0d-49fa-b013-1c2d07d54901.png)

After the user filters the attractions according to what he wants, he is presented with 10 attractions that include his filter and that are closest to him.
It is possible to display additional results, and then the user is presented with 10 more attractions that include his filter and that are closest to him (after what was displayed). 
This way the user can continue to see more results until the end ...

![image](https://user-images.githubusercontent.com/88738433/182317165-b18ba958-c46f-460e-9b21-898bf9c7632f.png)

For each attraction is displayed: attraction name, attraction address, place rating, phone number (if any), user reviews of the attraction,
button to report attraction load (when user is in attraction he can report what level of load in attraction), attraction load (attraction When users reported), link to Google Maps of the attraction.

![image](https://user-images.githubusercontent.com/88738433/182318536-1a21a067-947a-4039-9ce3-2c53a6f7d768.png)

report load at the attraction:
* When the user is at the attraction and he wants to report the level of congestion at the attraction he can only when he is connected to the site with his details.
* A user can not report a load on an attraction more than once.

![image](https://user-images.githubusercontent.com/88738433/182318709-5dbfdaaa-973d-4ee1-a3be-a9a885598b9e.png)

New user registration:
The user registers on the site with a name and email.
The user then moves to the password entry screen, when the password must be entered within a minute, otherwise returns to the login page.

![image](https://user-images.githubusercontent.com/88738433/182322658-0b5e5bbe-1874-42ab-9ec6-927dbe02fcd5.png)

The various departments:
Customer side departments:
* attraction- A department that is responsible for handling all user clicks on the page of displaying the attractions by type.
* attractionAge- A department responsible for handling all user clicks on the page showing the attractions by age.
A department that handles all the common functions on the attraction display pages.
* buildDataBase- A department responsible for building and updating the database.
* main- A main class that handles the main page.
* functionAtc- A department responsible for handling common. 
functions on pages of filtering attractions by age and type.
* GeneralFunction- A department responsible for handling all the general functions common to the various pages on the site.
 * geocode - a department responsible for handling the location of the user by address and converting it to coordinates.

Server-side classes:
* index- is responsible for uploading the main page to the user.
* buildDataBase- is responsible for receiving and entering the data on the attractions into the tables.
* buildMuseume- A department responsible for receiving data on museum-type attractions and entering the data into the database.
* getAtraction- is responsible for displaying the 10 attractions to the user in order of proximity.
* attraction- Responsible for handling the page showing attractions by age.
* geneReviews- A department responsible for returning data about reports on certain attractions.
* load- A department responsible for receiving and updating the load level in the attraction from users.
* login- A department responsible for handling registration and customer login (displaying the pages and income and checking data in the user table).
* location - a department responsible for handling the identification and maintenance of the user's location.

The site use bootstap CDN therefore assumes an internet connection is available.

