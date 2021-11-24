import { Server as ServerIO, Socket as SocketIO, } from 'socket.io'

class Socket {
  io: ServerIO
  constructor(io: ServerIO) {
    this.io = io
    this.socketsEvents()
  }

  socketsEvents() {
    this.io.on('connection', (socket: SocketIO) => {
      console.log(`Cliente conectado con el socket ${socket.id}`);
      socket.emit('welcome-message', {
        msg: 'Hola'
      })
      socket.on('message-client-to-server', (e) => {
        console.log(e);
        this.io.emit('message-server-to-client', {
          msg: e
        })
      })
    })
  }
}


export default Socket