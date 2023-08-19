// // const amqplib = require("amqplib");

// //Message Broker
// // module.exports.CreateChannel = async () => {
// //   try {
// //     const connection = await amqplib.connect(MSG_QUEUE_URL);
// //     const channel = await connection.createChannel();
// //     await channel.assertQueue(EXCHANGE_NAME, "direct", { durable: true });
// //     return channel;
// //   } catch (err) {
// //     throw err;
// //   }
// // };

// // module.exports.PublishMessage = (channel, service, msg) => {
// //   channel.publish(EXCHANGE_NAME, service, Buffer.from(msg));
// //   console.log("Sent: ", msg);
// // };

// // module.exports.SubscribeMessage = async (channel, service) => {
// //   await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
// //   const q = await channel.assertQueue("", { exclusive: true });
// //   console.log(` Waiting for messages in queue: ${q.queue}`);

// //   channel.bindQueue(q.queue, EXCHANGE_NAME, CUSTOMER_SERVICE);

// //   channel.consume(
// //     q.queue,
// //     (msg) => {
// //       if (msg.content) {
// //         console.log("the message is:", msg.content.toString());
// //         service.SubscribeEvents(msg.content.toString());
// //       }
// //       console.log("[X] received");
// //     },
// //     {
// //       noAck: true,
// //     }
// //   );
// // };