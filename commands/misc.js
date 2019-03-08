async function ping(message) {
  return this.reply('pong.')
}

async function hi(message) {
  return this.reply('hello!')
}

module.exports = () => [{
  name: 'ping',
  callback: ping
}, {
  name: 'hi',
  callback: hi
}]