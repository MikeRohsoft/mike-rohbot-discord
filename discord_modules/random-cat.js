const randomCat = require('random-cat');
module.exports = (msg) => {
    randomCat().then(res => {
        if (!res.hasOwnProperty('file')) {
            return;
        }
        const obj = {
            embed: {
                image: {
                url: res.file,
                }
            }
        };
        msg.channel.send(obj);
    });
}