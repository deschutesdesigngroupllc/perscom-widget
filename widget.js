/**
 * PERSCOM Widget
 *
 * @author Jon Erickson
 * @description A JavaScript widget for embedding PERSCOM functionality into web pages.
 */

const apiUrl = process.env.API_URL || 'https://api.perscom-app.test/v2/widgets/';

const SCRIPT_ID = 'perscom_widget';
const IFRAME_ID = 'perscom_widget_iframe';
const WRAPPER_ID = 'perscom_widget_wrapper';

/**
 * PERSCOM Widget
 */
class Widget {
  /**
   * Initialize the widget
   *
   * @param widget
   * @param apiKey
   * @param resource
   * @param dark
   */
  init = (widget = 'roster', apiKey = null, resource = null, dark = false) => {
    this.widget = widget;
    this.apiKey = apiKey;
    this.resource = resource;
    this.dark = dark;

    this.initializeIframe().then(() => {
      this.mountIframe();
      this.setupIframeResizer();
      this.setupNavigationListener();
    });
  };

  /**
   * Sets up the library to auto resize the iframe
   * and injects into the client page.
   */
  setupIframeResizer = () => {
    if (document.getElementById(IFRAME_ID)) {
      const iframeResizerScript = document.createElement('script');
      iframeResizerScript.src = 'https://cdn.jsdelivr.net/npm/@iframe-resizer/parent@5.3.2';
      iframeResizerScript.type = 'text/javascript';
      iframeResizerScript.onload = () => {
        window.iframeResize({ log: false, license: 'GPLv3', waitForLoad: true }, `#${IFRAME_ID}`);
      };

      document.body.appendChild(iframeResizerScript);
    }
  };

  /**
   * Construct the iframe
   */
  initializeIframe = async () => {
    if (!document.getElementById(IFRAME_ID) && document.getElementById(WRAPPER_ID)) {
      try {
        const iframe = document.createElement('iframe');
        iframe.id = IFRAME_ID;
        iframe.crossorigin = 'anonymous';
        iframe.style.width = '1px';
        iframe.style.minWidth = '100%';
        iframe.style.background = 'transparent';
        iframe.style.position = 'relative';
        iframe.style.margin = 0;
        iframe.style.border = 'none';
        iframe.style.overflow = 'hidden';
        iframe.style.display = 'block';
        iframe.style.outline = 'none';
        iframe.style.boxShadow = 'none';
        iframe.style.filter = 'none';
        iframe.setAttribute(
          'sandbox',
          'allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation allow-top-navigation-by-user-activation allow-modals'
        );

        this.iframe = iframe;
        this.navigate(this.widget);
      } catch (err) {
        console.error('Failed to initialize PERSCOM widget:', err);
      }
    }
  };

  /**
   * Mount the iframe
   */
  mountIframe = () => {
    if (!document.getElementById(IFRAME_ID) && document.getElementById(WRAPPER_ID)) {
      const wrapper = document.getElementById(WRAPPER_ID);
      wrapper.appendChild(this.iframe);
    }
  };

  /**
   * Register an event listener for changing the iframe src
   */
  setupNavigationListener = () => {
    window.addEventListener('message', (event) => {
      if (event.data?.type === 'widget:navigate' && event.data?.path) {
        console.debug('Received widget navigate event', event);
        this.navigate(event.data.path);
      }
    });
  };

  /**
   * Update the iframe src to a new URL
   *
   * @param path
   */
  navigate = (path) => {
    const url = new URL(apiUrl + path);
    url.searchParams.append('apikey', this.apiKey);

    if (this.dark) {
      url.searchParams.append('dark', 'true');
    }

    if (this.iframe) {
      this.iframe.src = url.toString();
    }
  };
}

/**
 * Initialize widget class
 */
(() => {
  const scriptTag = document.getElementById(SCRIPT_ID);
  const wrapperTag = document.getElementById(WRAPPER_ID);

  if (!scriptTag) {
    console.error(
      'PERSCOM widget script tag not found. Please include a script tag with ID "perscom_widget" in your HTML. Documentation and examples available at https://docs.perscom.io.'
    );
    return;
  }

  if (!wrapperTag) {
    console.error(
      'PERSCOM widget wrapper tag not found. Please make sure to wrap your "perscom_widget" script inside a div with ID "perscom_widget_wrapper". Documentation and examples available at https://docs.perscom.io.'
    );
    return;
  }

  const widget = scriptTag.getAttribute('data-widget');
  const apiKey = scriptTag.getAttribute('data-apikey');
  const resource = scriptTag.getAttribute('data-resource');
  const dark = scriptTag.getAttribute('data-dark') === 'true';

  console.log({
    widget: widget,
    apiKey: apiKey
  });

  window.perscom = new Widget();
  window.perscom.init(widget, apiKey, resource, dark);
})();
