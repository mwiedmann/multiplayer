import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import * as express from 'express'
import * as cors from 'cors'
import * as socketIO from 'socket.io'
import Game from '../common/game-engine'
import { Lib } from 'lance-gg'
import MyServerEngine from './my-server-engine'

const PORT = process.env.PORT || 3001

// Read in the environment vars
dotenv.config()

// Create the Express server with cors enabled
const server = express()
server.use(cors())

// Allow the body of requests to be json
server.use(bodyParser.json())

// so route not found errors don't respond with the default html
// server.use('/', (request, response) => response.sendStatus(404))
let requestHandler = server.listen(PORT, () => console.log(`Listening on ${PORT}`))
const io = socketIO(requestHandler)

// Game Instances
const gameEngine = new Game({ traceLevel: Lib.Trace.TRACE_NONE })
const serverEngine = new MyServerEngine(io, gameEngine, { debug: {}, updateRate: 6 })

// start the game
serverEngine.start()
