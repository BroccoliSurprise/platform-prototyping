controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    hoppla()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    hoppla()
})
function gameOverKillScreen () {
    ikkeDau = false
    effects.starField.endScreenEffect()
    scene.setBackgroundColor(15)
    tiles.setTilemap(tilemap`level2`)
    controller.moveSprite(kvekk, 0, 0)
    kvekk.ay = 0
    kvekk.setVelocity(0, 0)
    kvekk.setPosition(63, 77)
    decoratio = sprites.create(img`
        ...................cc...
        ...............cccc63c..
        ..............c633336c..
        ..........cc.c6cc33333c.
        .........b55c6c55c33333c
        .........ff5c6c5ff33333c
        .........ff5c6c5ff6333cc
        .........b553c355c6666cc
        ..........b55355c333333c
        .........cc55555bcc3333c
        ........c5545554b55c33c.
        ........b54b4444bb5cbb..
        ........c455b4b5554c45b.
        ........c555c4c555c4c5c.
        ........c5555c5555c4c5c.
        .........ccccccccc..ccc.
        `, SpriteKind.Projectile)
    decoratio.setPosition(96, 77)
    pause(2000)
    decoratio.say("No e du dau.")
    pause(5000)
    scene.setBackgroundColor(2)
    pause(100)
    game.over(false, effects.splatter)
}
function hoppla () {
    if (kvekk.isHittingTile(CollisionDirection.Bottom) && ikkeDau == true) {
        kvekk.vy = -230
    }
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    gameOverKillScreen()
})
let decoratio: Sprite = null
let ikkeDau = false
let baboom: Sprite = null
let kvekk: Sprite = null
effects.starField.startScreenEffect()
scene.setBackgroundColor(8)
tiles.setTilemap(tilemap`level1`)
kvekk = sprites.create(img`
    . . . . . . . . . . b 5 b . . . 
    . . . . . . . . . b 5 b . . . . 
    . . . . . . . . . b c . . . . . 
    . . . . . . b b b b b b . . . . 
    . . . . . b b 5 5 5 5 5 b . . . 
    . . . . b b 5 d 1 f 5 5 d f . . 
    . . . . b 5 5 1 f f 5 d 4 c . . 
    . . . . b 5 5 d f b d d 4 4 . . 
    b d d d b b d 5 5 5 4 4 4 4 4 b 
    b b d 5 5 5 b 5 5 4 4 4 4 4 b . 
    b d c 5 5 5 5 d 5 5 5 5 5 b . . 
    c d d c d 5 5 b 5 5 5 5 5 5 b . 
    c b d d c c b 5 5 5 5 5 5 5 b . 
    . c d d d d d d 5 5 5 5 5 d b . 
    . . c b d d d d d 5 5 5 b b . . 
    . . . c c c c c c c c b b . . . 
    `, SpriteKind.Player)
controller.moveSprite(kvekk, 100, 0)
scene.cameraFollowSprite(kvekk)
kvekk.ay = 500
for (let value of tiles.getTilesByType(assets.tile`tile1`)) {
    baboom = sprites.create(img`
        ...................cc...
        ...............cccc63c..
        ..............c633336c..
        ..........cc.c6cc33333c.
        .........b55c6c55c33333c
        .........ff5c6c5ff33333c
        .........ff5c6c5ff6333cc
        .........b553c355c6666cc
        ..........b55355c333333c
        .........cc55555bcc3333c
        ........c5545554b55c33c.
        ........b54b4444bb5cbb..
        ........c455b4b5554c45b.
        ........c555c4c555c4c5c.
        ........c5555c5555c4c5c.
        .........ccccccccc..ccc.
        `, SpriteKind.Enemy)
    tiles.placeOnTile(baboom, value)
    baboom.ay = 500
}
let enemyList = sprites.allOfKind(SpriteKind.Enemy)
ikkeDau = true
game.onUpdateInterval(1000, function () {
    for (let value of enemyList) {
        if (value.isHittingTile(CollisionDirection.Left) || value.isHittingTile(CollisionDirection.Right)) {
            value.vy = -150
        }
    }
})
game.onUpdateInterval(100, function () {
    for (let value of enemyList) {
        value.vx = kvekk.x - value.x
    }
})
