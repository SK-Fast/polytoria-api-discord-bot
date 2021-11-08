const {Client,MessageEmbed,Attachment} = require("discord.js")

module.exports = function(message) {

    const HelpEmbed = new MessageEmbed()
    .setThumbnail('https://polytoria.com/assets/thumbnails/guilds/1.png')
    .setURL('https://discord.com/api/oauth2/authorize?client_id=905979909049028649&permissions=414464724032&scope=bot')
     .setColor('#fe5953')
       .setTitle('Inviting Polytoria Community Bot')
      .addField("Invite", "Thank you for choosing Polytoria Community Bot!")
      .addField("Permissions", "When you add our bot, it will ask you to use some permissions. Please select all of the options or the bot may not function propertly.")
        .setFooter("Made by DevPixels and bags. Contact us at DevPixels#5746, StarManTheGamer#0001")


    message.channel.send("",HelpEmbed)

}