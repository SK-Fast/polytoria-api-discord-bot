const {Client,MessageEmbed,Attachment} = require("discord.js")

module.exports = function(message,args) {

  const {RequestAPIJSON,RequestAPINormal,AxiosRequestAPIJSON} = require("../bot_modules/FetchService.js")
  const StartType = require("../bot_modules/TypingService.js")
  const getRandomInt = require("../bot_modules/RandomService.js")

  if (!message.guild) { return }

  let reqtype = ""

  if (args[1]) {
    reqtype = "?c=" + args[1]
  }


  if (args[2] && args[1]) {
    reqtype = "?c=" + args[1] + "&p=" + args[2]
  }

  RequestAPIJSON("https://polytoria.com/api/fetch/leaderboard" + reqtype,function(data,statuscode){
    let DescProcess = ""
    let counter = 1
    for (const [key, value] of Object.entries(data)) {
      let InnerProcess = ""
      if (counter == 1) {
        InnerProcess = "🥇 " + InnerProcess 
      }
      if (counter == 2) {
        InnerProcess = "🥈 " + InnerProcess 
      }
      if (counter == 3) {
        InnerProcess = "🥉 " + InnerProcess 
      }

      InnerProcess = InnerProcess + "**" + value["username"] + "** | `" + value["statistic"] + "`\n"
      DescProcess = DescProcess + InnerProcess
      counter = counter + 1
    }

    const embed1 = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle("Polytoria Leaderboard")
    .setDescription("Username | Score\n\n" + DescProcess)
    .setFooter("You can also provide Category(networth, posts, comments, views, sales) and Page Number")

    message.channel.send("",embed1)
  })
}