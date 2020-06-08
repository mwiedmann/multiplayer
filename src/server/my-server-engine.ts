import { ServerEngine } from 'lance-gg'
import { Character } from '../common/game-objects/character'
import { Dungeon } from '../common/game-objects/dungeon'

export default class MyServerEngine extends ServerEngine {
  constructor(io, gameEngine, inputOptions) {
    super(io, gameEngine, inputOptions)
  }

  start() {
    super.start()

    const dungeon = new Dungeon(this.gameEngine, null, {})
    const walls = this.generateDungeon()

    dungeon.wallsX = walls.dx
    dungeon.wallsY = walls.dy
    this.gameEngine.addObjectToWorld(dungeon)
  }

  generateDungeon() {
    const dx = []
    const dy = []

    for (let y = 0; y < 49; y++) {
      for (let x = 0; x < 49; x++) {
        if (x % 2 === 1 && y % 2 === 1) {
          dx.push(x)
          dy.push(y)
        }
      }
    }

    return { dx, dy }
  }

  onPlayerConnected(socket) {
    super.onPlayerConnected(socket)
    const character = new Character(this.gameEngine, null, null)
    character.gridX = 10
    character.gridY = 25
    character.moveToGridPosition()
    character.playerId = socket.playerId
    this.gameEngine.addObjectToWorld(character)

    console.log(`Player ${socket.playerId} joined`)
  }

  onPlayerDisconnected(socketId, playerId) {
    super.onPlayerDisconnected(socketId, playerId)

    let character = this.gameEngine.world.queryObject<Character>({ playerId })

    if (!character) {
      return
    }

    // this.world.removeObject(ship.id)
    this.gameEngine.removeObjectFromWorld(character)
    console.log(`Player ${playerId} disconnected`)
  }
}
