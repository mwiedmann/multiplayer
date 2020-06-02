import { DynamicObject, GameEngine, SimplePhysicsEngine } from 'lance-gg'

export class Ship extends DynamicObject<GameEngine<SimplePhysicsEngine>, SimplePhysicsEngine> {
  constructor(gameEngine, options, props) {
    super(gameEngine, options, props)
  }

  // avoid gradual synchronization of velocity
  get bending() {
    return { velocity: { percent: 0.0 } }
  }

  syncTo(other) {
    super.syncTo(other)
  }
}
