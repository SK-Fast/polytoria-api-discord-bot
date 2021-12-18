const {Client,MessageEmbed,Attachment} = require("discord.js")

module.exports = function(message) {

    const HelpEmbed = new MessageEmbed()
    .setThumbnail('https://polytoria.com/assets/thumbnails/guilds/1.png')
    .setURL('https://github.com/SK-Fast/polytoria-api-discord-bot')
     .setColor('#fe5953')
       .setTitle('Polytoria Community Bot')
       .addField("Version", "Running: **Version 1.20**")
      .addField("Open-sourced project", "This project is open-sourced. Tap the link above to view the repository.")
      .addField("Changelog for 1.20", "Coming Soon")
      .addField("Bot Support Information", "Please say **p!version** for more information on our support.")
        .setFooter("Made by DevPixels and bags. Contact us at DevPixels#5746, StarManTheGamer#0001")


    message.channel.send("",HelpEmbed)

}