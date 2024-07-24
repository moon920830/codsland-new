import Cookies from 'js-cookie';

// Set a cookie with options
export const setCookie = (name: string, value: string, options?: Cookies.CookieAttributes): void => {
  Cookies.set(name, value, options);
};

// Get a cookie
export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

// Remove a cookie
export const removeCookie = (name: string): void => {
  Cookies.remove(name);
};
