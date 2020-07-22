let AWS = require("aws-sdk");

module.exports = {

    sendMessage: function (req, res) {

        //load credentials from json file
        AWS.config.loadFromPath('./credentials.json');
        let sns = new AWS.SNS(); //initialize SNS

        let mobileNumber = req.body.mobileNumber;
        let message = req.body.message;

        if (mobileNumber != null && message != null) {

            //configure params
            var params = {
                MessageAttributes: {
                    'AWS.SNS.SMS.SenderID': {
                        'DataType': 'String',
                        'StringValue': 'AmazonSNS' //you can set your brand here
                    }
                },
                Message: message,
                PhoneNumber: '+977' + mobileNumber,

            };

            sns.publish(params, function (err, data) {
                console.log(data);
                if (err) {
                    res.send({
                        status: false,
                        'message': 'Failed to sent message!'
                    });
                } else {
                    res.send({
                        status: true,
                        'message': 'Message sent successfully!'
                    });
                }
            });
        } else {
            res.send({
                status: false,
                'message': 'Failed to sent message!'
            });
        }
    }

}