const { Kafka } = require('kafkajs');
const grayScale = require('./BlackAndWhite');

const kafka = new Kafka({
  clientId: 'image-process-service',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ 
  groupId: 'test-group-1',
});

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
         grayScale(imageUrl);
      } 
    });
}



module.exports = consumeMessages

