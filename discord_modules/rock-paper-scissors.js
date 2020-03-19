const { oneOrTwo } = require('rock-paper-scissors');

function rps(msg, args, mode) {
    if (!msg[0]) {
        return;
    }
    const matches = [
        'rock',
        'paper',
        'scissors',
    ];
    if (mode) {
        matches.push('lizard', 'spock');
    }
    const discord_emots = [
        ':fist:',
        ':hand_splayed:',
        ':v:',
        ':metal:',
        ':vulcan:'
    ];
    const count = matches.length - 1;
    const key = args[0].toLowerCase();
    const index = matches.findIndex(k => k === key);
    if (index === -1) {
        return msg.channel.send(`i don't support it`);
    }

    const botChose = Math.round(Math.random() * count);
    const result = oneOrTwo(index, botChose);
    const no_branches = ['Nobody', 'You', 'Bot'];
    const result_str = no_branches[result];
    const pretty_output = [
        {
            name: 'You',
            value: discord_emots[index] + ' ' + matches[index],
            inline: false,
        },
        {
            name: 'Bot :robot:',
            value: discord_emots[botChose] + ' ' + matches[botChose], 
            inline: false,
        },
        {
            name: 'Winner',
            value: result_str,
            inline: false,
        }
    ];
    msg.channel.send({
        embed: {
            fields: pretty_output,
        }
    });
};


module.exports = {
    rps: (msg, args) => rps(msg, args, 0),
    rpsls: (msg, args) => rps(msg, args, 1),
}