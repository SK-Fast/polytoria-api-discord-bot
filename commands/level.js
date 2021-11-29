const {Client,MessageEmbed,Attachment} = require("discord.js")
const Converter = require('timestamp-conv');
const progressbar = require('string-progressbar');

function monthDiff(d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

module.exports = function(message,args,botinfo) {

  const {RequestAPIJSON,RequestAPINormal,AxiosRequestAPIJSON} = require("../bot_modules/FetchService.js")
  const StartType = require("../bot_modules/TypingService.js")
  const getRandomInt = require("../bot_modules/RandomService.js")

  const botprefix = botinfo["Prefix"]

  if (!args[1]) { message.channel.send("Missing args 1 | Please type Username!"); return }
  let thing2search = message.content.replace(botprefix + 'level ', '').replace(/ /g, '%20')
  console.log(thing2search)

    StartType(message)


      RequestAPIJSON("https://api.polytoria.com/v1/users/getbyusername?username=" + thing2search,function(data){
        if (typeof(data) == "undefined") { 
          message.channel.send("This user doesn't exist or API failed!")
          message.channel.stopTyping();

          return
        }
        if (data["Success"] == false) {
          message.channel.send("This user doesn't exist!")
          message.channel.stopTyping();

          return
        }

        let AccountAgeMonth = 0
        /*
        let JoinDataData = timestampToDate(data["JoinedAt"],'yyyy:MM:dd:HH:mm:ss')
        let JoinDateArray = JoinDataData.split(":");
        let LastSeenData = timestampToDate(data["LastSeenAt"],'yyyy:MM:dd:HH:mm:ss')
        console.log(JoinDataData)
        console.log(LastSeenData)
        let LaseSeenArray = LastSeenData.split(":");
        */
      
        let JoinDateTime = new Converter.timestamp(data["JoinedAt"]);
        let LastseenTime = new Converter.timestamp(data["LastSeenAt"]);
        let JoinDateDate = new Date(JoinDateTime.getYear(),JoinDateTime.getMonth(),JoinDateTime.getDay())
        let LastSeenDate = new Date(LastseenTime.getYear(),LastseenTime.getMonth(),LastseenTime.getDay())

        AccountAgeMonth = monthDiff(JoinDateDate,LastSeenDate)
        console.log(AccountAgeMonth)

        RequestAPIJSON("https://api.polytoria.com/v1/users/friends?id=" + data["ID"],function(data2){
          let FriendCountRounded = 10 * data2["Pages"]

          const result = 0 //60 * ((-1/((1.2*document.getElementById('id3').value/5000)+1)+1));
          const result2 = 12 * ((-1/((1*AccountAgeMonth)+0.4)+1));
          const result3 = 12 * ((-1/((FriendCountRounded/100)+1)+1));
          const result4 = 8 * ((-1/((data["ForumPosts"]/25)+1)+1));
          const result5 = 15 * ((-1/((data["ProfileViews"]/1500)+1)+1));
          const result6 = 10 * ((-1/((data["TradeValue"]/30000)+1)+1));              
          const result7 = 10 * ((-1/((data["ItemSales"]/3)+1)+1));              
      
          let final = result+result2+result3+result4+result5+result6+result7
          final = Math.round(final)

          let level2 = ""
          let ProcessImg = "https://cdn.discordapp.com/attachments/905650109382004770/914068492385407026/15lower.png"

          if (final > 15) {
            level2 =  "(Above Average)"
            ProcessImg = "https://cdn.discordapp.com/attachments/905650109382004770/914069399709839380/A3FwlG3nN7xpAAAAAElFTkSuQmCC.png"
            if (final > 50) {
              level2 = "(Insane)"
              ProcessImg = "https://cdn.discordapp.com/attachments/905650109382004770/914069071358746654/50more.png"

                if (final == 69) {
                  level2 = "(Nice)"
                  ProcessImg = "https://cdn.discordapp.com/attachments/905650109382004770/914068492767076352/69.png"


                } else if (final > 75) {
                  level2 = "(God)"
                  ProcessImg = "https://cdn.discordapp.com/attachments/905650109382004770/914068492574130216/75.png"

                }
            }
        } else {
          level2 = "(Noob)"
          ProcessImg = "https://cdn.discordapp.com/attachments/905650109382004770/914068492385407026/15lower.png"
        }

        let LevelBar = progressbar.splitBar(76, final,8,"▬","<:Online:906010400972234784>");
          
          const embed1 = new MessageEmbed()
          .setColor('#ff6666')
          .setTitle("⭐ " + data["Username"] + " s' Level")
          .setDescription(data["Username"] + " s' level is **" + final + level2 + "** 🎉\n\n<:Forum:914059872105021441> Forum level is.. **" + Math.round(result4) + "**\n<:Shop:914106876143230976> Economy level is... **" + Math.round(result6 + result7) + "**\n<:Users:914059858276409364> Fame level is... **" + Math.round(result3 + result5 + result6) + "**\n\nNoob <:noob:914061568780673025> " + LevelBar[0] + " Pro <:usd:914061652809359381>\n<:Online:906010400972234784> is " + data["Username"])
          .addFields(
            { name: 'Forum Posts', value: data["ForumPosts"],inline: true },
            { name: 'Friend count', value: `⁓ ${FriendCountRounded}`,inline: true },
            //{ name: 'Place Visits', value: `idk`,inline: true },
            { name: 'Account Age(Month)', value: AccountAgeMonth,inline: true },
            { name: 'Trade Value', value: data["TradeValue"],inline: true },
            { name: 'Profile views', value: data["ProfileViews"],inline: true },
            { name: 'Item Sales', value: data["ItemSales"],inline: true },
            )
          .setThumbnail(ProcessImg)
            .setFooter("This one use it's calculation system, So the result might not be the same as http://polytorialevel.great-site.net/")
  
          message.channel.send("",embed1)
          message.channel.stopTyping();
  
      })
       
      })
}
