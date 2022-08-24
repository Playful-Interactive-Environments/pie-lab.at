# pie-lab.at

Website for Playful Interactive Environments at <https://pie-lab.at>

## Notes on the Setup

`_sass` and `_js` contain the source files. The `css` and `js` folders and their content are only held in this repository to provide them for gh-pages. These tasks aren’t included in the Jekyll build itself, so setting up a development machine is recommended. See the instructions for Windows and Mac OS X below.

## Development on Windows

These are the complete instructions for a development machine running under Microsoft Windows.

### Install Git and Clone the Repository

Get the Git binaries from <https://git-scm.com/> or download GitHub Desktop from <https://desktop.github.com/>, then clone the repository to your local machine (e.g., `C:\Users\[User]\Documents\GitHub\pie-lab.at`).

### Install Ruby

Go to <http://rubyinstaller.org/>, download the latest installer for Ruby and run it. Native extensions are built via MSYS2/MinGW. Even though the ruby installer does contain an installer, it is a bit outdated and might give you GPG key issues. Therefore, install MSYS2 from <https://www.msys2.org/#installation> before installing Ruby. 

If you're using [Chocolatey](https://chocolatey.org/), run `choco install msys2 ruby` to get both packages at once.

Then run `ridk install 3` to install the development toolchain.

### Install Bundler and Jekyll

Once Ruby is installed, install Jekyll and its necessary plugins using [Bundler](https://bundler.io/). First, install the Bundler gem: `gem install bundler`. Then install the gems listed in the Gemfile by calling `bundle install`. 

For further details, see <https://jekyllrb.com/docs/installation/>.

### Install Node.js

Node.js is used for the Gulp build workflow and to compile SASS (and other things). Go to <https://nodejs.org/> and download the current version and install it. The LTS version (usually older) is not required.

### Install the Dependencies for the Build Process

First, install the Gulp.js CLI globally: `npm install gulp-cli -g`.
Open a Terminal window and go to the directory where you cloned the repository (e.g., `C:\Users\[User]\Documents\GitHub\pie-lab.at`). Type in `npm install` to install all necessary dependencies.

### Start the Build System

The build workflow uses gulp. To start the server and all necessary tools, open a “Node.js command prompt” window, navigate to the cloned repository and enter `gulp dev`. This should start everything, including your Jekyll server. To access the website go to <http://localhost:4000/>. 

## Development on Mac OS X

These are the complete instructions for a development machine running under Mac OS X.

### Install Git and Clone the Repository

Get the Git binaries from <https://git-scm.com/> or download GitHub Desktop from <https://desktop.github.com/>, then clone the repository to your local machine (e.g., `/Documents/GitHub/pie-lab.at`).

### Install Ruby

Use the Ruby Version Manager (RVM) to get the latest Ruby version installed. Go to <https://rvm.io/> and follow the installation instructions on the front page. Provide the flag `--ruby` to install ruby together with RVM in one go.

### Install Bundler and Jekyll

Once Ruby is installed, install Jekyll and its necessary plugins with the help of Bundler. First, install the Bundler gem: `gem install bundler`. Then install the gems listed in the Gemfile by calling `bundle install`.

For further details, see <https://jekyllrb.com/docs/installation/>.

### Install Node.js

Node.js is used for the Gulp build workflow and to compile SASS (and other things). Go to <https://nodejs.org/> and download the current version and install it. The LTS version (usually older) is not required.

### Install the Dependencies for the Build Process

First, install the Gulp.js CLI globally: `npm install gulp-cli -g`.
Open a Terminal window and go to the directory where you cloned the repository (e.g., `/Documents/GitHub/pie-lab.at`). Type in `npm install` to install all necessary dependencies.

### Start the Build System

The build workflow uses gulp. To start the server and all necessary tools, open a Terminal window, navigate to the cloned repository and enter `gulp dev`. This should start everything, including your Jekyll server. To access the website go to <http://localhost:4000/>. 

## Available Gulp Tasks

* `gulp dev`: Development mode that watches the directory for changes.
* `gulp build`: Build mode, which creates a current website build in the `_site` directory.
* `gulp test`: Test mode that only runs eslint and stylelint to check for errors.

## Updating Dependencies

The packages used throughout the site are from the Ruby (gem) and Node.js (npm) ecosystems. They need to be updated separately.

## Update Ruby Dependencies

To update all Ruby gems involved, run `bundle update`. To remove (now unused) older versions, type `gem cleanup`.

## Update Node.js Dependencies

To update all Node.js modules involved, run `npm update`.

To go a step further and upgrade all dependencies in `package.json` to their latest available versions, use `npm-check-updates -u` (install first if not available: `npm install -g npm-check-updates`). This will create an updated `package.json`. Ensure that the previous version is stored in version control since npm-check-updates will overwrite it.
