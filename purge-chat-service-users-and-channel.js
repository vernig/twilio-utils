require('dotenv').config();
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_ACCOUNT_SECRET
);

const chatServiceSid = ''
if (!chatServiceSid) {
    console.log('Please specify a chat service id')
}

// Remove users
client.chat.services(chatServiceSid).users.list()
.then(users => {
  users.forEach(user => {
    client.chat.services(chatServiceSid).users(user.sid).remove()
    .then(() => {
        console.log(user.sid + ' removed')
    })
  })
});

// Remove channels
client.chat.services(chatServiceSid).channels.list()
.then(channels => {
  channels.forEach(channel => {
    client.chat.services(chatServiceSid).channels(channel.sid).remove()
    .then(() => console.log('Removed ' + channel.sid))
  })
});