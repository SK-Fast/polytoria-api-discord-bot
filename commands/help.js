const {Client,MessageEmbed,Attachment} = require("discord.js")

module.exports = function(message) {

    const HelpEmbed = new MessageEmbed()
     .setColor('#fe5953')
       .setTitle('Commands')
      .setDescription('Prefix: `p!`')
       .addFields(
        { name: 'catalog-search [Text to search]', value: '└ Search Catalog Item',inline: false },
        { name: 'random-game [id limit(optional)]', value: '└ Find Random game on polytoria',inline: false },
        { name: 'random-catalog [id limit(optional)]', value: '└ Find Random Catalog Item on polytoria',inline: false },
        { name: 'lookup [username]', value: '└ Lookup User Infomation',inline: false },
        { name: 'leaderboard [Category(optional)] [page number(optional)]', value: '└ Fetch Leaderboard',inline: false },
        { name: 'inspect-avatar [Username]', value: '└ Give details about user avatar',inline: false },
        { name: '404-random-catalog [id limit(optional)]', value: '└ Gives random Hidden Catalog item(It will be old render mostly)',inline: false },
        { name: 'random-user [id limit(optional)]', value: '└ Random Users in Polytoria',inline: false },

        )
        .setFooter("Made by DevPixels and bags. Contact me at DevPixels#5746, StarManTheGamer#0001")


    message.channel.send("",HelpEmbed)

}