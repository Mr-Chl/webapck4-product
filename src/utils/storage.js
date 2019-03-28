/* localStorage操作
 * *
 * 创建：2017-11-22 */

const localStorage = window.localStorage;
const SOTRAGE_PREFIX = 'mia';

let store = {
  set(key, value) {
    try {
      if (key && value) {
        value = JSON.stringify(value);
        value = window.Base64.encode(value);
        value = encodeURIComponent(value);
      }
      document.domain = 'xinshengdaxue.com';
      localStorage[`${ SOTRAGE_PREFIX }:${ key }`] = value;
    } catch (err) {
      console.error('storage set error:', err);
    }
  },

  get(key) {
    try {
      let value = localStorage[`${ SOTRAGE_PREFIX }:${ key }`];
      if (value && value !== 'null' && value !== 'undefined') {
        value = decodeURIComponent(value);
        value = window.Base64.decode(value);
        value = JSON.parse(value);
      }
      return value;
    } catch (err) {
      console.error('storage get error:', err);
      return null;
    }
  },

  remove(key) {
    localStorage.removeItem(`${ SOTRAGE_PREFIX }:${ key }`);
  },

  clear() {
    localStorage.clear();
  },
};

export default store;
