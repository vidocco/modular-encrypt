const btoa = (string) => {
  return Buffer.from(string).toString('base64')
}

const atob = (string) => {
  return Buffer.from(string, 'base64').toString('ascii')
}

const decRot = (string) => string.split('').map(el => String.fromCharCode(el.charCodeAt(0) - 13)).join('')
const encRot = (string) => string.split('').map(el => String.fromCharCode(el.charCodeAt(0) + 13)).join('')

module.exports = {
  btoa,
  atob,
  decRot,
  encRot
}