const commands = []

exports.add = (obj) => commands[commands.length] = obj

exports.get = function get(name) {
  //check: exact name
  var command = commands.filter(x => x.name === name || x.aliases.includes(name))[0]
  if (command) return [command]
  
  //check: starting name with
  if (!command) {
    command = commands.filter(x => x.name.startsWith(name))
    return command
  }
  return []
}