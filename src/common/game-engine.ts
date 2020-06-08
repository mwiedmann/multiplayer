import { GameEngine, SimplePhysicsEngine } from 'lance-gg'
import { Character } from './game-objects/character'
import { Dungeon } from './game-objects/dungeon'

export default class Game extends GameEngine<SimplePhysicsEngine> {
  constructor(options) {
    super(options)
    this.physicsEngine = new SimplePhysicsEngine({ gameEngine: this })
  }

  registerClasses(serializer) {
    serializer.registerClass(Character)
    serializer.registerClass(Dungeon)
  }

  initWorld() {
    super.initWorld({
      worldWrap: false,
      width: 1600,
      height: 1600,
    })
  }

  start() {
    super.start()
  }

  step(isReenact: boolean, t: number, dt: number, physicsOnly: boolean) {
    super.step(isReenact, t, dt, physicsOnly)

    const characters = this.world.queryObjects<Character>({ instanceType: Character })

    characters.forEach((character) => {
      character.move()
    })
  }

  processInput(inputData, playerId, isServer) {
    super.processInput(inputData, playerId, isServer)

    const character = this.world.queryObject<Character>({ playerId })

    if (!character) {
      return
    }

    character.nextMove = inputData.input
  }
}
