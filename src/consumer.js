require('dotenv').config();
const amqp = require('amqplib');
const PlaylistService = require('./PlaylistServices');
const MailSender = require('./MailSender');
const Listener = require('./listener');

const init = async ()=>{
    const mailSender = new MailSender();
    const playlistService = new PlaylistService();
    const listener = new Listener(playlistService, mailSender);
    
    const connection = await amqp.connect(global.process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();

    const queue_name = 'export:playlist'

    await channel.assertQueue(queue_name, {
        durable: true,
    });

    channel.consume(queue_name, listener.listen, { noAck: true });
}

init();