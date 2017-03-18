# Who_Plays_Tonight?

**Generated from HotTowel Angular**

>*Opinionated Angular style guide for teams by [@john_papa](//twitter.com/john_papa)*

>More details about the styles and patterns used in this app can be found in my [Angular Style Guide](https://github.com/johnpapa/angularjs-styleguide) and my [Angular Patterns: Clean Code](http://jpapa.me/ngclean) course at [Pluralsight](http://pluralsight.com/training/Authors/Details/john-papa) and working in teams.

## Prerequisites

1. Install [Node.js](http://nodejs.org)
 - on OSX use [homebrew](http://brew.sh) `brew install node`
 - on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

2. Install Yeoman `npm install -g yo`

3. Install these NPM packages globally

    ```bash
    npm install -g bower gulp nodemon
    ```

    >Refer to these [instructions on how to not require sudo](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md)

## Running HotTowel

### Linting
 - Run code analysis using `gulp vet`. This runs jshint, jscs, and plato.

### Tests
 - Run the unit tests using `gulp test` (via karma, mocha, sinon).

### Running in dev mode
 - Run the project with `gulp serve-dev`

 - opens it in a browser and updates the browser with any files changes.

### Building the project
 - Build the optimized project using `gulp build`
 - This create the optimized code for the project and puts it in the build folder

### Running the optimized code
 - Run the optimize project from the build folder with `gulp serve-build`

## Exploring HotTowel
HotTowel Angular starter project

### Structure
The structure also contains a gulpfile.js and a server folder. The server is there just so we can serve the app using node. Feel free to use any server you wish.

	/src
		/client
			/app
			/content

### Installing Packages
When you generate the project it should run these commands, but if you notice missing packages, run these again:

 - `npm install`
 - `bower install`

### The Modules
The app has 4 feature modules and depends on a series of external modules and custom but cross-app modules

```
app --> [
        app.admin --> [
            app.core,
            app.widgets
        ],
        app.dashboard --> [
            app.core,
            app.widgets
        ],
        app.layout --> [
            app.core
        ],
        app.widgets,
		app.core --> [
			ngAnimate,
			ngSanitize,
			ui.router,
			blocks.exception,
			blocks.logger,
			blocks.router
		]
    ]
```

#### core Module
Core modules are ones that are shared throughout the entire application and may be customized for the specific application. Example might be common data services.

This is an aggregator of modules that the application will need. The `core` module takes the blocks, common, and Angular sub-modules as dependencies.

#### blocks Modules
Block modules are reusable blocks of code that can be used across projects simply by including them as dependencies.

##### blocks.logger Module
The `blocks.logger` module handles logging across the Angular app.

##### blocks.exception Module
The `blocks.exception` module handles exceptions across the Angular app.

It depends on the `blocks.logger` module, because the implementation logs the exceptions.

##### blocks.router Module
The `blocks.router` module contains a routing helper module that assists in adding routes to the $routeProvider.

## Gulp Tasks

### Task Listing

- `gulp help`

    Displays all of the available gulp tasks.

### Code Analysis

- `gulp vet`

    Performs static code analysis on all javascript files. Runs jshint and jscs.

- `gulp vet --verbose`

    Displays all files affected and extended information about the code analysis.

- `gulp plato`

    Performs code analysis using plato on all javascript files. Plato generates a report in the reports folder.

### Testing

- `gulp serve-specs`

    Serves and browses to the spec runner html page and runs the unit tests in it. Injects any changes on the fly and re runs the tests. Quick and easy view of tests as an alternative to terminal via `gulp test`.

- `gulp test`

    Runs all unit tests using karma runner, mocha, chai and sinon with phantomjs. Depends on vet task, for code analysis.

- `gulp test --startServers`

    Runs all unit tests and midway tests. Cranks up a second node process to run a server for the midway tests to hit a web api.

- `gulp autotest`

    Runs a watch to run all unit tests.

- `gulp autotest --startServers`

    Runs a watch to run all unit tests and midway tests. Cranks up a second node process to run a server for the midway tests to hit a web api.

### Cleaning Up

- `gulp clean`

    Remove all files from the build and temp folders

- `gulp clean-images`

    Remove all images from the build folder

- `gulp clean-code`

    Remove all javascript and html from the build folder

- `gulp clean-fonts`

    Remove all fonts from the build folder

- `gulp clean-styles`

    Remove all styles from the build folder

### Fonts and Images

- `gulp fonts`

    Copy all fonts from source to the build folder

- `gulp images`

    Copy all images from source to the build folder

### Styles

- `gulp styles`

    Compile less files to CSS, add vendor prefixes, and copy to the build folder

### Bower Files

- `gulp wiredep`

    Looks up all bower components' main files and JavaScript source code, then adds them to the `index.html`.

    The `.bowerrc` file also runs this as a postinstall task whenever `bower install` is run.

### Angular HTML Templates

- `gulp templatecache`

    Create an Angular module that adds all HTML templates to Angular's $templateCache. This pre-fetches all HTML templates saving XHR calls for the HTML.

- `gulp templatecache --verbose`

    Displays all files affected by the task.

### Serving Development Code

- `gulp serve-dev`

    Serves the development code and launches it in a browser. The goal of building for development is to do it as fast as possible, to keep development moving efficiently. This task serves all code from the source folders and compiles less to css in a temp folder.

- `gulp serve-dev --nosync`

    Serves the development code without launching the browser.

- `gulp serve-dev --debug`

    Launch debugger with node-inspector.

- `gulp serve-dev --debug-brk`

    Launch debugger and break on 1st line with node-inspector.

### Building Production Code

- `gulp optimize`

    Optimize all javascript and styles, move to a build folder, and inject them into the new index.html

- `gulp build`

    Copies all fonts, copies images and runs `gulp optimize` to build the production code to the build folder.

### Serving Production Code

- `gulp serve-build`

    Serve the optimized code from the build folder and launch it in a browser.

- `gulp serve-build --nosync`

    Serve the optimized code from the build folder and manually launch the browser.

- `gulp serve-build --debug`

    Launch debugger with node-inspector.

- `gulp serve-build --debug-brk`

    Launch debugger and break on 1st line with node-inspector.

### Bumping Versions

- `gulp bump`

    Bump the minor version using semver.
    --type=patch // default
    --type=minor
    --type=major
    --type=pre
    --ver=1.2.3 // specific version

## License

MIT

## Git
Vamos a definir los pasos a seguir para mantener un flujo de
trabajo correcto con GIT, el sistema de control de versiones empleado.

- Paso 1: CLONAR REPOSITORIO REMOTO A LOCAL

    Clonar el repositorio remoto ejecutando en la terminal abierta en el directorio
    donde queramos crear el repositorio local o proyecto:
    ```bash
    git clone https://github.com/whoplaystonight/whoplaystonight_MEAN.git
    ```
    Con esto nos habremos bajado la rama master del proyecto.


- Paso 2: CREAR BRANCH O RAMA

    Para preservar la rama master, cada colaborador se creará una rama de desarrollo,
    a la que le asignará el nombre del colaborador.
    ```bash
    git checkout -b Sergio
    ```
    Esta será la rama de desarrollo de cada colaborador, en la que implementará
    sus avances. En principio es una rama local, que habrá que subirla al repositorio
    remoto con:
    ```bash
    git push -u origin Sergio
    ```
    Ahora que ya tenemos la rama en local y remoto, cada cambio que realicemos en local
    lo reflejaremos en remoto con los commits y push correspondientes.

    Para comprobar en que rama nos encontramos ejecutar:
    ```bash
    git branch
    ```
- Paso 3: FUNDIR RAMAS PROPIAS CON LA RAMA MASTER

    Una vez terminado y comprobado el desarrollo en curso, es hora de fundirlo con
    la rama master.El primer paso es situarnos en la rama master y a continuación
    añadir los cambios de la rama propia a la rama master. Esto lo haremos ejecutando
    estas dos ordenes:

    Para situarnos en master:
    ```bash
    git checkout master
    ```
    Para añadir los cambios de la rama propia con la rama master:
    ```bash
    git merge Sergio
    ```
    Esta accion no nos añadirá los cambios de master a la rama propia, solo los
    de la rama propia sobre master.

- Paso 4: SUBIR CAMBIOS AL REPOSITORIO REMOTO

    Los ultimos cambios realizados se han hecho en el repositorio local.
    Ahora es el momento de subirlos al repositorio remoto. Situados en la rama
    master ejecutamos:
    ```bash
    git push -u origin master
    ```
    A partir de aqui pueden pasar dos cosas:

    - Que el repositorio remoto master no haya sufrido cambios por parte de
      algún otro colaborador, entoces el push se realizará correctamente.

    - Que el repositorio remoto haya sugrido cambios por parte de algun otro
      colaborador. Entonces se nos informará del conflicto. Lo normal es que se
      solucione ejecutando:
      ```bash
      git pull
      ```
      Si con el git pull se nos informa de conflictos, habrá que resolverlos
      entrando en los ficheros afectados y borrando el codigo que no deseemos
      mantener. El codigo añadido por nosotros se encontrara entre <<<<<HEAD y
      =====. Entre ====== y >>>>>>>> tendremos el codigo descargado de remoto.
      Borraremos el que proceda y una vez borrado, haremos git add . para añadir los
      archivo modificados y el commit correspondiente.

   Con esto habremos fusionado los últimos cambios del master remoto al master local
   Ahora ejecutaremos de nuevo:
   ```bash
   git push -u origin master
   ```
   Y habremos subido los ultimos cambios de nuestro master local (que ya
   contiene los cambios de nuestra rama propia local) al master remoto.


- PASO 5: FUNDIR RAMA MASTER CON RAMA PROPIA

  El último paso a realizar, solo en el caso de que queramos continuar
  trabajando con ella, es sincronizar los cambios de nuestra rama
  propia local con la rama master local( que acabamos de sincronizar con la
  master remota). Para ello, nos situamos en la rama propia con:
  ```bash
  git checkout Sergio
   ```
  Y haremos un merge con la rama master local:
  ```bash
  git merge master
   ```
  Subiendo a continuación los cambios a la rama propia remota:
  ```bash
  git push -u origin Sergio
   ```
Siguiendoe estos 5 pasos conseguiremos tener sincronizadas las 4 ramas
(master local,rama local, master remoto y rama remota).


## PASOS A SEGUIR PARA INSTALAR APLICACION EN VPS (DEPLOY)
## Node
- descargar en https://nodejs.org/es/
- descomprimir en `/opt`
```bash
tar -C /opt -Jxvf archivo.tar.xz
cd /usr/local/bin/
sudo ln -s /opt/node-v6.9.4-linux-x64/bin/node node
sudo ln -s /opt/node-v6.9.4-linux-x64/bin/npm npm
npm install -g bower gulp nodemon
whereis gulp
cd /usr/local/bin/
sudo ln -s /opt/node-v6.9.4-linux-x64/bin/bower bower
sudo ln -s /opt/node-v6.9.4-linux-x64/bin/gulp gulp
sudo ln -s /opt/node-v6.9.4-linux-x64/bin/nodemon nodemon
```
- Ejecutar el gulp como root ante cualquier problema
- // En caso de desastre borrar
whereis npm
whereis node
borrarlos todos


## Contact
Put your SENDGRID APIKEY in `src/server/.env` like this:
SENDGRID_API_KEY='YOUR API KEY'

## Facebook and Twitter
Put this info en .env after sengrid api key
- FACEBOOK_CLIENT_ID='FACEBOOK_ID'
- FACEBOOK_CLIENT_SECRET='FACEBOOK_SECRET'
- FACEBOOK_CALLBACK_URL='FACEBOOK_CALLBACK'
- TWITTER_CLIENT_ID='TWITTER_ID'
- TWITTER_CLIENT_SECRET='TWITTER_SECRET'
- TWITTER_CALLBACK_URL='TWITTER_CALLBACK'


TEST AUTODEPLOY__3