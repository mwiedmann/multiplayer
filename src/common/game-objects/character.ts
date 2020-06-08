import { DynamicObject, GameEngine, SimplePhysicsEngine, TwoVector, BaseTypes } from 'lance-gg'
import { Dungeon } from './dungeon'

const moveStepCount = 15
const moveDistance = 32 / moveStepCount

export class Character extends DynamicObject<GameEngine<SimplePhysicsEngine>, SimplePhysicsEngine> {
  constructor(gameEngine, options, props) {
    super(gameEngine, options, props)
  }

  currentMove: string
  moveStepsRemaining = moveStepCount
  nextMove: string

  gridX: number
  gridY: number

  moveToGridPosition() {
    this.position.set(this.gridX * 32, this.gridY * 32)
  }

  move() {
    if (this.moveStepsRemaining === 0) {
      this.moveStepsRemaining = moveStepCount
      this.currentMove = this.nextMove
      this.nextMove = undefined

      if (this.currentMove && this.moveIsLegal(this.currentMove)) {
        const newGridPosition = new TwoVector(this.gridX, this.gridY)
        this.moveVector(this.currentMove, 1, newGridPosition)
        this.gridX = newGridPosition.x
        this.gridY = newGridPosition.y
      } else {
        // If there is no currentMove, keep looking for one
        this.currentMove = undefined
        this.moveStepsRemaining = 0
        return
      }
    }

    this.moveStepsRemaining--

    // if (!this.currentMove) {
    //   return
    // }

    this.moveVector(this.currentMove, moveDistance, this.position)
  }

  moveIsLegal(moveDir: string) {
    const dungeon = this.gameEngine.world.queryObject<Dungeon>({ instanceType: Dungeon })
    const newPos = new TwoVector(this.gridX, this.gridY)

    this.moveVector(moveDir, 1, newPos)

    // console.log(dungeon.wallsCombined)
    // console.log(newPos)

    if (
      newPos.x < 0 ||
      newPos.y < 0 ||
      newPos.x > 49 ||
      newPos.y > 49 ||
      dungeon.wallsCombined.find((w) => w.x === newPos.x && w.y === newPos.y)
    ) {
      // console.log('illegal move', newPos.x, newPos.y)
      return false
    }
    return true
  }

  moveVector(moveDir: string, moveAmount: number, vector: TwoVector) {
    if (moveDir === 'up') {
      vector.y -= moveAmount
    }

    if (moveDir === 'down') {
      vector.y += moveAmount
    }

    if (moveDir === 'left') {
      vector.x -= moveAmount
    }

    if (moveDir === 'right') {
      vector.x += moveAmount
    }
  }

  static get netScheme() {
    return Object.assign(
      {
        gridX: {
          type: BaseTypes.TYPES.UINT8,
        },
        gridY: {
          type: BaseTypes.TYPES.UINT8,
        },
      },
      super.netScheme
    )
  }

  syncTo(other) {
    super.syncTo(other)
    this.gridX = other.gridX
    this.gridY = other.gridY
  }
}
