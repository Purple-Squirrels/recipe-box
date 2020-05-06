**Recipe Box Project**

http://sprpurplesquirrel.com/

Lil Mikey Mulderink, Emma Ritcey, Michelle Purple Squirrel Salgado, Lynn Comstock, Melissa McLean

This is a practice application to learn more about React, Node, Java, and AWS.

Build Scripts:

**Java**
- `mvn spring-boot:run`
- Access via `localhost:8080`

**Node**
- Running the most recent version of Node
- Build a `Keys.js` file in the root of node_app file. Get info from teammates for API keys.
- Navigate into /node-app and run `npm install`
- Then run: `npm start`
- Access via `localhost:8081`

**React**
- Running most recent version of Node
- Navigate into /node-app and run `npm install` then `yarn install`
- Then run `yarn start`
- Access via `localhost:3000`

**Deployment Instructions**
- Run: `ssh -i spr-recipe-box.pem ubuntu@ec2-3-133-210-166.us-east-2.compute.amazonaws.com`
- This will open up the ubuntu commandline where you will want to cd into `recipe-box` by going up one level and into `recipe-box`.
- Run: `sudo git pull origin master` to get latest master from GitHub 
- Navigate into React /app and run `sudo npm install` followed by `sudo yarn build` followed by ` sudo npm run moveBuildToJavaApp` -- This is to build React App and connects it to Java
- Navigate into Java /recipe-box and run `sudo mvn clean package` -- this packages up the Java 
- Navigate into /node-app and run `sudo npm install` -- This updates the NPM packages.
- Run: `sudo reboot` and commandline instance will end successfully. 

**One Time Only** 
- Get PEM Files from teammate, put in root of project where they are already in the .gitignore
- Run: `ssh -i spr-recipe-box.pem ubuntu@ec2-3-133-210-166.us-east-2.compute.amazonaws.com`
- PEM Files may give you issues with permissions, if this happens run this command: `chmod 400 <file name>` for each .pem file and then re-run ssh commands.
- This will open up the ubuntu commandline where you will want to cd into `/`.
- Clone the Repo from GitHub and navigate into it.
- Run: `sudo git pull origin master` to get latest master from GitHub
- Configure systemctl to run the appropriate applications on boot-up and restarts.


