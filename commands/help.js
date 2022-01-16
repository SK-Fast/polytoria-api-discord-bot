const {Client,MessageEmbed,Attachment} = require("discord.js")
let pagecount = 3
const paginationEmbed = require('discord.js-pagination');

let pages = [
   new MessageEmbed()
.setColor('#fe5953')
  .setTitle('Commands')
  .setThumbnail('https://cdn.discordapp.com/icons/587167555068624915/4149b9aea50a0fd41260d71ac743407d.webp?size=128')
 .setDescription('Prefix: `p!`')
 .addFields(
    { name: 'catalog-search [Text to search]', value: '└ Search Catalog Item',inline: false },
    { name: 'random-game [id limit(optional)]', value: '└ Find Random game on polytoria',inline: false },
    { name: 'random-catalog [id limit(optional)]', value: '└ Find Random Catalog Item on polytoria',inline: false },
    { name: 'lookup [username]', value: '└ Lookup User Infomation',inline: false },
    { name: 'leaderboard [Category(optional)] [page number(optional)]', value: '└ Fetch Leaderboard',inline: false },

    ),

    new MessageEmbed()
.setColor('#fe5953')
  .setTitle('Commands')
  .setThumbnail('https://cdn.discordapp.com/icons/587167555068624915/4149b9aea50a0fd41260d71ac743407d.webp?size=128')
 .setDescription('Prefix: `p!`')
 .addFields(
    { name: 'inspect-avatar [Username]', value: '└ Give details about user avatar',inline: false },
    { name: '404-random-catalog [id limit(optional)]', value: '└ Gives random Hidden Catalog item(It will be old render mostly)',inline: false },
    { name: 'random-user [id limit(optional)]', value: '└ Random Users in Polytoria',inline: false },
    { name: 'stud2brick [Amount]', value: '└ Convert Currency from Studs to Bricks',inline: false },
    { name: 'brick2stud [Amount]', value: '└ Convert Currency from Bricks to Studs',inline: false },

    ),

    new MessageEmbed()
.setColor('#fe5953')
  .setTitle('Commands')
  .setThumbnail('https://cdn.discordapp.com/icons/587167555068624915/4149b9aea50a0fd41260d71ac743407d.webp?size=128')
 .setDescription('Prefix: `p!`')
 .addFields(
       { name: 'level', value: '└ Fetch level(alternative of http://polytorialevel.great-site.net/)',inline: false },
            { name: 'random-banner', value: '└ Random Game Banners on Polytoria',inline: false },
    { name: 'information', value: '└ Information about the bot',inline: false },
        { name: 'invite', value: '└ Link to invite the bot to your server',inline: false },
        { name: 'version', value: '└ Information about the bots support',inline: false },
    ),
    new MessageEmbed()
    .setColor('#fe5953')
      .setTitle('Commands')
      .setThumbnail('https://cdn.discordapp.com/icons/587167555068624915/4149b9aea50a0fd41260d71ac743407d.webp?size=128')
     .setDescription('Prefix: `p!`')
     .addFields(
        { name: 'card', value: '└ Gives you information about you in an image',inline: false },
        { name: 'guild', value: '└ Gives you information the Guild you search for',inline: false },
        { name: 'game', value: '└ Gives you information the Game you search for',inline: false },
        { name: 'random-guild', value: '└ Gives you a random guild',inline: false },
        { name: 'status', value: '└ Shows if the Polytoria API is online/offline or experiencing issues',inline: false },
     ),
     new MessageEmbed()
    .setColor('#fe5953')
      .setTitle('Commands')
      .setThumbnail('https://cdn.discordapp.com/icons/587167555068624915/4149b9aea50a0fd41260d71ac743407d.webp?size=128')
     .setDescription('Prefix: `p!`')
     .addFields(
        { name: 'corpstats', value: '└ Shows you the information that is on the Corporate Website',inline: false },
    
        )

]

module.exports = function(message,args) {
   paginationEmbed(message, pages, ["◀","▶"], 60 * 1000);
}
