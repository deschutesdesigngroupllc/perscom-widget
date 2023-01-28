
# Getting Started With The PERSCOM Widget

The PERSCOM widget provides seamless external integration of your PERSCOM.io data into any website or content management system. Using a simple HTML code block, the widget can render and return your data in an elegant and non-obtrusive manner. The widget allows for full integration into your website through CSS customization.

## Using The Widget

Place the following HTML code block on your website wherever you'd like the widget to display. Make sure to replace APIKEY and PERSCOMID with the appropriate values. Your API key will need to have the `access:widget` scope assigned to it.

    <!-- Place the code block where you would like the widget displayed on your website. !-->
    <!-- Replace APIKEY and PERSCOMID with your API key with the ‘access:widget' scope and PERSCOM Account ID, respectively. !-->

    <link href="https://widget.perscom.io/widget.css" rel="stylesheet" />
	<script src="https://widget.perscom.io/widget.js"></script>
    <div id='perscom_roster' data-apikey='APIKEY' data-perscomid='PERSCOMID'></div>

## Example

The following example demonstrates the widget embedded within an Invision Community website.

![Invision Widget Preview](https://assets.perscom.io/images/widget-invision-preview-2.png)

## Documentation

Additional documentation can be found at [https://docs.perscom.io](https://docs.perscom.io).

## Development

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
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
