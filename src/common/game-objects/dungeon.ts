import { DynamicObject, GameEngine, SimplePhysicsEngine, BaseTypes } from 'lance-gg'

export class Dungeon extends DynamicObject<GameEngine<SimplePhysicsEngine>, SimplePhysicsEngine> {
  constructor(gameEngine, options, props) {
    super(gameEngine, options, props)
  }

  wallsX: number[]
  wallsY: number[]

  get wallsCombined() {
    return this.wallsX.map((wx, i) => ({ x: wx, y: this.wallsY[i] }))
  }

  static get netScheme() {
    return Object.assign(
      {
        wallsX: {
          type: BaseTypes.TYPES.LIST,
          itemType: BaseTypes.TYPES.UINT8,
        },
        wallsY: {
          type: BaseTypes.TYPES.LIST,
          itemType: BaseTypes.TYPES.UINT8,
        },
      },
      super.netScheme
    )
  }

  syncTo(other: Dungeon) {
    super.syncTo(other)
    this.wallsX = other.wallsX
    this.wallsY = other.wallsY
  }
}
