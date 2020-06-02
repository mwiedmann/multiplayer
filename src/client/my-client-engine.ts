import { ClientEngine, KeyboardControls } from 'lance-gg'
import Game from '../common/game-engine'
import MyRenderer from './my-renderer'

export default class MyClientEngine extends ClientEngine<Game> {
  constructor(gameEngine, options) {
    super(gameEngine, options, MyRenderer)
  }

  controls: KeyboardControls
  start() {
    super.start()

    return new Promise((resolve) => {
      this.controls = new KeyboardControls(this)
      this.controls.bindKey('up', 'up', { repeat: true })
      this.controls.bindKey('down', 'down', { repeat: true })
      this.controls.bindKey('left', 'left', { repeat: true })
      this.controls.bindKey('right', 'right', { repeat: true })

      resolve()
    })

    return undefined
  }
}
