/**
 * PERSCOM Widget
 *
 * @author Jon Erickson
 * @description A JavaScript widget for embedding PERSCOM functionality into web pages.
 */

const apiUrl = process.env.API_URL || 'https://api.perscom-app.test/v2/widgets/';

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
   */
  init = (widget = 'roster', apiKey = null) => {
    this.widget = widget;
    this.apiKey = apiKey;

    this.initializeIframe().then(() => {
      this.mountIframe();
      this.setupIframeResizer();
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
        const url = apiUrl + this.widget;
        const response = await fetch(apiUrl + this.widget, {
          headers: {
            Accept: 'text/html',
            Authorization: `Bearer ${this.apiKey}`
          }
        });

        let html;
        if (
          response.status >= 500 ||
          response.headers.get('content-type')?.includes('application/json')
        ) {
          const json = await response.json();
          html = `<script src="https://cdn.tailwindcss.com"></script><div class="text-sm"><div class="font-bold">${json.error.message}</div><ul class="mt-2 list-inside"><li><span class="font-semibold">URL:</span> ${url}</li><li><span class="font-semibold">Request ID:</span> ${json.error.request_id}</li><li><span class="font-semibold">Trace ID:</span> ${json.error.trace_id}</li></ul></div>`;
        } else {
          html = await response.text();
        }

        const blob = new Blob([html], { type: 'text/html' });
        const blobUrl = URL.createObjectURL(blob);

        const iframe = document.createElement('iframe');
        iframe.src = blobUrl;
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
}

/**
 * Initialize widget class
 */
(() => {
  const scriptTag = document.getElementById('perscom_widget');

  if (!scriptTag) {
    console.error(
      'PERSCOM widget script tag not found. Please include a script tag with id "perscom_widget" in your HTML.'
    );
    return;
  }

  const widget = scriptTag.getAttribute('data-widget');
  const apiKey = scriptTag.getAttribute('data-apikey');

  console.log({
    widget: widget,
    apiKey: apiKey
  });

  window.perscom = new Widget();
  window.perscom.init(widget, apiKey);
})();
