const Telegraf = require('telegraf');
const bot = new Telegraf('1223978718:AAGNhgMeWcEgQiGWpobp5JgZTdEEPcSUxPg');
const axios = require('axios');

bot.start((message) => {
    console.log('started:', message.from.id)
    return message.reply('Buongiorno alla Lega dei Fiori!');
})

bot.on('text', message => {
    const subreddit = message.message.text;
    if (message.message.text.toLowerCase().includes('juve')) return message.reply('Solo Juve era');
    if (message.message.text.toLowerCase().includes('inter')) return message.reply('Inter merda');
    return
    axios
        .get(`https://reddit.com/r/${subreddit}/top.json?limit=10`)
        .then(res => {

            const data = res.data.data;


            if (data.children.length < 1)
                return message.reply("La ricerca non ha portato risultati.");

            const link = `https://reddit.com/${data.children[0].data.permalink}`;
            return message.reply(link);
        })


        .catch(err => {
            console.log(err);
            return message.reply('prova un\'altra ricerca (in inglese)');
        });
});
bot.startPolling();