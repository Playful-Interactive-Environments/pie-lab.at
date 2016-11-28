# pie.fh-hagenberg.at

Website for Playful Interactive Environments at <http://pie.fh-hagenberg.at>

## Notes on the Setup

\_sass and \_js are containing the source files. The css and js folders and their content are only contained in this repository to provide them for gh-pages. These tasks aren't included in the Jekyll build itself which is why setting up a development machine is recommended. See the instructions for Windows and Mac OS X below.

## Development on Windows

These are the full development instructions to get a development machine running under Microsoft Windows.

### Install Git and Clone the Repository

Get the Git binaries from <https://git-scm.com/> or download GitHub Desktop from <https://desktop.github.com/>, then clone the repository to your local machine (e.g., `C:\Users\[User]\Documents\GitHub\pie.fh-hagenberg.at`).

### Install Ruby

Go to <http://rubyinstaller.org/>, download the latest installer for Ruby and run it.

### Install Jekyll

Once Ruby is installed, install Jekyll as a Ruby gem via your Ruby enabled command prompt (Launch “Start command prompt with Ruby” in your start menu). Details here: <http://jekyllrb.com/docs/installation/>

### Install Node.js

To be able to compile SASS (and other things), Node.js needs to be installed. Go to <https://nodejs.org/> and download the latest stable version and install. Mature and stable (usually older) is not required.

### Install the Dependencies for the Build Process

Open a Terminal window and go to the directory where you cloned the repository to (e.g., `C:\Users\[User]\Documents\GitHub\pie.fh-hagenberg.at`). Type in `npm install` to install all necessary dependencies.

### Start the Build System

The build workflow uses gulp. To start the server an all necessary tools, open a “Node.js command prompt” window, navigate to the cloned repository and enter `gulp dev`. This should start everything including your Jekyll server. To access the website go to <http://localhost:4000/pie.fh-hagenberg.at>. 
Should the gulp command not succeed, you might have to install gulp globally again. Just type `npm install –global gulp`.

## Development on Mac OS X

These are the full developement instructions to get a development machine running under Mac OS X.

### Install Git and Clone the Repository

Get the Git binaries from <https://git-scm.com/> or download GitHub Desktop from <https://desktop.github.com/>, then clone the repository to your local machine (e.g., `/Documents/GitHub/pie.fh-hagenberg.at`).

### Install Ruby

Use the Ruby Version Manager (RVM) to get the latest Ruby version installed. Go to <http://rvm.io/> and follow the installation instructions on the front page. Provide the flag `--ruby` to install ruby together with RVM in one go.

### Install Jekyll

Once Ruby is installed, install Jekyll as a Ruby gem via Terminal. Details here: <http://jekyllrb.com/docs/installation/>

### Install Node.js

To be able to compile SASS (and other things), Node.js needs to be installed. Go to <https://nodejs.org/> and download the latest stable version and install. Mature and stable (usually older) is not required.

### Install the Dependencies for the Build Process

Open a Terminal window and go to the directory where you cloned the repository to (e.g., `/Documents/GitHub/pie.fh-hagenberg.at`). Type in `npm install` to install all necessary dependencies.

### Start the Build System

The build workflow uses gulp. To start the server an all necessary tools, open a Terminal window, navigate to the cloned repository and enter `gulp dev`. This should start everything including your Jekyll server. To access the website go to <http://localhost:4000/pie.fh-hagenberg.at>. 
Should the gulp command not succeed, you might have to install gulp globally again. Just type `npm install –global gulp`.

## Available Gulp Tasks

* `gulp dev`: Development mode that watches the directory for changes.
* `gulp build`: Build mode that creates a current build of the website in the `_site` directory.
* `gulp test`: Test mode that only runs eslint and stylelint to check for errors.
