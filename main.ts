input.onButtonPressed(Button.A, function () {
    Volume += -10
    if (Volume < 0) {
        Volume = 0
    }
})
function Graph (x: number, y: number) {
    for (let index = 0; index <= Math.round(y * 4); index++) {
        led.plot(x, index)
    }
}
input.onButtonPressed(Button.B, function () {
    Volume += 10
    if (Volume > 255) {
        Volume = 255
    }
})
let nbTemp = 0
let distTemp = 0
let distance = 0
let Volume = 0
Volume = 50
let DIST_MIN = 3
let DIST_MAX = 100
let FREQ_MIN = 100
let FREQ_MAX = 2000
let LastFreq = 440
let Freq = 440
music.stopAllSounds()
music.setBuiltInSpeakerEnabled(true)
basic.forever(function () {
    distance = distTemp / nbTemp
    distTemp = 0
    nbTemp = 0
    if (DIST_MIN < distance && distance < DIST_MAX) {
        Freq = FREQ_MIN + (FREQ_MAX - FREQ_MIN) * (DIST_MAX - distance) / (DIST_MAX - DIST_MIN)
        // music.ringTone(Freq)
        music.play(music.createSoundExpression(
        WaveShape.Sine,
        LastFreq,
        Freq,
        Volume,
        Volume,
        500,
        SoundExpressionEffect.None,
        InterpolationCurve.Linear
        ), music.PlaybackMode.UntilDone)
        LastFreq = Freq
    }
})
basic.forever(function () {
    distTemp += sonar.ping(
    DigitalPin.P1,
    DigitalPin.P2,
    PingUnit.Centimeters
    )
    nbTemp += 1
})
basic.forever(function () {
    basic.pause(500)
    basic.clearScreen()
    Graph(0, music.volume() / 255)
    Graph(1, Freq / FREQ_MAX)
})
