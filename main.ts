function updateDist () {
    distTemp = 0
    mesureDist()
    mesureDist()
    mesureDist()
    distance = distTemp / 3
}
function mesureDist () {
    distTemp += sonar.ping(
    DigitalPin.P1,
    DigitalPin.P2,
    PingUnit.Centimeters
    )
}
let distance = 0
let distTemp = 0
let DIST_MIN = 3
let DIST_MAX = 70
let FREQ_MIN = 100
let FREQ_MAX = 1000
music.setBuiltInSpeakerEnabled(true)
basic.forever(function () {
    updateDist()
    if (DIST_MIN < distance && distance < DIST_MAX) {
        music.ringTone(FREQ_MIN + (FREQ_MAX - FREQ_MIN) * (DIST_MAX - distance) / (DIST_MAX - DIST_MIN))
    } else {
        music.stopAllSounds()
    }
})
