const { DEFAULT_DEC, DEFAULT_ENC } = require('../lib/constants')

const hashFunc = require('../lib/hash')

class ModularCrypt {
  constructor({steps = 5, encryption = DEFAULT_ENC, decryption = DEFAULT_DEC, key = 5, init = 'rot13'}) {
    if (typeof steps !== 'number') throw new Error('steps must be a number')
    if (typeof encryption !== 'object' || Array.isArray(encryption)) throw new Error('encryption must be an array')

    this.init = hashFunc(init, key)
    this.steps = steps
    this.key
    this.encryption = Object.keys(encryption).reduce((acc, el) => ({...acc, [hashFunc(el, key)]: encryption[el]}), {})
    this.decryption = decryption
  }

  encrypt(string) {
    const arr = Object.keys(this.encryption)
    let result = string
    for (let i = 0; i < this.steps; i++) {
      const target = arr[Math.floor(Math.random() * arr.length)]
      result = `${this.encryption[target](result)}-${target}`
    }
    return this.encryption[this.init](result)
  }

  decrypt(string, key) {
    const arr = Object.keys(this.decryption)
    const deInit = arr.find(el => hashFunc(el, key) === this.init)
    let result = this.decryption[deInit](string)
    let nextStep = result.match(/-([0-9])+$/gi)[0]

    while (nextStep) {
      const method = arr.find(el => hashFunc(el, key) === Number(nextStep.split('-')[1]))
      result = this.decryption[method](result.slice(0, result.length - nextStep.length))
      nextStep = result.match(/-([0-9])+$/gi)
      nextStep = nextStep && nextStep[0]
    }
    return result
  }
}

const crypt = new ModularCrypt({})
console.log(crypt.encrypt('this is a test'))
console.log(crypt.decrypt('n2P?2E?2P?2EN2DQ2P?2F@2BP2P?2EN2DQ2P?2F@2BP2P?2E?poy2P?2EC2DQZx2@SZ2BRTXZ`]YW[YW_TXWW^_^2@N2@R2@QRQ2@Q2@R2@SN2@R:>=ED=>?A>:>==DED', 5))