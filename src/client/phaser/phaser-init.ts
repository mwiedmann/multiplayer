import * as Phaser from 'phaser'
import { Character as NetCharacter } from '../../common/game-objects/character'
import { Dungeon as NetDungeon } from '../../common/game-objects/dungeon'
import { Character } from './character'
import { Wall } from './wall'

let scene: Phaser.Scene

let characters: Character[] = []
let walls: Wall[] = []

/** Load all the images we need and assign them names */
function preload(this: Phaser.Scene) {
  this.load.image('ship1', 'images/ship1.png')
  this.load.image('ship2', 'images/ship2.png')
  this.load.image('ship3', 'images/ship3.png')
  this.load.image('ship0', 'images/ship0.png')

  this.load.image('wall', 'images/wall.png')
}

/** Create all the physics groups we need and setup colliders between the ones we want to interact. */
function create(this: Phaser.Scene) {
  scene = this
}

function update(this: Phaser.Scene) {}

export const startPhaser = () => {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 1700,
    height: 1700,
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

const screenSizePadding = 50
const postionTranslate = (val: number) => val * 32 + screenSizePadding

export const updatePhaser = (netCharacter: NetCharacter[], netDungeon: NetDungeon) => {
  if (!scene) {
    return
  }

  netCharacter.forEach((netCharacter) => {
    let character = characters.find((s) => s.playerId === netCharacter.playerId)

    if (!character) {
      character = new Character(scene, netCharacter.position.x, netCharacter.position.y, '', netCharacter.playerId)
      scene.add.existing(character)
      characters.push(character)
    }

    // character.setPosition(netCharacter.gridX * 32, netCharacter.gridY * 32)
    character.setPosition(netCharacter.position.x + screenSizePadding, netCharacter.position.y + screenSizePadding)
  })

  if (netDungeon) {
    for (let i = 0; i < netDungeon.wallsX.length; i++) {
      let wall = walls.find((w) => w.wallId === i)

      if (!wall) {
        wall = new Wall(scene, postionTranslate(netDungeon.wallsX[i]), postionTranslate(netDungeon.wallsY[i]), '', i)
        scene.add.existing(wall)
        walls.push(wall)
      } else {
        wall.setPosition(postionTranslate(netDungeon.wallsX[i]), postionTranslate(netDungeon.wallsY[i]))
      }
    }
  }
}
