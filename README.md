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
