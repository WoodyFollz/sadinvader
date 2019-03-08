const Discord = require('discord.js')
const fs      = require('fs')

const bot = new Discord.Client()
bot.commands = require('./utils/commandhandler.js')
bot.errors = {}

function errorHandler(error, message) {
  var id = bot.errors.length
  bot.errors[id] = error.stack
  
  bot.log('Error reported at #' + id)
  if (message) {
    message.reply('an error has been occured with ID ' + id)
  }
}

bot.log = (text) => text.split('\n').forEach(line => {
  console.log(`@${bot.tag}: {line}`)
})

const files = fs.readdirSync('./commands')
files.forEach(file => {
  var array = require('./commands/' + file)
  array.forEach(bot.commands.add)
  bot.log('File loaded ' + file)
})

bot.on('ready', () => bot.log('Ready to go.'))

bot.on('message', async(message) => {
  const prefixes = process.env.PREFIXES.split(',')
  const content  = message.content.toLowerCase()
  
  var prefix = prefixes.filter(x => content.startsWith(x))[0]
  if (!prefix) return // Not a command.
  
  var args = message.content.slice(prefix.length).split(' ')
  args = args.filter(x => x.length > 0)
  var cmd  = args.shift().toLowerCase()
  
  const ctx = {
    client: bot,
    bot: bot,
    prefix: prefix,
    command: cmd,
    message: message,
    channel: message.channel,
    author: message.author,
    member: message.member,
    reply: message.reply
  }
  const command = bot.commands.get(cmd)
  if (command.length === 0) return
  if (command.length > 1) return ctx.reply(
    'duplicate commands has been detected.'
    + '\n```\n' + command.map(x => x.name).join(', ') + '```'
  ).catch()
  
  command[0].callback.call(ctx, message, ...args).catch(err => {
    errorHandler(err, message)
  })
})

bot.on('error', errorHandler)

bot.login(process.env.TOKEN)