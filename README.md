# Get Started with the PERSCOM Widget for React - Seamlessly Display Personnel Data

The PERSCOM Widget offers a simple and effective way to integrate your PERSCOM.io data externally into various websites and content management systems. By utilizing a straightforward HTML code snippet, the widget can elegantly render and present your data in a non-intrusive manner. Further, the widget can be fully customized using CSS to seamlessly blend with your website's aesthetics.

## Widget Options

Explore the variety of available widgets:

- [Awards](https://docs.perscom.io/external-integration/widgets/awards)
- [Calendar](https://docs.perscom.io/external-integration/widgets/calendar)
- [Forms](https://docs.perscom.io/external-integration/widgets/forms)
- [Newsfeed](https://docs.perscom.io/external-integration/widgets/newsfeed)
- [Qualifications](https://docs.perscom.io/external-integration/widgets/qualifications)
- [Ranks](https://docs.perscom.io/external-integration/widgets/ranks)
- [Roster](https://docs.perscom.io/external-integration/widgets/roster)

## How to Use the Widget

Insert the following HTML code snippet into your website at the desired location for widget display. Remember to replace `APIKEY` and `PERSCOMID` with the appropriate values.

```html
<!-- Place this code where you want the widget to appear on your website. -->
<!-- Replace APIKEY and PERSCOMID with your actual API key and PERSCOM Account ID. -->

<div id="perscom_widget_wrapper">
  <script
    id="perscom_widget"
    data-perscomid="PERSCOMID"
    data-apikey="APIKEY"
    data-widget="roster"
    src="https://widget.perscom.io/widget.js"
    type="text/javascript"
  ></script>
</div>
```

## Authentication and Permissions

To avoid a 403 Forbidden error, ensure that your API key possesses appropriate permissions for the chosen widget. Refer to our [documentation](https://docs.perscom.io) for detailed explanations and a permissions list for each widget.

## Example

Below is an example of the widget seamlessly integrated into an Invision Community website:

![Widget Preview](https://raw.githubusercontent.com/DeschutesDesignGroupLLC/perscom-widget/master/docs/roster-preview-1.png)

## Additional Resources

Find more comprehensive documentation at [https://docs.perscom.io](https://docs.perscom.io).

## Development

### Available Development Commands

Navigate to the project directory and execute the following commands:

### `npm start`

Launches the application in development mode.

### `npm start:widget`

Initiates a local web server serving `widget.js` for local development.

### `npm test`

Activates the test runner in interactive watch mode.

### `npm run build`

Compiles the application for production into the `build` folder.

### `npm run build:widget`

Compiles the widget for production into the `dist` folder.
The compiled file will be named `widget.js`.

### `npm run format`

Formats the source code of the application.
Run before pull requests and repository pushes.

### `npm run lint`

Executes ESLint to ensure source code adheres to best practices and syntax rules.
Run before pull requests and repository pushes.