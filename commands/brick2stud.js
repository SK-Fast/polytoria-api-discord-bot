const {Client,MessageEmbed,Attachment} = require("discord.js")
const isNaN = require('is-nan');

module.exports = function(message,args) {

    if (!args[1]) {return message.channel.send("Missing args 1 | Please select amount!")}

    if (isNaN(parseInt(args[1]))) {
        message.channel.send("`Failure` The provided amount is not number.")
        return
    }

    let Calculated = Math.round(Number(args[1]) * 15)

    const Embed = new MessageEmbed()
    .setTitle("Bricks --> Studs")
    .setDescription(`**${args[1]}**  <:brick:905987077995376640> --> **${Calculated}**  <:stud:905987085347983411>`)
     .setColor('#fe5953')
    

    message.channel.send("",Embed)

}