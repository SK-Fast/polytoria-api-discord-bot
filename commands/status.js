const {Client,MessageEmbed,Attachment} = require("discord.js")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = function(message,args) {

  const StartType = require("../bot_modules/TypingService.js")
  const getRandomInt = require("../bot_modules/RandomService.js")

  let StatusData = {
    Site: 0,
    Outernal: 0,
    Internal: 0,
    Corp: 0,
    Docs: 0,
  }

  function ProceedData() {
    let embed = new MessageEmbed()
.setColor('#fe5953')
  .setTitle('Polytoria Server Status')
 .setDescription(`
 ${StatusData["Site"].toString().startsWith("2") ? "<:check:920132963608457266>" : StatusData["Site"] == 503 ? "<:warning:920132963461627964>" : "<:error:920132962887028788>"}  Site Status (${StatusData["Site"]})
 ${StatusData["Outernal"].toString().startsWith("2")  ? "<:check:920132963608457266>" : StatusData["Outernal"] == 503 ? "<:warning:920132963461627964>" : "<:error:920132962887028788>"}  Outernal API Status (${StatusData["Outernal"]})
 ${StatusData["Internal"].toString().startsWith("2") ? "<:check:920132963608457266>" : StatusData["Internal"] == 503 ? "<:warning:920132963461627964>" : "<:error:920132962887028788>"}  Internal API Status (${StatusData["Internal"]})
 ${StatusData["Corp"].toString().startsWith("2") ? "<:check:920132963608457266>" : StatusData["Corp"] == 503 ? "<:warning:920132963461627964>" : "<:error:920132962887028788>"}  Corporate Website (${StatusData["Corp"]})
 ${StatusData["Docs"].toString().startsWith("2") ? "<:check:920132963608457266>" : StatusData["Docs"] == 503 ? "<:warning:920132963461627964>" : "<:error:920132962887028788>"}  Documents Page (${StatusData["Docs"]})
 `)

 .setFooter("Something went wrong? Please report it here: https://github.com/SK-Fast/polytoria-api-discord-bot/issues/new")

    message.channel.send("",embed)
  }

  fetch("https://polytoria.com").then(sitedata => {
    StatusData["Site"] = sitedata.status
   
    fetch("https://api.polytoria.com/v1/asset/info?id=50").then(assetdata => {
      StatusData["Outernal"] = assetdata.status

      fetch("https://polytoria.com/api/fetch/user/clientinfo?username=DevPixels").then(interdata => {
        StatusData["Internal"] = interdata.status

        fetch("https://corp.polytoria.com").then(interdata => {
        StatusData["Corp"] = interdata.status

        fetch("https://docs.polytoria.com").then(interdata => {
          StatusData["Docs"] = interdata.status

        ProceedData()
      })
    })

 })
})
})
}