const TelegramApi = require("node-telegram-bot-api")
const token = "6634453101:AAE25MH3Qnn6dwVxBqGjnVeGIxvS5wuMWts"

const bot = new TelegramApi(token , {polling:true})
const chats = {}

const startGame = async (chatId)=>{
    const randomNumber = Math.round(Math.random()*10)
    chats[chatId] = randomNumber
     await bot.sendMessage(chatId , "Let's start the game.I'll choose number from 0 to 9 and you must guess it.")
     await bot.sendMessage(chatId , "Guess the number",gameOptions)
}
const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: "1" , callback_data:"1"},{text: "2" , callback_data:"2"},{text: "3" , callback_data:"3"}],
            [{text: "4" , callback_data:"4"},{text: "5" , callback_data:"5"},{text: "6" , callback_data:"6"}],
            [{text: "7" , callback_data:"7"},{text: "8" , callback_data:"8"},{text: "9" , callback_data:"9"}],
            [{text: "0" , callback_data:"0"}],
          
        ]
    })
}

const againOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard:[
            [{text:"New game", callback_data:"/again"}]
        ]
    })
}

const start = function(){
    bot.setMyCommands([
        {command:"/start" , description: "Start conversation"},
        {command:"/info" , description: "Get info"},
        {command:"/saythetruth" , description: "Know the reality"},
        {command:"/game" , description: "Game"}
    ])
    
    bot.on("message" , async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if(text === "/start"){
            await bot.sendSticker(chatId , "https://stickerswiki.ams3.cdn.digitaloceanspaces.com/MemeS1ick3r/429757.512.mp4")
            return bot.sendMessage(chatId , "Barev aper?")
        } else if(text === "/info") return bot.sendMessage(chatId , "chka info")
        else if(text === "/saythetruth") return bot.sendMessage(chatId , "esiminch")
        else if(text === "/game") { 
return startGame(chatId)
    }
      
    })
}

bot.on("callback_query" , async msg =>{
    const data = msg.data;
    const chatId = msg.message.chat.id
    if(data == "/again") return startGame(chatId)
   if(data == chats[chatId]){
    return await bot.sendMessage(chatId , `You won!! The number I choosed was ${chats[chatId]}`, againOptions)
   } else {
    return await bot.sendMessage(chatId , `You lose. The number I choosed was ${data}`, againOptions)

   }
   
}) 

start()