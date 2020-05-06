**Recipe Box Project**

http://sprpurplesquirrel.com/

Lil Mikey Mulderink, Emma Ritcey, Michelle Purple Squirrel Salgado, Lynn Comstock, Melissa McLean

This is a practice application to learn more about React, Node, Java, and AWS.

Build Scripts:

**Java**
- `mvn spring-boot:run -Dspring-boot.run.arguments=--java.env=DEV`
- Access via `localhost:8080`


**Node & React**
- Navigate into each folder, run `npm install`
- Inside each folder run: `npm start`

**Node**
- Running most recent version of Node
- Access via `localhost:80`
- Build a `Keys.js` file in the root of node_app file. Get info from teammates for API keys.

**Node**
- Running most recent version of Node
- Access via `localhost:3000`

**Deployment Instructions**
- Get PEM Files from teammate, put in root of project where they are already in the .gitignore
- ( There are 2 files: cali-ec2-instance.pem & spr-recipe-box.pem )
- PEM Files may give you issues with permissions, if this happens run this command: `chmod 400 <file name>` for each .pem file and then re-run ssh commands.
- Run: `ssh -i spr-recipe-box.pem ubuntu@ec2-3-133-210-166.us-east-2.compute.amazonaws.com`
- This will open up the ubuntu commandline where you will want to cd into `recipe-box` by going up one level and into `recipe-box`. 

**One Time Only** 
- If remote is still BitBucket, change to GitHub. Check `git remote -v`
- Run: `sudo git remote rm origin ` followed by `git remote add origin <github address>`
- Run: `sudo git pull origin master` to get latest master from GitHub

**One Time Only** 

- Navigate into React /app and run `sudo npm install` followed by `sudo yarn build` followed by ` sudo npm run moveBuildToJavaApp` -- This is to build React App and connects it to Java
- Navigate into Java /recipe-box and run `sudo mvn clean package -Djava.env=null` -- this packages up the Java 
- Run: `sudo reboot` and commandline instance will end successfully. 

- Run: `ssh -i cali-ec2-instance.pem ubuntu@ec2-13-56-134-63.us-west-1.compute.amazonaws.com`
- Repeat changing the git remote instructions if necessary
- Navigate into /node-app and run `sudo npm install` followed by `sudo node Server.js` if server is already running run `sudo killall node`
- Run: `sudo reboot` and commandline instance will end successfully. 
