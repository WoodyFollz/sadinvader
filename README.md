<h2>How to use this bot ?</h2>
First, clone the repository.

    git clone git@github.com:Dannyiy/sadinvader.git
<br>
Install dependencies with:

    npm i
<br>
This bot needs some environment variables in order to run correctly.<br>
Here is the list:<br>
→ <b>DISCORD_TOKEN</b>: A bot token must be provided.<br>
→ <b>DISCORD_PREFIXES</b>: The bot can accept multiple prefixes. Separate them with a comma if multiples are given.<br>
<br>
Provide the environment variables before you start the bot. I can do a settings.json file if you need it, just create a issue about it.<br>
<h2>Common questions</h2>
<h3>1.   « what is that command managment!?... »</h3>
I wanted a powerful command managment with some useful shortcuts, like <b>this.send(...)</b> which supports the fact when the bot has no permission and send the message though DM to the author.<br>
Also, it can give you information on the current command being invoked like:<br>
→ the prefix used<br>
→ the name/alias used<br>
→ the command object<br>
Also it supports multi commands assignment in a single file.<br>
<br>
But this is not a problem, if you have a command that is not in this format, it's easier to convert it.<br>
In the <b>most cases</b>, editing the first line of the function can fix it.
<h3>2.   « Where should I supply the database? »</h3>
Nowhere for the moment. It is not supported currently but it's easy to make it in place.<br>
Just create a issue about it if you want it quickly.
<h2>Contribuate</h2>
Your help would be really appreciate in order to make the bot useful for everyone. Since it's open-source, you're allowed to fork it and use the source code for your own bot.
<h2>Official links</h2>
○ <b>Discord server</b><br>
      https://discord.gg/F8SysZX
