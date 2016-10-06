function reset(){
    loc.call(player,200,400);
}
var loc = function(x,y){
    this.x = x;     //esta funcion cambia coordenadas
    this.y = y;
};
// Enemies our player must avoid
var Enemy = function(x,y,fast) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    //this.x = x;
    //this.y = y;
    loc.call(this, x, y);
    this.fast = fast;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x > 500){
        this.x = 0;
    }
    else {
        this.x += this.fast*dt;
    }
    //En este ultimo comparo las posiciones del player y del enemigo
    if(Math.abs(player.x-this.x) <= 50 && Math.abs(player.y-this.y) <= 20)
        reset();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    //this.x = 200;
    //this.y = 400;
    loc.call(this, 200, 400);
    this.sprite = 'images/char-boy.png';
}
Player.prototype.update = function(or,move){
    if(or === 'x')
        this.x += move;
    else if(or === 'y')
        this.y += move;
};
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Esta funcion se encarga de los movimientos del jugador,
//se asegura de que no se salga de la pantalla 
//y de hacer algo cuando llegues al agua
Player.prototype.handleInput = function(key){
    var dist = 90; //distancia que recorre en un paso
    if (key === 'left' && this.x > 50) {
        this.update('x',-dist);
    }
    else if (key === 'right' && this.x < 380){
        this.update('x',dist);
    }
    else if(key === 'up'){
        if(this.y <= 50) //si es cierto, ganaste
            reset();
        else
            this.update('y',-dist);
    }
    else if (key === 'down' && this.y < 400){
        this.update('y',dist);
    }
    if(Math.abs(orange.x-this.x) < 50 && Math.abs(orange.y-this.y) < 20)
        orange.relocate();
};
//Esta clase crea objetos tipo gema
var Gem = function(){
    this.x;
    this.y;
    this.sprite = 'images/Gem Orange.png';
};
//Este objeto contiene las ubicaciones posibles de las gemas
var gemLocs = {
    'x':[20,200,290,380,410],
    'y':[40,130,220]
};
//Esta funcion devuelve index aleatorios 
var rand = function(rand,coor){
    if(coor === 'x'){
        if(rand < 0.2)
            return 0;
        else if(rand < 0.4)
            return 1;
        else if(rand < 0.6)
            return 2;
        else if(rand < 0.8)
            return 3;
        else if(rand < 1)
            return 4;
    }
    else if(coor === 'y'){
        if(rand < 0.3)
            return 0;
        else if(rand < 0.6)
            return 1;
        else if(rand <1)
            return 2;
    }
};
Gem.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Este metodo se encarga de cambiar la posicion de las gemas
Gem.prototype.relocate = function(){
    var x = rand(Math.random(),'x');
    var y = rand(Math.random(),'y'); 
    loc.call(this,gemLocs.x[x],gemLocs.y[y]);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(0, 60, 100),
    new Enemy(0, 140, 200),
    new Enemy(0, 230, 300)
];
var player = new Player();
var orange = new Gem();
orange.relocate();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});