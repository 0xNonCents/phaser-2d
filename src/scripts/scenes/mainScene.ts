import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'
import { EVMts } from '../../vm/evmts'
import { AddContract } from '../../contracts/AddNumbers.sol'
import { DaiContract } from '../../contracts/Dai.sol'

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

    const a = BigInt(Math.floor(t))
    console.log('a', a)

    let res = await this.evmts.runScript(AddContract.script.add('0x01', '0x01'))

    console.log('res data', res.data)

    res = await this.evmts.runScript(DaiContract.script.balanceOf('0x00000000000000000000000000000000000000ff'))

    console.log('res data 2', res.data)
  }
}
