# flight-arrival

 AngularJS application that helps users decide on what combination of day and time of day a flight should be booked at in order to avoid delays for a given pair of origin and destination airports

## Build & development

Required software: NodeJS, Node Package Manager, Grunt, Yeoman, Bower.
Install NodeJS and npm according to your operating system.
Then run the following commands

    npm install -g grunt-cli bower

After cloning the repository, you need install the neccessary node modules and bower libraries by running these commands inside **restaurant-client** folder.

    npm install
    bower install
    
**Then run all the tests and a complete build to ensure that the project is configured correctly**, Check [Grunt Tasks](#grunt-tasks).

Grunt Tasks
--------------
    grunt test                  # Run all unit tests
    grunt serve                 # Run the server on port 9000
    grunt build                 # Build a distrubtable version
    grunt jshint:all            # Run jshint for project files
	grunt			# Run all unit tests and build a distrubtable version



## Deployment using dokcer

1- Install dokcer
2- run the following commands

```sh
docker build -t flight-arrival .
dokcer run -d -p 80:80 flight-arrival
``` 
In your browser navigate to http://localhost
And every thing will be up and running

License
----

Mohamed Waleed