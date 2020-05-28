import { BaseTypes, DynamicObject, GameEngine, SimplePhysicsEngine } from 'lance-gg'

export class Paddle extends DynamicObject<GameEngine<SimplePhysicsEngine>, SimplePhysicsEngine> {
  constructor(gameEngine, options, props) {
    super(gameEngine, options, props)
  }

  health: number

  static get netScheme() {
    return { ...super.netScheme, health: { type: BaseTypes.TYPES.INT16 } }
  }

  syncTo(other) {
    super.syncTo(other)
    this.health = other.health
  }
}

export class Ball extends DynamicObject<GameEngine<SimplePhysicsEngine>, SimplePhysicsEngine> {
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
