import { Renderer } from 'lance-gg'
import Game from '../common/game-engine'
import MyClientEngine from './my-client-engine'
import { startPhaser, updatePhaser } from './phaser/phaser-init'
import { Character } from '../common/game-objects/character'
import { Dungeon } from '../common/game-objects/dungeon'

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

    let characters = this.gameEngine.world.queryObjects<Character>({ instanceType: Character })
    let dungeon = this.gameEngine.world.queryObject<Dungeon>({ instanceType: Dungeon })

    updatePhaser(characters, dungeon)
  }
}
