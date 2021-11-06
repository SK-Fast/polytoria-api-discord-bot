const {Client,MessageEmbed,Attachment} = require("discord.js")

module.exports = function(message,args) {

    if (!args[1]) {return message.channel.send("Missing args 1 | Please select amount!")}

    let Calculated = Math.round(Number(args[1]) * 15)

    const Embed = new MessageEmbed()
    .setTitle("Bricks --> Studs")
    .setDescription(`**${args[1]}**  <:brick:905987077995376640> --> **${Calculated}**  <:stud:905987085347983411>`)
     .setColor('#fe5953')
    

    message.channel.send("",Embed)

}