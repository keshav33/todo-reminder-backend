const mailgun = require("mailgun-js");

exports.scheduleEmail = (receiverEmail, todo, receiverDate, time) => {
    return new Promise((resolve, reject) => {
        const DOMAIN = process.env.MAILGUN_DOMAIN;
        const apiKey = process.env.MAILGUN_APIKEY;
        const senderEmail = process.env.SENDER_EMAILID;
        const formatedDate = new Date(receiverDate).toDateString();
        const splitDate = formatedDate.split(' ');
        const [day, month, date, year] = splitDate;
        const deliveryString = `${day}, ${date} ${month} ${year} ${time}:00 +0530`
        const mg = mailgun({ apiKey: apiKey, domain: DOMAIN });
        const data = {
            from: senderEmail,
            to: receiverEmail,
            subject: 'You have a todo reminder! Plase have a look',
            text: todo,
            "o:deliverytime": deliveryString
        };
        mg.messages().send(data, function (error, body) {
            if (error) {
                reject(error);
            } else {
                console.log(body);
                resolve();
            }
        });
    })
}