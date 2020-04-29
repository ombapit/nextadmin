import LZString from 'lz-string'
import Cookies from 'js-cookie'

var CryptoJS = require("crypto-js");
const STORAGE_PREFIX = process.env.REACT_APP_STORAGE_PREFIX

const read = (initialStates, storage = Cookies) => {
  try {
    return Object.keys(initialStates).reduce((acc, key) => {
      const storageKey = STORAGE_PREFIX + key
      let newState = initialStates[key]
      if (storage.get(storageKey) !== null) {
        if (process.env.NODE_ENV === 'production') {
          newState = JSON.parse(CryptoJS.AES.decrypt(storage.get(storageKey), 'salt').toString(CryptoJS.enc.Utf8))
        } else {
          newState = JSON.parse(storage.get(storageKey))
        }
      }
      acc[key] = newState
      return acc
    }, {})
  } catch (e) {
    // console.log(e)
    return initialStates
  }
}

const write = (state, key, storage = Cookies) => {
  try {
    let data = ''
    if (process.env.NODE_ENV === 'production') {
      data = CryptoJS.AES.encrypt(JSON.stringify(state),'salt').toString()
    } else {
      data = JSON.stringify(state)
    }
    storage.set((STORAGE_PREFIX + key), data)
  } catch (e) {
    // console.log(e)
  }
}

export default { read, write }