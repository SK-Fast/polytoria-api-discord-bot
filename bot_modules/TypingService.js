module.exports = function StartType(message,timeoutthing) {
    let ProcessTimeOut = timeoutthing
    if (!timeoutthing) {
        ProcessTimeOut = 10000
    }
    message.channel.startTyping()

    setTimeout(() => {
      message.channel.stopTyping()
  
    }, ProcessTimeOut);
}