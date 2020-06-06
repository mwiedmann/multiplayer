import { DynamicObject, GameEngine, SimplePhysicsEngine } from 'lance-gg'

export class Ship extends DynamicObject<GameEngine<SimplePhysicsEngine>, SimplePhysicsEngine> {
  constructor(gameEngine, options, props) {
    super(gameEngine, options, props)
  }

  bendToCurrent(
    original: DynamicObject<GameEngine<SimplePhysicsEngine>, SimplePhysicsEngine>,
    percent,
    worldSettings,
    isLocal,
    increments
  ) {
    const distance = original.position.clone().subtract(this.position).length()

    if (distance > 25) {
      console.log('distance', distance)
      super.bendToCurrent(original, 1, worldSettings, isLocal, 1)
    } else {
      super.bendToCurrent(original, percent, worldSettings, isLocal, increments)
    }
  }

  get maxSpeed() {
    return 5
  }

  syncTo(other) {
    super.syncTo(other)
  }
}
