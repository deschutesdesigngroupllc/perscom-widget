const IFRAME_ID = 'perscom_widget_iframe'
const WRAPPER_ID = 'perscom_widget_wrapper'

const WIDGET_ROSTER = 'roster'
const WIDGET_AWARDS = 'awards'
const WIDGET_RANKS = 'ranks'
const WIDGET_QUALIFICATIONS = 'qualifications'

import { config } from './constants'

/**
 * PERSCOM Widget
 */
class Widget {
  /**
   * Initalize the widget
   *
   * @param apiKey
   * @param perscomId
   * @param widget
   */
  init = (apiKey, perscomId, widget, limit) => {
    this.apiKey = apiKey
    this.perscomId = perscomId
    this.widget = widget ?? WIDGET_ROSTER
    this.limit = limit ?? 15

    this.setIframeUrl()
    this.initializeIframe()
    this.mountIframe()
    this.setupIframeResizer()
  }

  /**
   * Sets up the library to auto resize the iframe
   * and injects into the client page.
   */
  setupIframeResizer = () => {
    if (document.getElementById(IFRAME_ID)) {
      var iframe = document.getElementById(IFRAME_ID)

      const iframeResizerScript = document.createElement('script')
      iframeResizerScript.src = 'https://cdn.jsdelivr.net/npm/iframe-resizer@4.3.3/js/iframeResizer.min.js'
      iframeResizerScript.type = 'text/javascript'
      iframe.before(iframeResizerScript)

      const iframeResizerInitializer = document.createElement('script')
      iframeResizerInitializer.type = 'text/javascript'
      iframeResizerInitializer.text =
        'var frame=document.getElementById("perscom_widget_iframe");frame.addEventListener("load",function(){iFrameResize({log:!1},"#perscom_widget_iframe")});'
      iframe.after(iframeResizerInitializer)
    }
  }

  /**
   * Determine the iframe URL we will be using based on
   * the passed in widget data attribute.
   */
  setIframeUrl = () => {
    switch (this.widget) {
      case WIDGET_ROSTER:
        this.iframeUrl = this.composeIframeUrl(config.roster.IFRAME_URL)
        break

      case WIDGET_AWARDS:
        this.iframeUrl = this.composeIframeUrl(config.awards.IFRAME_URL)
        break

      case WIDGET_RANKS:
        this.iframeUrl = this.composeIframeUrl(config.ranks.IFRAME_URL)
        break

      case WIDGET_QUALIFICATIONS:
        this.iframeUrl = this.composeIframeUrl(config.qualifications.IFRAME_URL)
        break

      default:
        console.error('The widget you entered does not exist.')
        break
    }
  }

  /**
   *
   * Compose our iframe URL appending query parameters necessary
   * for the API request.
   *
   * @param iframeUrl
   * @returns {string}
   */
  composeIframeUrl = (iframeUrl) => {
    const url = new URL(iframeUrl)

    url.searchParams.append('apikey', this.apiKey)
    url.searchParams.append('perscomid', this.perscomId)
    url.searchParams.append('limit', this.limit)

    return url.href
  }

  /**
   * Construct the iframe
   */
  initializeIframe = () => {
    if (!document.getElementById(IFRAME_ID) && document.getElementById(WRAPPER_ID) && this.iframeUrl) {
      const iframe = document.createElement('iframe')
      iframe.src = this.iframeUrl
      iframe.id = IFRAME_ID
      iframe.crossorigin = 'anonymous'
      iframe.style.width = '1px'
      iframe.style.minWidth = '100%'
      iframe.style.background = 'transparent'
      iframe.style.position = 'relative'
      iframe.style.margin = 0
      iframe.style.border = 'none'
      iframe.style.overflow = 'hidden'
      iframe.style.display = 'block'
      this.iframe = iframe
    }
  }

  /**
   * Mount the iframe
   */
  mountIframe = () => {
    if (!document.getElementById(IFRAME_ID) && document.getElementById(WRAPPER_ID) && this.iframeUrl) {
      const wrapper = document.getElementById(WRAPPER_ID)
      wrapper.appendChild(this.iframe)
    }
  }
}

/**
 * Initialze widget class
 */
export default ((window, document) => {
  if (window.perscom) {
    console.error('The PERSCOM widget is already embedded in the page. Exiting.')
    return
  }

  const perscomWidgetWrapperElement =
    document.getElementById('perscom_widget_wrapper') ??
    console.error(
      'We would not find the widget wrapper element. Please make sure the widget is wrapped in a div with ID "perscom_widget_wrapper".'
    )

  const perscomWidgetElement =
    document.getElementById('perscom_widget') ??
    console.error('We could not find the widget element. Please make sure the widget element\'s ID is set to "perscom_widget".')

  const apiKey =
    perscomWidgetElement.getAttribute('data-apikey') ??
    console.error('We could not find the widget API key. Please make sure to include the "data-apikey" attribute.')

  const perscomId =
    perscomWidgetElement.getAttribute('data-perscomid') ??
    console.error('We could not find the widget PERSCOM ID. Please make sure to include the "data-perscomid" attribute.')

  const widget =
    perscomWidgetElement.getAttribute('data-widget') ??
    console.error('We could not find the widget type. Please make sure to include the "data-widget" attribute.')

  const limit = perscomWidgetElement.getAttribute('data-limit')

  if (!perscomWidgetWrapperElement || !perscomWidgetElement || !apiKey || !perscomId || !widget) {
    return
  }

  window.perscom = new Widget()
  window.perscom.init(apiKey, perscomId, widget, limit)
})(window, document)
