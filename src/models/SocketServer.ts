import express, { Express } from 'express'
import { createServer, Server as HttpServer } from 'http'
import { Server as ServerIO, } from 'socket.io'
import path from 'path'
import Socket from './Socket'
import cors from 'cors'

// CREAR UNA INTERFAZ PARA SERVIDORES, TANTO DE SOCKETS COMO LOS REST. ESTOS TENDRÍAN PUERTOS, MIDDLEWARES Y EXECUTE


class SocketServer {
  port: string
  app: Express
  server: HttpServer
  io: ServerIO
  constructor() {
    this.port = process.env.PORT || '8080'
    this.app = express() 
    this.server = createServer( this.app )
    this.io = new ServerIO (this.server, {})
  }

  middlewares() {
    this.app.use( express.static(path.resolve(__dirname, '../../public')) )
    this.app.use(cors())
  }

  socketsConfigurations () {
    new Socket(this.io)
  }

  excecute() {

    this.middlewares()
    this.socketsConfigurations()
    this.server.listen(this.port, () => {
      console.log(`Server on port ${this.port}`);      
    })
  }

}

export default SocketServer