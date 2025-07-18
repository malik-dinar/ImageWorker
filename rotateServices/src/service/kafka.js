const { Kafka } = require('kafkajs');
const rotateImage = require('./rotateImage');

const kafka = new Kafka({
  clientId: 'image-process-service',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'test-group' });

async function consumeMessages() {
    await consumer.connect();
    await consumer.subscribe({ topic: 'my-topic' });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
         console.log({
           key: message.key.toString(),
           value: message.value.toString(),
           headers: message.headers,
           topic: topic,
           partition: partition
         });
         const imageUrl = message.value.toString()
         rotateImage(imageUrl);
      } 
    });
}



module.exports = consumeMessages

