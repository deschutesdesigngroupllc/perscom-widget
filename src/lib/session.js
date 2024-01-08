/**
 * Default session if nothing is set
 *
 * @type {{apiKey: string, perscomId: string, isLoggedIn: boolean}}
 */
export const defaultSession = {
  apiKey: '',
  perscomId: '',
  isLoggedIn: false,
  returnTo: '/'
};

/**
 * Session options
 *
 * @type {{password: string, cookieName: string, cookieOptions: {secure: boolean}}}
 */
export const sessionOptions = {
  password: 'complex_password_at_least_32_characters_long',
  cookieName: 'perscom_widget_session',
  cookieOptions: {
    sameSite: 'none',
    secure: true
  }
};
