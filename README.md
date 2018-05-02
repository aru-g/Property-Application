Property-application
===============

A MEAN stack web Application which has multiple pages, one for login, where you can login as a user or a registrar, where as the user, you can see the properties you own as well as those for sale, and as registrar you can see all the properties in the database. 

#Required
-nodejs version 4.4.1 or higher

#NPM Packages- 
express: ^4.10.6, 
mongodb, 
body-parser: ^1.15.1


#Install

1.  Download and extract the code. Mkae sure to extract the node_modules.zip folder which is included in the code. The extracted node_modules folder should be within the root folder.
2. Create a MongoDb Database called prop, and a collection in it called property with the following attributes - 
 			pid : contains the property id 
			reg_date : in the form "dd/mm/yyyy" 
			type : either building/agriculture 
			location : in the form "CITY_STATE" 
			status : either "Created", "Registered", or "Intended for Sale" 
			view_type : either "None", "Public", or "Private" 
			dimensions : in the form ddddxdddd 
			geo : latitude and longitude 
			owner : names of the owner(s) 
			private : either "None" or usernames of people the property is on sale for
	This collection is used to store and retrieve property details
3. In the MongoDb Database prop, create a collection called user with the following attributes - 
			username : unique username for every user
			fname : first name of user
			lname : last name of user
			password : password of user
			email : email - id of user
	This collection is used to store and retrieve user details, and is used for login.
	If you have created a Db with a different name, change the name 'prop' in line 27 of server.js to your Db name. 
4. Go to root directory on cmd prompt and run the command - node server.js
5. On browser, browse to "localhost:8081" and start using the application!

 Extra Info : Line 26 can be changed in index-user.html to change the background image.
				      Line 65 can be changed in index-user.html to change the logo.
					    In this application, the users have passwords stored in the database, whereas the registrars have just one password - 'admin'. All registrars have the same password.
						 
						

