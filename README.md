#Simple RESTful Web App with Node.js, Express, Axure, and MongoDB

Building from a tutorial from Christopher Buecheler this project incorporates Axure for UI elements connected to events coming from a recurring query against a MongoDB instance hosted on MongoLab

## Quickstart

Update app.js with the connection information for your MongoLabs instance.

Update /public/javascripts/global.js and/or /public/javascripts/devicefault.js to tailor the document content that is being used from the MongoDB instance in your project.

Copy the index.html page create by Axure into the /views directory replacing the current file. 

Copy the remaining Axure generated content into the /public directory. When updating this content be sure to delete the existing content before loading the new files to avoid leaving fragments in the public directory.

The existing devicefault.js code will send two types of event triggers containing a fault type and ID as payload all defined in the function "updateAxure". This updates the global variables with the payload from the MongoDB document. "global.js" is used by the debug.jade to pull back the most recent 5 documents from the database without any interaction with Axure to validate the applications connection to the database independently.

To change the frequency the database is polled modify the final value of the variable "refreshId" in both global.js or devicefault.js. The default value is "5000" which equals 5 seconds.

The two main pages for this application are 
http://localhost:3000/ - Defaults to the Axure content page
http://localhost:3000/debug - a debug page to validate the connection to MongoLabs

Use NPM to launch the application after install ("npm install") with "npm start"

## Author

Warren Schramm, Clint Rule, and Michael Stebbins from TEAGUE in Seattle put this together for a demonstration of near time event responses. To work with us please visit [TEAGUE.com](http://teague.com).

Christopher Buecheler is a front-end developer for a small San Francisco startup who created the original tutorial project that was the beginning for this project. You can visit him at [his website](http://cwbuecheler.com).


## Contents

* /public - static directories suchs as /images and Axure content directories
* /routes - route files for content and REST calls
* /views - views, both Jade and HTML pages
* README.md - this file
* app.js - central app file
* package.json - package info for project
