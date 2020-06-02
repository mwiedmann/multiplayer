import { Renderer } from 'lance-gg'
import Game from '../common/game-engine'
import MyClientEngine from './my-client-engine'
import { startPhaser, updatePhaser } from './phaser/phaser-init'
import { Ship } from '../common/game-objects/ship'

export default class MyRenderer extends Renderer<Game, MyClientEngine> {
  constructor(gameEngine, clientEngine) {
    super(gameEngine, clientEngine)
  }

  init() {
    return new Promise((resolve, reject) => {
      startPhaser()
      resolve()
    })
  }

  draw(t: number, dt?: number) {
    super.draw(t, dt)

    let ships = this.gameEngine.world.queryObjects<Ship>({ instanceType: Ship })

    updatePhaser(ships)
  }
}
