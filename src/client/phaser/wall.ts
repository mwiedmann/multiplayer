export class Wall extends Phaser.Physics.Arcade.Image {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, public wallId: number) {
    super(scene, x, y, `wall`)
  }
}
