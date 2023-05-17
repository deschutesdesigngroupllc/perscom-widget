import { config } from './constants'
import { findIncomingAttributes } from './utils/ParameterManager'

const IFRAME_ID = 'perscom_widget_iframe'
const WRAPPER_ID = 'perscom_widget_wrapper'

/**
 * PERSCOM Widget
 */
class Widget {
  /**
   * Initalize the widget
   *
   * @param widget
   * @param requiredAttributes
   * @param optionalAttributes
   */
  init = (widget, requiredAttributes, optionalAttributes) => {
    this.widget = widget ?? 'roster'
    this.requiredAttributes = requiredAttributes
    this.optionalAttributes = optionalAttributes

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
   * Set the iframe URL
   */
  setIframeUrl = () => {
    this.iframeUrl = this.composeIframeUrl()
  }

  /**
   * Compose our iframe URL appending query parameters necessary
   * for the API request and using the widget attribute for the
   * path.
   *
   * @returns {string}
   */
  composeIframeUrl = () => {
    const url = new URL(`${config.app.WIDGET_URL}/${this.widget}`)

    if (this.requiredAttributes) {
      for (let i = 0; i < this.requiredAttributes.length; i++) {
        url.searchParams.append(this.requiredAttributes[i].parameter, this.requiredAttributes[i].value)
      }
    }

    if (this.optionalAttributes) {
      for (let i = 0; i < this.optionalAttributes.length; i++) {
        url.searchParams.append(this.optionalAttributes[i].parameter, this.optionalAttributes[i].value)
      }
    }

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
      iframe.style.userSelect = 'none'
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
  const { widget, requiredAttributes, optionalAttributes } = findIncomingAttributes(document)

  window.perscom = new Widget()
  window.perscom.init(widget, requiredAttributes, optionalAttributes)
})(window, document)
