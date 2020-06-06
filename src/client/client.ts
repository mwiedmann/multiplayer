import * as querystring from 'query-string'
import { ClientEngineInputOptions } from 'lance-gg'
import Game from '../common/game-engine'
import MyClientEngine from './my-client-engine'

const qsOptions = querystring.parse(location.search)

// default options, overwritten by query-string options
// is sent to both game engine and client engine
const defaults: ClientEngineInputOptions = {
  delayInputCount: 8,
  scheduler: 'render-schedule',
  syncOptions: {
    sync: (qsOptions.sync as any) || 'extrapolate',
    localObjBending: 0.2,
    remoteObjBending: 0.5,
  },
  serverURL: '192.168.0.4:3001',
}
let options: ClientEngineInputOptions = { ...defaults, ...qsOptions }

// create a client engine and a game engine
const gameEngine = new Game(options)
const clientEngine = new MyClientEngine(gameEngine, options)

document.addEventListener('DOMContentLoaded', function (e) {
  clientEngine.start()
})
