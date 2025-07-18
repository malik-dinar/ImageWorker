const { Kafka } = require('kafkajs');

const kafka = new Kafka({
   clientId: 'image-process-service',
   brokers: ['localhost:9092', 'localhost:9092'],
});

const producer = kafka.producer();

async function publishMessage(topic, message) {
    console.log(message)
    await producer.connect();
    await producer.send({
       topic: 'my-topic',
       messages: [
         { key: 'some-key', value: message }
       ]
    });
    await producer.disconnect();
}


module.exports = publishMessage