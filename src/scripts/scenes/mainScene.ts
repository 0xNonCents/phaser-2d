import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'
import { Tevm } from '@tevm/vm'
import { AddNumbers } from '../../contracts/AddNumbers.s.sol'
import { RigidBody } from '../../contracts/RigidBody.s.sol'

interface Vector {
  x: number
  y: number
}

interface Circle {
  pos: Vector
  vel: Vector
  acc: Vector
  radius: number
  graphics: Phaser.GameObjects.Graphics
}

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' })
  }

  tevm?: Tevm

  circle: Circle

  async create() {
    var graphics = this.add.graphics()
    var fillColor = 0xff0000 // Fill color (red)
    graphics.fillStyle(fillColor)
    graphics.fillCircle(50, 50, 50)

    this.circle = {
      pos: { x: 50, y: 50 },
      vel: { x: 1, y: 0 },
      acc: { x: 1, y: 0 },
      radius: 50,
      graphics: graphics
    }
  }

  async update(t, dt) {
    if (!this.tevm) {
      this.tevm = await Tevm.create()
      return
    }

    console.log(this.circle)
    let res = await this.tevm.runScript(RigidBody.read.tick(this.circle.vel, this.circle.acc, this.circle.pos))

    console.log('res data', res.data)

    // Set the circle's properties
    var radius = 50 // Radius
    // Draw the circle

    //res.data[0] is position vector
    this.circle.pos.x = res.data[0].x as number
    this.circle.pos.y = res.data[0].y as number

    this.circle.graphics.x = Number(res.data[0].x)
    this.circle.graphics.y = Number(res.data[0].y)

    //res.data[1] is velocity vector
    this.circle.vel.x = res.data[1].x as number
    this.circle.vel.y = res.data[1].y as number

    if (this.circle.pos.x > 500) {
      this.circle.acc.x = -1
    } else {
      this.circle.acc.x = 1
    }
    if (this.circle.pos.y > 250) {
      this.circle.acc.y = -1
    } else {
      this.circle.acc.y = 1
    }
  }
}
