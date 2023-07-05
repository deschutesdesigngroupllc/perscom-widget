const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })
}

const pluralize = (count, noun, suffix = 's') => {
  return `${count} ${noun}${count !== 1 ? suffix : ''}`
}

const Helpers = {
  formatDate,
  pluralize
}

export default Helpers
