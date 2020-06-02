import * as Phaser from 'phaser'
import { Ship as NetShip } from '../../common/game-objects/ship'
import { Ship } from './ship'

let scene: Phaser.Scene

let ships: Ship[] = []

/** Load all the images we need and assign them names */
function preload(this: Phaser.Scene) {
  this.load.image('ship', 'images/ship.png')
}

/** Create all the physics groups we need and setup colliders between the ones we want to interact. */
function create(this: Phaser.Scene) {
  scene = this
}

function update(this: Phaser.Scene) {}

export const startPhaser = () => {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    scale: {
      mode: Phaser.Scale.ScaleModes.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: {
      preload,
      create,
      update,
    },
    parent: 'root',
  })
}

export const updatePhaser = (netShips: NetShip[]) => {
  if (!scene) {
    return
  }

  netShips.forEach((netShip) => {
    let ship = ships.find((s) => s.playerId === netShip.playerId)

    if (!ship) {
      ship = new Ship(scene, netShip.position.x, netShip.position.y, '', netShip.playerId)
      scene.add.existing(ship)
      ships.push(ship)
    }

    ship.setAngle(netShip.angle)
    ship.setPosition(netShip.position.x, netShip.position.y)
  })
}
