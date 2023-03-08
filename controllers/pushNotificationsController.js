const https = require('https');

module.exports = {


    sendNotification(token, data) {

        const notification = JSON.stringify({
            'to': token,
            'data': {
                'click_action': 'FLUTTER_NOTIFICATION_CLICK',
                'title': data.title,
                'body': data.body,
                'id_notification': data.id_notification,
            },
            'notification': {
                'click_action': 'FLUTTER_NOTIFICATION_CLICK',
                'title': data.title,
                'body': data.body,
                'id_notification': data.id_notification,
            },
            'priority': 'high',
            'ttl': '4500s'
        });

        const options = {
            hostname: 'fcm.googleapis.com',
            path: '/fcm/send',
            method: 'POST',
            port: 443,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAAyOmQMZo:APA91bG7yq602JosCvgtrukfWDJt-VFU1AUMaZChNMlJyvNSdQmxiAWwmBWbPKqCiK__ASIgi-6Ljcfzkc9boRvtDQqhOLINX0YD1xJAiF0iG5np_o9KQxlKkRt5_agCGPO6RVOwH5TO',
            }
        }

        const req = https.request(options, (res) => {
            console.log('STATUS CODE FIREBASE', res.statusCode);

            res.on('data', (d) => {
                process.stdout.write(d);
            });
        });

        req.on('error', (error) => {
            console.log('ERROR DE FIREBASE MESSAGING', error);
        });

        req.write(notification);
        req.end();

    },

//NOTIFICATION
    sendNotificationToMultipleDevices(tokens, data) {

        const notification = JSON.stringify({
            'registration_ids': tokens,
            'data': {
                'click_action': 'FLUTTER_NOTIFICATION_CLICK',
                'title': data.title,
                'body': data.body,
                'id_notification': data.id_notification,
            },
            'notification': {
                'click_action': 'FLUTTER_NOTIFICATION_CLICK',
                'title': data.title,
                'body': data.body,
                'id_notification': data.id_notification,
            },
            'priority': 'high',
            'ttl': '4500s'
        });

        const options = {
            hostname: 'fcm.googleapis.com',
            path: '/fcm/send',
            method: 'POST',
            port: 443,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAAyOmQMZo:APA91bG7yq602JosCvgtrukfWDJt-VFU1AUMaZChNMlJyvNSdQmxiAWwmBWbPKqCiK__ASIgi-6Ljcfzkc9boRvtDQqhOLINX0YD1xJAiF0iG5np_o9KQxlKkRt5_agCGPO6RVOwH5TO',
            }
        }

        const req = https.request(options, (res) => {
            console.log('STATUS CODE FIREBASE', res.statusCode);

            res.on('data', (d) => {
                process.stdout.write(d);
            });
        });

        req.on('error', (error) => {
            console.log('ERROR DE FIREBASE MESSAGING', error);
        });

        req.write(notification);
        req.end();

    }

}