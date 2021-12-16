const {Client,MessageEmbed,Attachment} = require("discord.js")
const browser = require("browser");
var DOMParser = require('dom-parser');

module.exports = function(message) {

    browser.browse("https://corp.polytoria.com/", function(err, out) {
        let doc = new DOMParser().parseFromString(out.result, "text/html")
        let players = doc.getElementsByClassName("display-1")[0].innerHTML
        let games = doc.getElementsByClassName("display-1")[1].innerHTML
        let usercreated = doc.getElementsByClassName("display-1")[2].innerHTML

        const embed1 = new MessageEmbed()
            .setColor('#1f2d41')
            .setTitle('Polytoria statistics')
            .setURL('https://corp.polytoria.com/')
            .setDescription(`Players: ${players}\nGames: ${games}\nUser Created item: ${usercreated}`)
            .setFooter('(according to corp.polytoria.com)');

        message.channel.send("",embed1)
      });
}