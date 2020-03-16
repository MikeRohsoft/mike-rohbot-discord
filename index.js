const modules = require('./discord_modules');
const token = require('./key');
const Discord = require('discord.js');
const client = new Discord.Client();
const {timeToStr} = require('time-str');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const prefix = '!';
const timeoutTime = 60 * 1000;

const blackList = {};

function messageHandler(msg) {
    const message = msg.content;
    if (message.substr(0, prefix.length) !== prefix) {
        return;
    }
    const args = message.split(' ');
    const [key] = args.splice(0, 1);
    const command = key.substr(prefix.length);
    
    if (!modules.hasOwnProperty(command)) {
        return;
    }

    const now = new Date().getTime();
    if (!blackList.hasOwnProperty(msg.author.id)) {
        blackList[msg.author.id] = {}
        blackList[msg.author.id][command] = now;
    } else if (blackList[msg.author.id].hasOwnProperty(command)) {
        if (blackList[msg.author.id][command] + timeoutTime > now) {
            const restTime = (blackList[msg.author.id][command] + timeoutTime) - now;
            const str = `You can not call this command for ${timeToStr(restTime)}`;
            return msg.channel.send(str);
        } else {
            blackList[msg.author.id][command] = now;
        }
    } else {
        blackList[msg.author.id][command] = now;
    }
    if (!msg.guild 
        && modules[command].hasOwnProperty('guild') 
        && modules[command].guild) {
            return;
    }
    if (!modules[command].hasOwnProperty('required')) {
        return modules[command].run(msg, args, client);
    }
    const requirements = modules[command].required;
    
    if (msg.member.hasPermission(requirements, {
        checkAdmin: true,
        checkOwner: true,
    })) {
        return modules[command].run(msg, args, client);
    } else {
        return msg.reply('you are not allowed to do that!');
    }
}

client.on('message', messageHandler);
client.login(token);