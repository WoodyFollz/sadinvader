function formatCode(code) {
  if (code.startsWith('```')) {
    return code.split('\n').slice(1, -1).join('\n')
  }
}

async function evaluate(message, ...args) {
  var client  = this.bot
  var bot     = this.bot
  var channel = this.channel
  var guild   = this.guild
  var author  = this.author
  var asyncMode
  if (args[0] === '-a') {
    asyncMode = true
    args.shift()
  }

  let code = formatCode(args.join(' '))
  if (asyncMode) code = "(async() => {\n" + code + "\n})"

  try {var func = eval(code)}
  catch (err) {this.send("```fix\n" + err.toString() + "\n```")}

  if (!asyncMode) return this.send("```js\n" + func + "\n```")
  func().then(value => {
    if (value) this.send("```js\n" + value + "\n```")
  }).catch(error => {
    this.send("```fix\n" + error.toString() + "\n```")
  })
}

module.exports = () => [
  {
    name: 'eval',
    callback: evaluate,
    checks: {
      ownerOnly: true
    }
]