const {Client,MessageEmbed,Attachment} = require("discord.js")

module.exports = function(message) {

    const HelpEmbed = new MessageEmbed()
    .setImage('https://polytoria.com/assets/thumbnails/guilds/1.png')
     .setColor('#fe5953')
       .setTitle('Polytoria Community Bot')
      .setDescription('Running: Version 1.0.5')
       .addFields(
        

        )
        .setFooter("Made by DevPixels and bags. Contact us at DevPixels#5746, StarManTheGamer#0001")


    message.channel.send("",HelpEmbed)

}