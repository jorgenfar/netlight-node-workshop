# Netlight Node Workshop

1 - Create slackbot
  1.A - Empty Project
    Create project in github or in terminal. Using terminal:
    echo "# netlight-node-workshop" >> README.md
    git init

    You have now setup an initial empty git project.
    Git is the most widely used modern version control system, which lets you collaborate and change source code in an manageable way

  1.B - Add a readme.md
    You can write it using the github webpage, or using terminal:

    git add README.md
    git commit -m "first commit"
    git remote add origin git@github.com:<username>/<project>.git
    git push -u origin master

    A readme.md is like a repository documentation, where you specify how to use this module.

  1.C - Run `npm init`
    Write `npm init` in the terminal. This command interactively creates a package.json file in your project,
    letting you specify several options for your new project.

    The package.json file will be crucial in your project, as its a manifest of your project metadata, dependencies,
    and can be used to specify npm scrips. Is serves as documentation, lets you version your project and makes your project reproducible to others

    Remember, node needs to be installed before this will work, as npm follows with node installation.

  1.D - Install dependencies using npm
    Using npm install <package-name> you can install dependencies directly in your project.
    Run the command `npm install --save slackbots`. The dependency will now be added to your package.json

    Its a smart idea to add a .gitignore file specify that dependencies are not pushed to version management.

    You can browse npmjs.org to search for packages, and read documentation and visit github repositories.

    What is npm? npm is a package manager that makes it easy for javascript developers to share and reuse code.

  1.E - Add index.js
    The index.js will serve as our entrypoint into our tiny application.
    Specify main in package.json as index.js to document how to run your module.

    Write `console.log('Hello World')` in the index.js, and run the command node index.js in terminal.
    You now have your first tiny node application

  1.F - Read from json file
    Copy the file https://github.com/kentcdodds/starwars-names/blob/master/src/starwars-names.json into a new file in your project called starwars.json
    and require it in your index.js by adding `const starwars = require('./starwars');` in the top of your file.
    Change your hello world logging to `console.log(starwars);`, and rerun the command: `node index.js`

    JSON is a format that uses human-readable text to transmit data objects with key value pairs.

    The starwars names are in a list, and if you specify the index (position) of element you want to access in the list, you can write it out directly.
    Try changing the print command to `console.log(starwars[0]);` and rerun your application.
