import { parseDomain } from 'parse-domain';
import { findIncomingAttributes } from '../utils/parameters';

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
   * @param resourceAttribute
   * @param requiredAttributes
   * @param optionalAttributes
   */
  init = (
    widget = null,
    resourceAttribute = null,
    requiredAttributes = [],
    optionalAttributes = []
  ) => {
    this.widget = widget;
    this.resourceAttribute = resourceAttribute;
    this.requiredAttributes = requiredAttributes;
    this.optionalAttributes = optionalAttributes;

    this.setIframeUrl();
    this.initializeIframe();
    this.mountIframe();
    this.setupIframeResizer();
  };

  /**
   * Sets up the library to auto resize the iframe
   * and injects into the client page.
   */
  setupIframeResizer = () => {
    if (document.getElementById(IFRAME_ID)) {
      const iframeResizerScript = document.createElement('script');
      iframeResizerScript.src = 'https://cdn.jsdelivr.net/npm/@iframe-resizer/parent';
      iframeResizerScript.type = 'text/javascript';
      iframeResizerScript.onload = () => {
        window.iframeResize({ log: false }, `#${IFRAME_ID}`);
      };

      document.body.appendChild(iframeResizerScript);
    }
  };

  /**
   * Set the iframe URL
   */
  setIframeUrl = () => {
    this.iframeUrl = this.composeIframeUrl();
  };

  /**
   * Compose our iframe URL appending query parameters necessary
   * for the API request and using the widget attribute for the
   * path.
   *
   * @returns {string}
   */
  composeIframeUrl = () => {
    let url = new URL(process.env.WIDGET_URL);

    if (this.widget) {
      url = new URL(`${process.env.WIDGET_URL}/${this.widget}`);
    }

    if (this.resourceAttribute) {
      url.pathname += `/${this.resourceAttribute}`;
    }

    if (this.requiredAttributes) {
      for (let i = 0; i < this.requiredAttributes.length; i++) {
        url.searchParams.append(
          this.requiredAttributes[i].parameter,
          this.requiredAttributes[i].value
        );
      }
    }

    if (this.optionalAttributes) {
      for (let i = 0; i < this.optionalAttributes.length; i++) {
        url.searchParams.append(
          this.optionalAttributes[i].parameter,
          this.optionalAttributes[i].value
        );
      }
    }

    const { domain } = parseDomain(window.location.hostname);
    if (domain === 'perscom') {
      url.searchParams.append('footer', 'false');
    }

    return url.href;
  };

  /**
   * Construct the iframe
   */
  initializeIframe = () => {
    if (
      !document.getElementById(IFRAME_ID) &&
      document.getElementById(WRAPPER_ID) &&
      this.iframeUrl
    ) {
      const iframe = document.createElement('iframe');
      iframe.src = this.iframeUrl;
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
      iframe.setAttribute(
        'sandbox',
        'allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation allow-top-navigation-by-user-activation allow-modals'
      );
      this.iframe = iframe;
    }
  };

  /**
   * Mount the iframe
   */
  mountIframe = () => {
    if (
      !document.getElementById(IFRAME_ID) &&
      document.getElementById(WRAPPER_ID) &&
      this.iframeUrl
    ) {
      const wrapper = document.getElementById(WRAPPER_ID);
      wrapper.appendChild(this.iframe);
    }
  };
}

/**
 * Initialize widget class
 */
export default ((window, document) => {
  const { widget, resourceAttribute, requiredAttributes, optionalAttributes } =
    findIncomingAttributes(document);

  window.perscom = new Widget();
  window.perscom.init(widget, resourceAttribute, requiredAttributes, optionalAttributes);
})(window, document);
