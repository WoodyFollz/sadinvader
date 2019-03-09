async function ping(message) {
  return this.reply('pong.')
}

async function pong(message) {
  return this.reply('ping.')
}

async function hi(message) {
  return this.reply('hello!')
}

module.exports = () => [
  {
    name: 'ping',
    callback: ping
  }, {
    name: 'pong',
    callback: pong
  }, {
    name: 'hello',
    callback: hi,
    aliases: ['hi']
  }
]