const {Client,MessageEmbed,Attachment} = require("discord.js")

module.exports = function(message,args) {

    if (!args[1]) {return message.channel.send("Missing args 1 | Please select amount!")}

    let Calculated = Math.round(Number(args[1]) / 15)
    let Left = Number(args[1]) % 15

    const Embed = new MessageEmbed()
    .setTitle("Studs --> Bricks")
    .setDescription(`**${args[1]}**  <:stud:905987085347983411> --> **${Calculated}**  <:brick:905987077995376640>\nStud left from Convert currency: **${Left}**  <:stud:905987085347983411>`)
     .setColor('#92e714')
    

    message.channel.send("",Embed)

}