const {Client,MessageEmbed,Attachment} = require("discord.js")

module.exports = function(message) {

    const HelpEmbed = new MessageEmbed()
    .setThumbnail('https://cdn.discordapp.com/icons/587167555068624915/4149b9aea50a0fd41260d71ac743407d.webp?size=128')
    .setURL('https://discord.gg/WYUCxga4qu')
     .setColor('#fe5953')
       .setTitle('Join our Discord Server!')
      .addField("Latest Features", "Here you can find the latest features we offer, and sometimes even test features we haven't released!")
      .addField("Reporting Bugs", "Did you find something and would like to help us fix it? You can report bugs to our server here!")
        .setFooter("Made by DevPixels and bags. Contact us at DevPixels#5746, StarManTheGamer#0001")


    message.channel.send("",HelpEmbed)

}