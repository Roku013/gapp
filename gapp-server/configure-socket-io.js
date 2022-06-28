const { Server } = require('socket.io');

const configureSocketIo = (server) => {
  const io = new Server(server, {
    cors: {
      ...(process.env.CLIENT_APP_ORIGINS && {
        origin: process.env.CLIENT_APP_ORIGINS.split(',')
      }),
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on('send_message', (data) => {
      console.log('Message received on server', data);
      const { content } = data;
      /*
      Message.create({ content }).then((message) => {
        socket.broadcast.emit('receive_message', { message });
      });
      */
      const message = { content };
      // socket.broadcast.emit('receive_message', { message });
      io.emit('receive_message', { message });
    });
  });
};

module.exports = configureSocketIo;
