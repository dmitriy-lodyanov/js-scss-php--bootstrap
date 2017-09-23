// version 1.1.0
const animation = require('./animation')
Object.assign(global, animation)

const isOnScreen = require('./isOnScreen')
Object.assign(global, isOnScreen)

const scrollable = require('./scrollable')
Object.assign(global, scrollable)

const templateVersion = require('./templateVersion')
Object.assign(global, templateVersion)

const touch = require('./touch')
Object.assign(global, touch)
