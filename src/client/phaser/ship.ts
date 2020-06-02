export class Ship extends Phaser.Physics.Arcade.Image {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, public playerId: number) {
    super(scene, 0, 0, `ship${texture}`)
  }
}
