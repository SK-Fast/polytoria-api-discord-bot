const {Client,MessageEmbed,Attachment} = require("discord.js")

module.exports = function(message) {

    const HelpEmbed = new MessageEmbed()
    .setThumbnail('https://cdn.discordapp.com/icons/587167555068624915/4149b9aea50a0fd41260d71ac743407d.webp?size=128')
    .setURL('https://github.com/SK-Fast/polytoria-api-discord-bot')
     .setColor('#fe5953')
       .setTitle('Information regarding the Bot')
       .addField("We are redoing the bot!", "The Polytoria Staff Team + DevPixels will be redoing every command to be even better than before. As a result for this, we will no longer be providing major updates to the bot until we are done with our reconstruction. (We will update the bot if there is an API change, don't worry!) Thank you for understanding.")
       .addField("Who does this apply?", "This applies for everyone running our bot using version 1.20 and below. The big update will be 2.0.0, with all kinds of new things and big changes.")
        .setFooter("Made by DevPixels and bags. Contact us at DevPixels#5746, StarManTheGamer#0001")


    message.channel.send("",HelpEmbed)

}