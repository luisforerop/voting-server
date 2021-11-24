import SocketServer from './models/SocketServer'
import { config } from 'dotenv'
config()
const server = new SocketServer()
server.excecute()
