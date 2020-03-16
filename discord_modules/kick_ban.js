function kick_ban(msg, args, command) {
    if (!msg.guild) {
        return;
    }
    if (!args[0]) {
        return msg.channel.send(`${command} <user>`);
    }
    let user;
    const matches = /(\d+)/.exec(args[0]);
    if (matches.length && matches.length > 1) {
        user = matches[1];
    } else {
        throw new Error('not implemented yet');
    }
    msg.guild.members.fetch(user).then(usr => {
        let highestRoleOfCallerPosition = msg.member.roles.highest.position;
        let highestRoleOfVictimPosition = usr.roles.highest.position;
        if (usr.id === msg.guild.owner.id) {
            highestRoleOfVictimPosition = Number.MAX_VALUE;
        }
        if (msg.member.id === msg.guild.owner.id) {
            highestRoleOfCallerPosition = Number.MAX_VALUE;
        }
        if (highestRoleOfCallerPosition < highestRoleOfVictimPosition) {
            return msg.reply(`you are not allowed to doing that`);
        }
        const func = usr[command];
        if (typeof func === 'function') {
            func.call(usr).then().catch(e => {
                if (e.hasOwnProperty('message')) {
                    msg.reply(`ERROR: ${e.message}`);
                }
            });
        }
    });
}


module.exports = {
    kick: (msg, args) => kick_ban(msg, args, 'kick'),
    ban: (msg, args) => kick_ban(msg, args, 'ban'),
}