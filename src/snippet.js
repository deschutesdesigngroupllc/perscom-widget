import { config } from './constants'
;(function (window, document) {
  if (window.perscom) {
    console.error('PERSCOM widget already included')
    return
  }
  window.perscom = {}
  var methods = ['init']
  window.perscom._beforeLoadCallQueue = []
  methods.forEach(
    (method) =>
      (window.perscom[method] = function () {
        window.perscom._beforeLoadCallQueue.push([method, arguments])
      })
  )
  var elt = document.createElement('script')
  elt.type = 'text/javascript'
  elt.async = true
  elt.src = config.app.FILE_URL
  var before = document.getElementsByTagName('script')[0]
  before.parentNode.insertBefore(elt, before)
})(window, document, undefined)
const perscomWidgetElement = document.getElementById('perscom_widget')
const perscomWidgetWrapperElement = document.getElementById('perscom_widget_wrapper')
if (!perscomWidgetWrapperElement) {
  console.error(
    'We would not find the widget wrapper element. Please make sure the widget is wrapped in a div with ID "perscom_widget_wrapper".'
  )
}
if (perscomWidgetElement) {
  const apiKey =
    perscomWidgetElement.getAttribute('data-apikey') ??
    console.error('We could not find the widget API key. Please make sure to include the "data-apikey" attribute.')
  const perscomId =
    perscomWidgetElement.getAttribute('data-perscomid') ??
    console.error('We could not find the widget PERSCOM ID. Please make sure to include the "data-perscomid" attribute.')
  const widget =
    perscomWidgetElement.getAttribute('data-widget') ??
    console.error('We could not find the widget type. Please make sure to include the "data-widget" attribute.')
  if (apiKey && perscomId && widget) {
    window.perscom.init(apiKey, perscomId, widget)
  }
} else {
  console.error('We could not find the widget element. Please make sure the widget element\'s ID is set to "perscom_widget".')
}
