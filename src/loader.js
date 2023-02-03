const IFRAME_ID = 'perscom_widget_iframe'
const WRAPPER_ID = 'perscom_widget_wrapper'

const WIDGET_ROSTER = 'roster'
const WIDGET_AWARDS = 'awards'
const WIDGET_RANKS = 'ranks'

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
  init = (apiKey, perscomId, widget) => {
    this.apiKey = apiKey
    this.perscomId = perscomId
    this.widget = widget ?? WIDGET_ROSTER
    this.setInframeUrl()
    this.initializeIframe()
    this.mountIframe()
  }

  setInframeUrl = () => {
    switch (this.widget) {
      case WIDGET_ROSTER:
        this.iframeUrl = config.roster.IFRAME_URL
        break

      case WIDGET_AWARDS:
        this.iframeUrl = config.awards.IFRAME_URL
        break

      case WIDGET_RANKS:
        this.iframeUrl = config.ranks.IFRAME_URL
        break

      default:
        console.error('The widget you entered does not exist.')
    }
  }

  initializeIframe = () => {
    if (!document.getElementById(IFRAME_ID) && this.iframeUrl) {
      const iframe = document.createElement('iframe')
      iframe.onload = () => {
        this.iframe.contentWindow.postMessage(
          {
            type: config.messages.IFRAME_LOADED,
            value: {
              apiKey: this.apiKey,
              perscomId: this.perscomId
            }
          },
          '*'
        )
      }
      iframe.src = this.iframeUrl
      iframe.id = IFRAME_ID
      iframe.crossorigin = 'anonymous'
      iframe.style.width = '100%'
      iframe.style.height = '100%'
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
   * Mount our iframe
   */
  mountIframe = () => {
    if (!document.getElementById(IFRAME_ID) && this.iframeUrl) {
      window.addEventListener('message', this.receiveMessage, false)
      const wrapper = document.createElement('div')
      wrapper.id = WRAPPER_ID
      wrapper.appendChild(this.iframe)
      document.body.appendChild(wrapper)
    }
  }

  /**
   * Handle messages received from iframe
   *
   * @param event
   */
  receiveMessage = (event) => {
    if (!!event && !!event.data && !!event.data.type) {
      switch (event.data.type) {
        case 'IFRAME_LOAD_DONE':
          this.handleWidgetLoaded()
          break
      }
    }
  }
}

/**
 * Initialze widget class
 */
export default ((window) => {
  const initCall = window.perscom._beforeLoadCallQueue.find((call) => call[0] === 'init')
  const widgetApi = () => {}
  const widget = new Widget()
  widgetApi.init = widget.init
  initCall && widgetApi[initCall[0]].apply(widgetApi, initCall[1])
})(global)
