import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'
import { EVMts } from '@evmts/vm'
import { AddNumbers } from '../../contracts/AddNumbers.s.sol'

export default class MainScene extends Phaser.Scene {
  fpsText

  constructor() {
    super({ key: 'MainScene' })
  }

  evmts?: EVMts

  async create() {
    new PhaserLogo(this, this.cameras.main.width / 2, 0)
    this.fpsText = new FpsText(this)

    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: '24px'
      })
      .setOrigin(1, 0)
  }

  async update(t, dt) {
    this.fpsText.update()

    if (!this.evmts) {
      this.evmts = await EVMts.create()
      return
    }

    let res = await this.evmts.runScript(AddNumbers.read.add(BigInt(1), BigInt(1)))

    console.log('res data', res.data)
  }
}
