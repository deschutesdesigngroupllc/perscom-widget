const optionalAttributes = [
  {
    attribute: 'data-limit',
    parameter: 'limit',
    value: ''
  },
  {
    attribute: 'data-include',
    parameter: 'include',
    value: ''
  },
  {
    attribute: 'data-tags',
    parameter: 'tags',
    value: ''
  },
  {
    attribute: 'data-timezone',
    parameter: 'timezone',
    value: 'UTC'
  }
]

const requiredAttributes = [
  {
    attribute: 'data-apikey',
    parameter: 'apikey',
    value: ''
  },
  {
    attribute: 'data-perscomid',
    parameter: 'perscomid',
    value: ''
  }
]

/**
 * Returns an array of optional API query parameters
 *
 * @returns {(string|*)[]}
 */
export function getOptionalApiParameters() {
  return optionalAttributes.map((attribute) => attribute.parameter)
}

/**
 * Returns an array of required API query parameters
 *
 * @returns {(string|*)[]}
 */
export function getRequiredApiParameters() {
  return requiredAttributes.map((attribute) => attribute.parameter)
}

/**
 * Finds and returns all optional and required incoming
 * attributes specified in the perscom widget DOM.
 *
 * @param document
 * @returns {{widget, requiredAttributes: *[], optionalAttributes: *[]}}
 */
export function findIncomingAttributes(document) {
  const perscomWidgetElement = document.getElementById('perscom_widget')

  const widgetAttribute = findWidgetAttribute(perscomWidgetElement)
  const requiredAttributes = findRequiredIncomingAttributes(perscomWidgetElement)
  const optionalAttributes = findOptionalIncomingAttributes(perscomWidgetElement)

  return { widget: widgetAttribute, requiredAttributes, optionalAttributes }
}

/**
 * Finds the widget attribute that will determine which widget
 * is to be displayed.
 *
 * @param perscomWidgetElement
 * @returns {string}
 */
export function findWidgetAttribute(perscomWidgetElement) {
  return perscomWidgetElement.getAttribute('data-widget')
}

/**
 * Finds and returns all optional incoming attributes specified
 * in the perscom widget DOM.
 *
 * @param perscomWidgetElement
 * @returns {*[]}
 */
export function findOptionalIncomingAttributes(perscomWidgetElement) {
  let attributes = []
  for (let i = 0; i < optionalAttributes.length; i++) {
    const parameter = optionalAttributes[i]

    if (perscomWidgetElement.getAttribute(parameter.attribute)) {
      parameter.value = perscomWidgetElement.getAttribute(parameter.attribute)
      attributes.push(parameter)
    }
  }

  return attributes
}

/**
 * Finds and returns all required incoming attributes specified
 * in the perscom widget DOM.
 *
 * @param perscomWidgetElement
 * @returns {*[]}
 */
export function findRequiredIncomingAttributes(perscomWidgetElement) {
  let attributes = []
  for (let i = 0; i < requiredAttributes.length; i++) {
    const parameter = requiredAttributes[i]

    if (perscomWidgetElement.getAttribute(parameter.attribute)) {
      parameter.value = perscomWidgetElement.getAttribute(parameter.attribute)
      attributes.push(parameter)
    } else {
      console.error(`Unable to find the required ${requiredAttributes[i].attribute} attribute.`)
    }
  }

  return attributes
}
