<p align="center"><img src="../art/header.png" alt="Logo"></p>

<div align="center">

# The Official PERSCOM Widget

The PERSCOM Widget offers a simple and effective way to integrate your PERSCOM.io data externally into various websites and content management systems.

![GitHub Release](https://img.shields.io/github/v/release/deschutesdesigngroupllc/perscom-widget?display_name=release)
![GitHub License](https://img.shields.io/github/license/DeschutesDesignGroupLLC/perscom-php-sdk)
[![Slack](https://img.shields.io/badge/Slack-4A154B?style=flat&logo=slack&logoColor=white)](https://slack.deschutesdesigngroup.com)
</div>

## Introduction

By using a straightforward HTML code snippet, the widget can elegantly render and present your data in a non-intrusive manner. Further, the widget can be fully customized using CSS to seamlessly blend with your website's aesthetics.

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

## Usage

Paste the following HTML code snippet into a website of your choice - making sure to replace `APIKEY` with a live token.

```html
<!-- Place this code where you want the widget to appear on your website. -->
<!-- Replace APIKEY with your actual API key. -->

<div id="perscom_widget_wrapper">
    <script
        id="perscom_widget"
        data-apikey="APIKEY"
        data-widget="roster"
        data-dark="false"
        src="https://widget.perscom.io/widget.js"
        type="text/javascript"
    ></script>
</div>
```

## Example

A live demo of the widget can be viewed [here](https://deschutesdesigngroupllc.github.io/perscom-widget/). This demo uses data straight from our demo organization available at [https://demo.perscom.io](https://demo.perscom.io).

## Contributing

Please see [here](../.github/CONTRIBUTING.md) for more details about contributing.
