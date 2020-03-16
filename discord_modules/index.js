const {kick, ban} = require('./kick_ban');

module.exports = {
    corona: {
        run: require('./corona'),
    },
    cat: {
        run: require('./random-cat'),
    },
    serverinfo: {
        run: require('./server_info'),
        guild: true,
    },
    user: {
        run: require('./user_info'),
    },
    weather: {
        run: require('./weather'),
    },
    ban: {
        run: ban,
        required: 'BAN_MEMBERS',
        guild: true,
    },
    kick: {
        run: kick,
        required: 'KICK_MEMBERS',
        guild: true,
    },
}