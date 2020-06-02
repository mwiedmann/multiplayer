import { GameEngine, SimplePhysicsEngine } from 'lance-gg'
import { Ship } from './game-objects/ship'

export default class Game extends GameEngine<SimplePhysicsEngine> {
  constructor(options) {
    super(options)
    this.physicsEngine = new SimplePhysicsEngine({ gameEngine: this })
  }

  registerClasses(serializer) {
    serializer.registerClass(Ship)
  }

  initWorld() {
    super.initWorld({
      worldWrap: true,
      width: 600,
      height: 600,
    })
  }

  start() {
    super.start()
  }

  processInput(inputData, playerId) {
    super.processInput(inputData, playerId)

    let ship = this.world.queryObject<Ship>({ playerId })

    if (inputData.input === 'up') {
      ship.accelerate(0.1)
    }

    if (inputData.input === 'down') {
      ship.accelerate(-0.1)
    }

    if (inputData.input === 'left') {
      ship.turnLeft(6)
    }

    if (inputData.input === 'right') {
      ship.turnRight(6)
    }
  }
}
