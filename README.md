
# Getting Started with PERSCOM Widget

## Using The Widget

Place the following HTML code block on your website wherever you'd like the widget to display. Make sure to replace APIKEY and PERSCOMID with the appropriate values. Your API key will need to have the `view:widget` scope assigned to it.

    <!--Place the code block where you would like the widget displayed on your website. !-->
    <!--Replace APIKEY and PERSCOMID with your API key with the 'view:widget' scope and PERSCOM Account ID, respectively. !-->
    
	<link href="https://widget.perscom.io/widget.css" rel="stylesheet" />
	<script src="https://widget.perscom.io/widget.js"></script>
    <div class='perscom_roster' data-apikey='APIKEY' data-perscomid='PERSCOMID'>

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\  
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\  
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run build:widget`

Builds the app to use as a widget with all output in one bundled .js and .css file.

### `npm run format`

Formats the application source code.\  
Should be run before any PR's and pushes to the repository.

### `npm run lint`

Runs ESLint and checks source code for best practices and syntax errors.\  
Should be run before any PR's and pushes to the repository.