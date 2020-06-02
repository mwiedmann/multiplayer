import { ServerEngine, TwoVector } from 'lance-gg'
import { Ship } from '../common/game-objects/ship'

export default class MyServerEngine extends ServerEngine {
  constructor(io, gameEngine, inputOptions) {
    super(io, gameEngine, inputOptions)
  }

  onPlayerConnected(socket) {
    super.onPlayerConnected(socket)
    const ship = new Ship(this.gameEngine, null, { position: new TwoVector(200, 200) })
    ship.playerId = socket.playerId
    this.gameEngine.addObjectToWorld(ship)

    console.log(`Player ${socket.playerId} joined`)
  }

  onPlayerDisconnected(socketId, playerId) {
    super.onPlayerDisconnected(socketId, playerId)

    let ship = this.gameEngine.world.queryObject<Ship>({ playerId })

    if (!ship) {
      return
    }

    // this.world.removeObject(ship.id)
    this.gameEngine.removeObjectFromWorld(ship)
    console.log(`Player ${playerId} disconnected`)
  }
}
