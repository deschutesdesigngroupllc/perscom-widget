<p align="center"><img src="../art/header.png" alt="Logo"></p>

<div align="center">

# The Official PERSCOM Widget

The PERSCOM Widget offers a simple and effective way to integrate your PERSCOM.io data externally into various websites and content management systems.

[![Deployment](https://github.com/DeschutesDesignGroupLLC/perscom-widget/actions/workflows/main.yml/badge.svg)](https://github.com/DeschutesDesignGroupLLC/perscom-widget/actions/workflows/main.yml)

[Documentation](https://docs.perscom.io)

</div>

## Introduction

By utilizing a straightforward HTML code snippet, the widget can elegantly render and present your data in a non-intrusive manner. Further, the widget can be fully customized using CSS to seamlessly blend with your website's aesthetics.

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

## Getting Started      

Explore the variety of available widgets:

- [Awards](https://docs.perscom.io/external-integration/widgets/awards)
- [Calendar](https://docs.perscom.io/external-integration/widgets/calendar)
- [Forms](https://docs.perscom.io/external-integration/widgets/forms)
- [Newsfeed](https://docs.perscom.io/external-integration/widgets/newsfeed)
- [Qualifications](https://docs.perscom.io/external-integration/widgets/qualifications)
- [Ranks](https://docs.perscom.io/external-integration/widgets/ranks)
- [Roster](https://docs.perscom.io/external-integration/widgets/roster)

## Documentation

Visit our documentation [here](https://docs.perscom.io) to get started.

## Contributing

Please see [here](../.github/CONTRIBUTING.md) for more details about contributing.

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