input.onButtonPressed(Button.A, function () {
    Volume += -10
})
function updateDist () {
    distTemp = 0
    mesureDist()
    mesureDist()
    mesureDist()
    distance = distTemp / 3
}
input.onButtonPressed(Button.AB, function () {
    basic.showNumber(Volume)
})
input.onButtonPressed(Button.B, function () {
    Volume += 10
})
function mesureDist () {
    distTemp += sonar.ping(
    DigitalPin.P1,
    DigitalPin.P2,
    PingUnit.Centimeters
    )
}
let distance = 0
let distTemp = 0
let Volume = 0
Volume = 50
let DIST_MIN = 3
let DIST_MAX = 70
let FREQ_MIN = 100
let FREQ_MAX = 1000
music.setBuiltInSpeakerEnabled(true)
basic.forever(function () {
    updateDist()
    if (DIST_MIN < distance && distance < DIST_MAX) {
        music.setVolume(Volume)
        music.ringTone(FREQ_MIN + (FREQ_MAX - FREQ_MIN) * (DIST_MAX - distance) / (DIST_MAX - DIST_MIN))
    } else {
        music.stopAllSounds()
    }
})
