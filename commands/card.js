const {Client,MessageEmbed,MessageAttachment} = require("discord.js")
const { createCanvas, loadImage, registerFont } = require('canvas')
const Converter = require('timestamp-conv');

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

function getLines(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function ProcessLevel(data,CallBackFunc) {
    const {RequestAPIJSON,RequestAPINormal,AxiosRequestAPIJSON} = require("../bot_modules/FetchService.js")

    let AccountAgeMonth = 0
    /*
    let JoinDataData = timestampToDate(data["JoinedAt"],'yyyy:MM:dd:HH:mm:ss')
    let JoinDateArray = JoinDataData.split(":");
    let LastSeenData = timestampToDate(data["LastSeenAt"],'yyyy:MM:dd:HH:mm:ss')
    console.log(JoinDataData)
    console.log(LastSeenData)
    let LaseSeenArray = LastSeenData.split(":");
    */
    let JoinDateTime = new Converter.timestamp(data["JoinedAt"])
    let LastseenTime = new Converter.timestamp(data["LastSeenAt"])
    let JoinDateDate = new Date(JoinDateTime.getYear(),JoinDateTime.getMonth(),JoinDateTime.getDay())
    let LastSeenDate = new Date(LastseenTime.getYear(),LastseenTime.getMonth(),LastseenTime.getDay())

    AccountAgeMonth = monthDiff(JoinDateDate,LastSeenDate)

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

      CallBackFunc(final,"???",Math.round(result4),Math.round(result6 + result7),Math.round(result3 + result5 + result6),AccountAgeMonth,FriendCountRounded)
    })
}

module.exports = function(message,args,botinfo) {

  const {RequestAPIJSON,RequestAPINormal,AxiosRequestAPIJSON} = require("../bot_modules/FetchService.js")
  const StartType = require("../bot_modules/TypingService.js")
  const getRandomInt = require("../bot_modules/RandomService.js")

  if (!args[1]) { message.channel.send("Missing args 1 | Please type Username!"); return }
  let thing2search = message.content.replace(botinfo["Prefix"] + 'card ', '').replace(/ /g, '%20')
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

        const canvas = createCanvas(500, 700)
        const ctx = canvas.getContext('2d')

        registerFont('bot_assets/fonts/Comfortaa-Bold.ttf', { family: 'comfortaa_bold' })

        loadImage('https://i.imgur.com/4KCSvTb.png').then((ribbi_img) => {

            ctx.drawImage(ribbi_img,-14.6,57.7,354,174)
            
            loadImage('https://polytoria.com/assets/thumbnails/avatars/' + data["AvatarHash"] + '.png').then((avatar_image) => {
                ctx.drawImage(avatar_image,156,22,358,358)
                

                    loadImage('https://i.imgur.com/8PamD2O.png').then((image) => {
                        ctx.drawImage(image,0,227,497,471)

                        ctx.font = '700 30px comfortaa_bold';

                        ctx.fillStyle = '#ffffff';

                        ctx.fillText(data["Username"], 28, 340);
                        
                        ctx.fillStyle = '#d9d9d9';
                        ctx.font = '15px comfortaa_bold';

                        ctx.fillText("#" + data["ID"], 28, 360);

                        ctx.font = '17px comfortaa_bold';
                        ctx.fillStyle = '#ffffff';

                        let ProcessDesc = data["Description"]
                        if (data["Description"] = "") {
                            ProcessDesc = "No description set, boring..."
                        }

                        let lines = getLines(ctx,ProcessDesc.replace(/\r?\n|\r/, " "),441)
                        let Desc_CurrentXPos = 380
                        let linescount = 0
                        
                        lines.forEach(function (item, index) {
                            if (linescount < 2) {
                                linescount = linescount + 1
                                if (linescount < 2) {
                                    ctx.fillText(item, 28, Desc_CurrentXPos);
                                } else {
                                    ctx.fillText(item + "...", 28, Desc_CurrentXPos);
                                }
                                Desc_CurrentXPos = Desc_CurrentXPos + 23
                            }
                          });

                          ctx.font = '23px comfortaa_bold';
                          ctx.fillStyle = '#ffffff';

                          ProcessLevel(data,function(level,b,e,s,u,a,f) {
                            ctx.fillText(level, 45, 505);
                            ctx.font = '35px comfortaa_bold';

                            ctx.fillText(level, 110, 515);

                            ctx.font = '14px comfortaa_bold';
                            ctx.fillStyle = '#ffaf45';
                            ctx.fillText(b, 213, 513);

                            ctx.fillStyle = '#85daff';
                            ctx.fillText(e, 275, 513);

                            ctx.fillStyle = '#a03bff';
                            ctx.fillText(s, 337, 513);

                            ctx.fillStyle = '#53ff72';
                            ctx.fillText(u, 410, 513);

                            ctx.textAlign = "center";
                            ctx.fillStyle = '#ffffff';
                            ctx.font = '35px comfortaa_bold';

                            ctx.fillText(f, 70, 620);
                            ctx.fillText(a, 225, 620);
                            ctx.fillText(numberWithCommas(data["TradeValue"]), 405, 620);

                          
                            ctx.fillStyle = '#2599ff';

                            if (level >= 50) {
                              ctx.fillRect(85, 525, 290, 14);

                            } else if(level >= 35) {
                              ctx.fillRect(85, 525, 161, 14);
                            } else if(level >= 15) {
                              ctx.fillRect(85, 525, 95, 14);

                            } else {
                              ctx.fillRect(85, 525, 1, 14);
                            }



                            let attachment = new MessageAttachment(canvas.toBuffer(), 'Card.png')
        
                            message.channel.send("",attachment)
                            message.channel.stopTyping();
                          })
                          
                })
           
        })})


    })
}