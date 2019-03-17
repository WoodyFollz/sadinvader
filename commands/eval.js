const { inspect } = require('util')

function formatCode(code) {
  if (code.startsWith('```')) {
    return code.split('\n').slice(1, -1).join('\n')
  }
  return code
}

function formatResponse(response) {
  response = inspect(response) // return string representation
  response = response.replace(/`/g, '`­') // prevent markdown hell
                     .replace(/@/g, '@­') // prevent unwanted mentions
  return response
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
    if (value !== undefined) this.send("```js\n" + formatResponse(value) + "\n```")
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
  }
]
