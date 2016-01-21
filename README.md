
## Aurelia Typescript Skeleton for VisualStudio

This project provides an Aurelia skeleton application written in Typescript, using Systemjs/Jspm as module loader/packager and is configured to run in Visual Studio. 
Typescript debugging, in Visual Studio, does work in this project, the breakpoints are hit. SystemJS is configured to NOT transpile on the browser, the intention is that Visual Studio transpiles 
Typesscript to ES5 while building the project, therefore Gulp is not used in this project. Testing and deployment/bundling is not covered by this project.

[![Join the chat at https://gitter.im/aurelia/discuss](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/aurelia/discuss?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> To keep up to date on [Aurelia](http://www.aurelia.io/), please visit and subscribe to [the official blog](http://blog.durandal.io/). 
If you have questions, we invite you to [join us on Gitter](https://gitter.im/aurelia/discuss). 

### Running The App

To run the app, follow these steps.

* Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.

* Ensure that [Jspm](http://jspm.io/) is installed globally. If you need to install it, use the following command:
  
```shell
  npm install -g jspm
```

* Ensure that [tsd](http://definitelytyped.org/tsd/) is installed globally. If you need to install it, use the following command:

```shell
  npm install tsd -g
```

  > **Note:** Jspm must be installed globally, but a local version will also be installed to ensure a compatible version is used for the project.

  > **Note:** Sometimes Jspm queries GitHub to install packages, but GitHub has a rate limit on anonymous API requests. 
If you receive a rate limit error, you need to configure Jspm with your GitHub credentials. You can do this by executing 
`jspm registry config github` and following the prompts. If you choose to authorize Jspm by an access token instead of giving your 
password (see GitHub `Settings > Personal Access Tokens`), `public_repo` access for the token is required.

* Install the required modules and typescript definitions, from the project folder, execute the following commands:

```shell
npm install

jspm install -y

tsd install
```

>**Note:** Windows users, if you experience an error of "unknown command unzip" you can solve this problem by doing `npm install -g unzip` and then re-running `jspm install`.

* Open Aurelia-Typescript-Skeleton-4VS.sln in Visual Studio 2015.

 > **Note:** Visual Studio will automatically execute NPM Install upon the opening of the project. This might take a while and you have to wait until the job is finished. 

* Build the project and debug using Internet Explorer

> **Note:** If you encounter build errors, try re-installing the npm and or jspm modules. 

> **Note:** For the typescript breakpoints to be hit some settings had to be made in config.js. For each individual 
TS file a line was added to the META section telling systemJs to load the file using a script tag and not trough xhr. So if you add new Typescript files also add them to the config.js
  
> **Note:** Most typings will be found inside the Jspm folder (the jspm_packages folder should therefore be included in the project, for the node_modules folder this is not required) but some packages don't have their own definition (d.ts)
files. For those packages (a) definition file(s) should be placed inside the typings folder, these definitons are listed inside the tsd.json. If these definitions are somehow missing, (re)execute the "tsd install" command.

 
### Some notes on using Node and VisualStudio

 > **Note:** Older versions of NodeJs will store the Node Modules in a nested way, resulting in, sometimes, very long paths to these files. 
These long paths cannot be handled bij Windows, which results in errors when you for examples want to delete the node_modules folder. 
You can use the NPM package [Flatten-Packages](https://www.npmjs.com/package/flatten-packages) to 'Flatten' the packages inside de 
node_modules folder. This package is also available as [Visualstudio Extention](https://visualstudiogallery.msdn.microsoft.com/cd0b1938-4513-4e57-b9b7-c674b4a20e79)

> **Note:** The version of NodeJs which is used bij Visual Studio is not necessary the same version as the version you installed yourself. 
This might cause some issues, [you can synchronize the NodeJs version used by VisuaStudio](http://ryanhayes.net/synchronize-node-js-install-version-with-visual-studio-2015/).

> **Note:** If you want to see the Typescript Visual Project go to: Tools -> Options --> Text Editor --> TypeScript --> Project and check the "Display virtual project when.." checkboxes.

> **Note:** If you encounter the error "error TS2300: Duplicate identifier '***.d.ts'", see if you have a locally installed Npm typescript module. If so remove , if not check if you have duplicate packages folders, this happens after een update, see below..

> **Note:** This project uses the Visual Studio project template "HTML application with typescript", with AMD as module system. (see: project properties -> Typescript build). 

> **Note:** A tsconfig.json is not required in a Visual Studio Typescript project. The required settings are set in the project file. 

> **Note:** After an Jspm update the first build will probably fail with errors like: 'xxx not found' or 'Duplicate identifier '***.d.ts'. 
Problem here is that new packages are downloaded bij Jspm but not automatically included in your project. Old packages are deleted by Jspm but not excluded from your project. 
So you have to fix this manually.

### Some notes on typescript debugging in Visual Studio using SystemJS

Problem with Systemjs is that de js files are loaded trough ajax which disables the typescript debugging by Visual Studio. 
Systemjs config, has a setting which enables the loading of js files using a normal script tag.

`meta: {
    "pathtomodule": {
      "scriptLoad": true,
      "format": "global"
    },...
`

However this requires this setting to be set for each page/module inside the application. 
I am currently trying to find a more global configuration setting but i am still encountering errors.

```
packages: {
    "pages": {
        defaultExtension: "js",
        modules: {
            '*.html': { scriptLoad: false, loader: 'text' },
            '*.js': { scriptLoad: true, format: "global" }
        }
    }
},

```