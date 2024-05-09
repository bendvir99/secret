const https = require('https');

exports.handler = async (event) => {
    const message = JSON.parse(event.body).content;
    const webhookUrl = 'https://discord.com/api/webhooks/1226921185674268703/njllUAC3UFeFpLjtUl3ilyWnOQ82SvC5LlCFy50PP6bcBn7LglPIUEgRIi_EuScxMF7D';
    
    const data = JSON.stringify({ content: message });
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    return new Promise((resolve, reject) => {
        const req = https.request(webhookUrl, options, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    body: body
                });
            });
        });
        
        req.on('error', (error) => {
            reject({
                statusCode: 500,
                body: JSON.stringify({ error: error.message })
            });
        });
        
        req.write(data);
        req.end();
    });
};
