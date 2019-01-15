const {
  btoa,
  atob,
  encRot,
  decRot
} = require('./bases')

const DEFAULT_ENC = {
  base64: btoa,
  euc: encodeURIComponent,
  rot13: encRot
}

const DEFAULT_DEC = {
  base64: atob,
  euc: decodeURIComponent,
  rot13: decRot
}

module.exports = {
  DEFAULT_DEC,
  DEFAULT_ENC
}