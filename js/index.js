'use strict';
var emit;
var emitPiece;
var player1;
var player2;
var Player;
var Player2;
var joueurCréer = false;
var laPartiePeutCommencer = false;
var compteurPiece = 0;
$(document).ready(function () {
    var collisionBlocY = false;
    var collisionBlocX = false;
    var animation = false;
    var animationLuigi = false;
    var etage1 = false;
    var anim = false;
    var animLuigi = false;
    var idMasquePiece = 0;
    var idPiece = 0;
    
    




    /******************************************************************************************** 
     ********************************************************************************************
     ********************************************************************************************
     ******************************************************************************************** 
     *******************************CREATION DES BLOCS*******************************************
     ********************************************************************************************
     ******************************************************************************************** 
     ********************************************************************************************
     ********************************************************************************************/
    var bloc1 = {
        height: document.getElementById("bloc1").style.height = "50px",
        width: document.getElementById("bloc1").style.width = "300px",
        top: document.getElementById("bloc1").style.top = "475px",
        left: document.getElementById("bloc1").style.left = "500px"
    }
    var bloc2 = {
        height: document.getElementById("bloc2").style.height = '50px',
        width: document.getElementById("bloc2").style.width = "300px",
        top: document.getElementById("bloc2").style.top = "475px",
        left: document.getElementById("bloc2").style.left = "0px"
    }
    var bloc3 = {
        height: document.getElementById("bloc3").style.height = "50px",
        width: document.getElementById("bloc3").style.width = "100px",
        top: document.getElementById("bloc3").style.top = "325px",
        left: document.getElementById("bloc3").style.left = "0px"
    }
    var bloc4 = {
        height: document.getElementById("bloc4").style.height = "50px",
        width: document.getElementById("bloc4").style.width = "100px",
        top: document.getElementById("bloc4").style.top = "325px",
        left: document.getElementById("bloc4").style.left = "700px"
    }
    var bloc5 = {
        height: document.getElementById("bloc5").style.height = "50px",
        width: document.getElementById("bloc5").style.width = "402px",
        top: document.getElementById("bloc5").style.top = "295px",
        left: document.getElementById("bloc5").style.left = "197px"
    }
    var bloc6 = {
        height: document.getElementById("bloc6").style.height = "50px",
        width: document.getElementById("bloc6").style.width = "298px",
        top: document.getElementById("bloc6").style.top = "125px",
        left: document.getElementById("bloc6").style.left = "0px"
    }
    var bloc7 = {
        height: document.getElementById("bloc7").style.height = "50px",
        width: document.getElementById("bloc7").style.width = "302px",
        top: document.getElementById("bloc7").style.top = "125px",
        left: document.getElementById("bloc7").style.left = "498px"
    }




    /******************************************************************************************** 
     ********************************************************************************************
     ********************************************************************************************
     ******************************************************************************************** 
     *******************************CREATION PLAYER 1*******************************************
     ********************************************************************************************
     ******************************************************************************************** 
     ********************************************************************************************
     ********************************************************************************************/
        Player = function(left,scale, index, image){
        this.width = document.getElementById("player"+index).style.width = "50px";
        this.height = document.getElementById("player"+index).style.height = "50px";
        this.left = document.getElementById("player"+index).style.left = left;
        this.top = document.getElementById("player"+index).style.top = "575px";
        this.scale = document.getElementById("player"+index).style.transform = scale;
        this.position = document.getElementById("player"+index).style.position = "absolute";
        this.image = document.getElementById('mario').src = image;
        this.map = {
            height:document.getElementById("map").style.height = "700px"
        };
        this.positionStatic = function () {
            document.getElementById('player'+index).style.width = "30px";
            document.getElementById('mario').style.left = "-1px";

        };
        this.etat = "";
        this.etatDirection = "";
        this.gravite = {
            velocity : 0
        };
        this.jump = {
            velocity : 0
        };
        this.gravityUpdate = function () {
            if (this.etat === "descendRDC") {
                if (parseFloat(this.top) + parseFloat(this.height) <= parseFloat(this.map.height) -
                    85) {
                    this.gravite.velocity += .05;
                    this.top = parseFloat(this.top) + 10 + "px";
                    if (this.gravite.velocity >= 1) {
                        this.gravite.velocity = 1;
                        this.jump.velocity = 1.1;
                    }
                }
                else{
                    this.etat = "";
                }
            }
            if (this.etat === "") {
                this.jump.velocity = 1.1;
                this.gravite.velocity = 1.1;
            }
        };
        this.jumpUpdate = function () {
            if (this.etat === "saute") {
                this.jump.velocity -= .05;
                this.top = parseFloat(this.top) - 10 + "px";
                if (this.jump.velocity <= 0) {
                    this.etat = "descendRDC";
                    this.gravite.velocity = 0;
                }
            }


        };
        this.deplacement = function () {
            if (animation) {
                if (parseFloat(this.left) > 0) {
                    if (this.etatDirection === "gauche" && collisionBlocX === false) {
                        this.left = parseFloat(this.left) - 5 + "px";
                    }
                }
                if (parseFloat(this.left) < 750) {
                    if (this.etatDirection === "droite" && collisionBlocX === false) {
                        this.left = parseFloat(this.left) + 5 + "px";
                    }
                }
            }
        };
        this.collisionPlayer = function (arg) {
            this.left = parseFloat(this.left) + arg + "px";
        };
        this.sprite = function (scale) {
            document.getElementById('player'+index).style.transform = scale;
            var identifiantDInterpolation = 0;
            var animationMario = 0;
            if (anim === false) {
                setInterval(function () {
                    anim = true;

                    if (animation) {

                        if (animationMario < 2) {

                            animationMario += 1;
                            var interpolationMario = {
                                mario: [{
                                    image: {
                                        left: "-1px"
                                    },
                                    masque: {
                                        width: "30px"
                                    }
                                }, {
                                    image: {
                                        left: "-41px"
                                    },
                                    masque: {
                                        width: "40px"
                                    }
                                }]
                            }
                            var x = interpolationMario.mario[
                                identifiantDInterpolation].image.left;
                            var y = interpolationMario.mario[
                                identifiantDInterpolation].masque.width;
                            document.getElementById('mario').style.left = x;
                            document.getElementById('player'+index).style.width = y;

                            identifiantDInterpolation++;
                            if (identifiantDInterpolation === 2) {
                                animationMario = 0;
                                identifiantDInterpolation = 0;
                            }

                        }
                    }
                }, 100);
            }
        }

    }

    
 
  /*   
  
            _______  _        _        _______             _______  _______  _        ______  
|\     /|(  ____ \( \      ( \      (  ___  )  |\     /|(  ___  )(  ____ )( \      (  __  \ 
| )   ( || (    \/| (      | (      | (   ) |  | )   ( || (   ) || (    )|| (      | (  \  )
| (___) || (__    | |      | |      | |   | |  | | _ | || |   | || (____)|| |      | |   ) |
|  ___  ||  __)   | |      | |      | |   | |  | |( )| || |   | ||     __)| |      | |   | |
| (   ) || (      | |      | |      | |   | |  | || || || |   | || (\ (   | |      | |   ) |
| )   ( || (____/\| (____/\| (____/\| (___) |  | () () || (___) || ) \ \__| (____/\| (__/  )
|/     \|(_______/(_______/(_______/(_______)  (_______)(_______)|/   \__/(_______/(______/ 
                                                                                            
  player1 = {
        create : function(left,scale){
            document.getElementById("player").style.left = left,
            document.getElementById("player").style.transform = scale

        },
        left: document.getElementById("player").style.left,
        width: document.getElementById("player").style.width = "50px",
        top: document.getElementById("player").style.top = "575px",
        map: {
            height: document.getElementById("map").style.height = "700px"
        },
        height: document.getElementById("player").style.height = "50px",
        positionStatic: function () {
            document.getElementById('player').style.width = "30px";
            document.getElementById('mario').style.left = "-1px";

        },
        etat: "",
        etatDirection: "",
        gravite: {
            power: 10,
            velocity: 0
        },
        jump: {
            power: 10,
            velocity: 1.1
        },
        gravityUpdate: function () {
            if (this.etat === "descendRDC") {
                if (parseFloat(this.top) + parseFloat(this.height) <= parseFloat(this.map.height) -
                    85) {
                    this.gravite.velocity += .05;
                    this.top = parseFloat(this.top) + 10 + "px";
                    if (this.gravite.velocity >= 1) {
                        this.gravite.velocity = 1;
                        this.jump.velocity = 1.1;
                    }
                }
            }
            if (this.etat === "") {
                this.jump.velocity = 1.1;
                this.gravite.velocity = 1.1;
            }

        },
        jumpUpdate: function () {
            if (this.etat === "saute") {
                this.jump.velocity -= .05;
                this.top = parseFloat(this.top) - 10 + "px";
                if (this.jump.velocity <= 0) {
                    this.etat = "descendRDC";
                    this.gravite.velocity = 0;
                }
            }


        },
        deplacement: function () {
            if (animation) {
                if (parseFloat(this.left) > 0) {
                    if (this.etatDirection === "gauche" && collisionBlocX === false) {
                        this.left = parseFloat(this.left) - 5 + "px";
                    }
                }
                if (parseFloat(this.left) < 750) {
                    if (this.etatDirection === "droite" && collisionBlocX === false) {
                        this.left = parseFloat(this.left) + 5 + "px";
                    }
                }
            }
        },
        collisionPlayer: function (arg) {
            this.left = parseFloat(this.left) + arg + "px";
        },
        sprite: function (scale) {
            document.getElementById('player').style.transform = scale;
            var identifiantDInterpolation = 0;
            var animationMario = 0;
            if (anim === false) {
                setInterval(function () {
                    anim = true;

                    if (animation) {

                        if (animationMario < 2) {

                            animationMario += 1;
                            var interpolationMario = {
                                mario: [{
                                    image: {
                                        left: "-1px"
                                    },
                                    masque: {
                                        width: "30px"
                                    }
                                }, {
                                    image: {
                                        left: "-41px"
                                    },
                                    masque: {
                                        width: "40px"
                                    }
                                }]
                            }
                            var x = interpolationMario.mario[
                                identifiantDInterpolation].image.left;
                            var y = interpolationMario.mario[
                                identifiantDInterpolation].masque.width;
                            document.getElementById('mario').style.left = x;
                            document.getElementById('player').style.width = y;

                            identifiantDInterpolation++;
                            if (identifiantDInterpolation === 2) {
                                animationMario = 0;
                                identifiantDInterpolation = 0;
                            }

                        }
                    }
                }, 100);
            }
        }


    } */

    /******************************************************************************************** 
     ********************************************************************************************
     ********************************************************************************************
     ******************************************************************************************** 
     *******************************CREATION PLAYER 2*******************************************
     ********************************************************************************************
     ******************************************************************************************** 
     ********************************************************************************************
     ********************************************************************************************/
        Player2 = function(left, scale,index, image){
        this.width= document.getElementById("player"+index).style.width = "50px";
        this.left= document.getElementById("player"+index).style.left = left;
        this.top= document.getElementById("player"+index).style.top = "575px";
        this.scale= document.getElementById("player"+index).style.transform = scale; 
        this.height= document.getElementById("player"+index).style.height = "50px";
        this.image = document.getElementById("luigi").src = image;  
    }
    /******************************************************************************************** 
     ********************************************************************************************
     ********************************************************************************************
     ******************************************************************************************** 
     *******************************CREATION DES PIECES*******************************************
     ********************************************************************************************
     ******************************************************************************************** 
     ********************************************************************************************
     ********************************************************************************************/
/* var fonctionUsineDePieces = (function(){
    var ConstructeurPieces = function () {
    }
    ConstructeurPieces.prototype.createPiece = function (left, top) {
        var creationMasquePiece = document.createElement("div");
        creationMasquePiece.id = "masque-piece" + idMasquePiece;
        creationMasquePiece.style.width = "32px";
        creationMasquePiece.style.height = "42px";
        creationMasquePiece.style.position = "absolute";
        creationMasquePiece.style.left = left;
        creationMasquePiece.style.top = top;
        creationMasquePiece.style.overflow = "hidden";


        document.getElementById("divpiece").appendChild(creationMasquePiece);

        var creationImagePiece = document.createElement("img");
        creationImagePiece.src = "image/pieces.png";
        creationImagePiece.style.position = "absolute";
        creationImagePiece.style.width = "68px";
        creationImagePiece.style.height = "40px";
        creationImagePiece.style.left = "0px";
        creationImagePiece.id = "piece" + idPiece;
        document.getElementById("masque-piece" + idMasquePiece).appendChild(creationImagePiece);
    };
    ConstructeurPieces.prototype.spritePiece = function (indiceMasque, indicePiece) {
        var identifiantDInterpolation = 0;
        var animationPiece = 0;

        setInterval(function () {

            if (animationPiece < 3) {

                animationPiece += 1;
                var interpolationPiece = {
                    piece: [{
                            image: {
                                left: "0px"
                            },
                            masque: {
                                width: "30px"

                            }
                        }, {
                            image: {
                                left: "-30px"
                            },
                            masque: {
                                width: "26px"

                            }
                        },
                        {
                            image: {
                                left: "-50px"
                            },
                            masque: {
                                width: "26px"

                            }
                        }
                    ]
                }
                var x = interpolationPiece.piece[
                    identifiantDInterpolation].image.left;
                var y = interpolationPiece.piece[
                    identifiantDInterpolation].masque.width;
                var z = interpolationPiece.piece[
                    identifiantDInterpolation].masque.left;

                document.getElementById('piece' + indicePiece).style.left = x;
                document.getElementById('masque-piece' + indiceMasque).style.width = y;
                /* document.getElementById('masque-piece0').style.left = z;


                identifiantDInterpolation++;
                if (identifiantDInterpolation === 3) {
                    animationPiece = 0;
                    identifiantDInterpolation = 0;
                }

            }

        }, 180);

    };


    return function(){
        new ConstructeurPieces();
    }

}()); */
        var ConstructeurPieces = function () {
        }
        ConstructeurPieces.prototype.createPiece = function (left, top) {
            var creationMasquePiece = document.createElement("div");
            creationMasquePiece.id = "masque-piece" + idMasquePiece;
            creationMasquePiece.style.width = "32px";
            creationMasquePiece.style.height = "42px";
            creationMasquePiece.style.position = "absolute";
            creationMasquePiece.style.left = left;
            creationMasquePiece.style.top = top;
            creationMasquePiece.style.overflow = "hidden";


            document.getElementById("divpiece").appendChild(creationMasquePiece);

            var creationImagePiece = document.createElement("img");
            creationImagePiece.src = "image/pieces.png";
            creationImagePiece.style.position = "absolute";
            creationImagePiece.style.width = "68px";
            creationImagePiece.style.height = "40px";
            creationImagePiece.style.left = "0px";
            creationImagePiece.id = "piece" + idPiece;
            document.getElementById("masque-piece" + idMasquePiece).appendChild(creationImagePiece);
        };
        ConstructeurPieces.prototype.spritePiece = 
        [{
                                image: {
                                    left: "0px"
                                },
                                masque: {
                                    width: "30px"

                                }
                            }, {
                                image: {
                                    left: "-30px"
                                },
                                masque: {
                                    width: "26px"

                                }
                            },
                            {
                                image: {
                                    left: "-50px"
                                },
                                masque: {
                                    width: "26px"

                                }
                            }
                        ]
                    
 
      
    

    
        var piece = new ConstructeurPieces;

    var creationPieces = function () {
        
        var x = 105;
        var y = 5;
        for (var i = 0; i < 30; i++) {
            if (x > 665) {
                var x = 105;
                var y = 60;
            }
            var left = x + "px";
            var top = y + "px";
            piece.createPiece(left, top);
            /* piece.spritePiece(idMasquePiece, idPiece); */
            var left = x + "px";
            var top = y + "px";
            idMasquePiece++;
            idPiece++;
            x += 40;
        }
    
        var x = 0;
        var y = 180;
        for (var i = 0; i < 40; i++) {
            if (x > 760) {
                var x = 0;
                var y = 230;
            }

            var left = x + "px";
            var top = y + "px";
            piece.createPiece(left, top);
            /* piece.spritePiece(idMasquePiece, idPiece); */
            var left = x + "px";
            var top = y + "px";
            idMasquePiece++;
            idPiece++;
            x += 40;
        }

        var x = 0;
        var y = 380;
        for (var i = 0; i < 40; i++) {
            if (x > 760) {
                var x = 0;
                var y = 430;
            }

            var left = x + "px";
            var top = y + "px";
            piece.createPiece(left, top);
            /* piece.spritePiece(idMasquePiece, idPiece); */
            var left = x + "px";
            var top = y + "px";
            idMasquePiece++;
            idPiece++;
            x += 40;
        }

        var x = 300;
        var y = 130;
        for (var i = 0; i < 5; i++) {


            var left = x + "px";
            var top = y + "px";
            piece.createPiece(left, top);
            /* piece.spritePiece(idMasquePiece, idPiece); */
            var left = x + "px";
            var top = y + "px";
            idMasquePiece++;
            idPiece++;
            x += 40;
        }

        var x = 0;
        var y = 280;
        for (var i = 0; i < 5; i++) {

            var left = x + "px";
            var top = y + "px";
            piece.createPiece(left, top);
            /* piece.spritePiece(idMasquePiece, idPiece); */
            var left = x + "px";
            var top = y + "px";
            idMasquePiece++;
            idPiece++;
            x += 40;
        }

        var x = 600;
        var y = 280;
        for (var i = 0; i < 5; i++) {

            var left = x + "px";
            var top = y + "px";
            piece.createPiece(left, top);
            /* piece.spritePiece(idMasquePiece, idPiece); */
            var left = x + "px";
            var top = y + "px";
            idMasquePiece++;
            idPiece++;
            x += 40;
        }

        var x = 100;
        var y = 330;
        for (var i = 0; i < 15; i++) {

            var left = x + "px";
            var top = y + "px";
            piece.createPiece(left, top);
            /* piece.spritePiece(idMasquePiece, idPiece); */
            var left = x + "px";
            var top = y + "px";
            idMasquePiece++;
            idPiece++;
            x += 40;
        }

        var x = 300;
        var y = 480;
        for (var i = 0; i < 5; i++) {

            var left = x + "px";
            var top = y + "px";
            piece.createPiece(left, top);
            /* piece.spritePiece(idMasquePiece, idPiece); */
            var left = x + "px";
            var top = y + "px";
            idMasquePiece++;
            idPiece++;
            x += 40;
        }

        var x = 100;
        var y = 530;
        for (var i = 0; i < 10; i++) {
            if (x > 260) {
                y = 580;
                x = 100;
            }
            var left = x + "px";
            var top = y + "px";
            piece.createPiece(left, top);
            /* piece.spritePiece(idMasquePiece, idPiece); */
            var left = x + "px";
            var top = y + "px";
            idMasquePiece++;
            idPiece++;
            x += 40;
        }

        var x = 500;
        var y = 530;
        for (var i = 0; i < 10; i++) {
            if (x > 660) {
                y = 580;
                x = 500;
            }
            var left = x + "px";
            var top = y + "px";
            piece.createPiece(left, top);
            /* piece.spritePiece(idMasquePiece, idPiece); */
            var left = x + "px";
            var top = y + "px";
            idMasquePiece++;
            idPiece++;
            x += 40;
        } 



    }();

      /* var animationPiece = function(){
            setInterval(function(){
                idMasquePiece=0;
                    idPiece=0;
               
                    for(var i=0; i<3; i++){
                      
                    $('#piece0').css({'left':piece.spritePiece[0].image.left});
                    $('#masque-piece0').css({'width':piece.spritePiece[0].masque.width});
                    }
                    idMasquePiece++;
                    idPiece++;
                
            }, 1000);
        }(); */

    



                /******************************************************************************************** 
                 ********************************************************************************************
                 ********************************************************************************************
                 ******************************************************************************************** 
                 ***************************************COLLISIONS MARIO*************************************
                 ********************************************************************************************
                 ******************************************************************************************** 
                 ********************************************************************************************
                 ********************************************************************************************/

               
                var collisionMario = function () {
                /******************************************************************************************** 
                 *******************************COLLISION AVEC LES PIECES*******************************
                 ********************************************************************************************/

                for(var i=0; i<165; i++){
                    var pieceLeft = document.getElementById("masque-piece"+i).style.left;
                    var pieceWidth = document.getElementById("masque-piece"+i).style.width;
                    var pieceTop = document.getElementById("masque-piece"+i).style.top;
                    var pieceHeight = document.getElementById("masque-piece"+i).style.height;
                    if (parseFloat(player1.left) <= parseFloat(pieceLeft) + parseFloat(pieceWidth) && parseFloat(player1.left) + parseFloat(player1.width) >= parseFloat(pieceLeft) && parseFloat(player1.top) <= parseFloat(pieceTop) + parseFloat(pieceHeight) && parseFloat(player1.width) + parseFloat(player1.top) >= parseFloat(pieceTop)) {
                    
                        if(document.getElementById("masque-piece"+i).style.display != "none"){
                            compteurPiece++;
                            var audio = new Audio('sounds/piece.wav');
                             audio.play();
                             emitPiece(i);
                        }    
                       $('#masque-piece'+i).hide();

                 }

                }



                /******************************************************************************************** 
                 *******************************COLLISION AVEC LE BLOC 1*******************************
                 ********************************************************************************************/
                if (parseFloat(player1.left) <= parseFloat(bloc1.left) + parseFloat(bloc1.width) && parseFloat(
                        player1.left) + parseFloat(player1.width) >= parseFloat(bloc1.left)+20 && parseFloat(
                        player1.top) <= parseFloat(bloc1.top) + parseFloat(bloc1.height) && parseFloat(player1.width) +
                    parseFloat(player1.top) >= parseFloat(bloc1.top)) {
                    if (parseFloat(player1.top) + parseFloat(player1.height) > parseFloat(bloc1.top) &&
                        parseFloat(player1.top) < parseFloat(bloc1.top) + parseFloat(bloc1.height)) {
                        animation = false;
                        player1.etat = "descendRDC";
                        player1.collisionPlayer(-5);
                    }
                    if (parseFloat(player1.top) >= parseFloat(bloc1.top+bloc1.width)){

                        player1.etat = "descendRDC";
                    } else if (parseFloat(player1.left) + parseFloat(player1.width) <= parseFloat(bloc1.left)+20) {
                        player1.etat = "descendRDC";
                    } else {
                        if (player1.etat != "saute") {
                            player1.etat = "";

                        }
                        /* player1.jump.velocity = 1;
                        player1.gravite.velocity = 1; */
                    }


                }

                /******************************************************************************************** 
                 *******************************COLLISION AVEC LE BLOC 2*******************************
                 ********************************************************************************************/
                if (parseFloat(player1.left) <= parseFloat(bloc2.left) + parseFloat(bloc2.width) && parseFloat(
                        player1.left) + parseFloat(player1.width) >= parseFloat(bloc2.left) && parseFloat(
                        player1.top) <= parseFloat(bloc2.top) + parseFloat(bloc2.height) && parseFloat(player1.width) +
                    parseFloat(player1.top) >= parseFloat(bloc2.top)) {
                    if (parseFloat(player1.top) + parseFloat(player1.height) > parseFloat(bloc2.top) &&
                        parseFloat(player1.top) < parseFloat(bloc2.top) + parseFloat(bloc2.height)) {
                        animation = false;
                        player1.etat = "descendRDC";
                        player1.collisionPlayer(5);
                    }
                    if (parseFloat(player1.top) >= parseFloat(bloc2.top+bloc2.width)) {

                        player1.etat = "descendRDC";
                    } else if (parseFloat(player1.left) >= parseFloat(bloc2.width)) {
                        player1.etat = "descendRDC";
                    } else {
                        if (player1.etat != "saute") {
                            player1.etat = "";

                        }
                        /* player1.jump.velocity = 1;
                        player1.gravite.velocity = 1; */
                    }


                }

                /******************************************************************************************** 
                 *******************************COLLISION AVEC LE BLOC 3*******************************
                 ********************************************************************************************/
                if (parseFloat(player1.left) <= parseFloat(bloc3.left) + parseFloat(bloc3.width) && parseFloat(
                        player1.left) + parseFloat(player1.width) >= parseFloat(bloc3.left) && parseFloat(
                        player1.top) <= parseFloat(bloc3.top) + parseFloat(bloc3.height) && parseFloat(player1.width) +
                    parseFloat(player1.top) >= parseFloat(bloc3.top)) {
                    
                    if (parseFloat(player1.top) + parseFloat(player1.height) > parseFloat(bloc3.top) &&
                        parseFloat(player1.top) < parseFloat(bloc3.top) + parseFloat(bloc3.height)) {
                        animation = false;
                        player1.etat = "descendRDC";
                        player1.collisionPlayer(5);
                    }
                    if (parseFloat(player1.top) >= parseFloat(bloc3.top+bloc3.width)) {

                        player1.etat = "descendRDC";
                    } else if (parseFloat(player1.left) >= parseFloat(bloc3.width)) {
                        player1.etat = "descendRDC";
                    } else {
                        if (player1.etat != "saute") {

                            player1.etat = "";
                        }
                        /* player1.jump.velocity = 1;
                        player1.gravite.velocity = 1; */
                    }


                }
                /******************************************************************************************** 
                 *******************************COLLISION AVEC LE BLOC 4*******************************
                 ********************************************************************************************/
                if (parseFloat(player1.left) <= parseFloat(bloc4.left) + parseFloat(bloc4.width) && parseFloat(
                        player1.left) + parseFloat(player1.width) >= parseFloat(bloc4.left)+20 && parseFloat(
                        player1.top) <= parseFloat(bloc4.top) + parseFloat(bloc4.height) && parseFloat(player1.width) +
                    parseFloat(player1.top) >= parseFloat(bloc4.top)) {
                    if (parseFloat(player1.top) + parseFloat(player1.height) > parseFloat(bloc4.top) &&
                        parseFloat(player1.top) < parseFloat(bloc4.top) + parseFloat(bloc4.height)) {
                        animation = false;
                        player1.etat = "descendRDC";
                        player1.collisionPlayer(-5);
                    }

                    if (parseFloat(player1.top) >= parseFloat(bloc4.top+bloc4.width)) {

                        player1.etat = "descendRDC";
                    } else if (parseFloat(player1.left) + parseFloat(player1.width) <= parseFloat(bloc4.left)+20) {
                        player1.etat = "descendRDC";
                    } else {
                        if (player1.etat != "saute") {

                            player1.etat = "";
                        }

                    }


                }

                /******************************************************************************************** 
                 *******************************COLLISION AVEC LE BLOC 5*******************************
                 ********************************************************************************************/
                if (parseFloat(player1.left) <= parseFloat(bloc5.left) + parseFloat(bloc5.width) && parseFloat(
                        player1.left) + parseFloat(player1.width) >= parseFloat(bloc5.left)+20 && parseFloat(
                        player1.top) <= parseFloat(bloc5.top) + parseFloat(bloc5.height) && parseFloat(player1.width) +
                    parseFloat(player1.top) >= parseFloat(bloc5.top)) {
             
                    if (parseFloat(player1.top) + parseFloat(player1.height) > parseFloat(bloc5.top) &&
                        parseFloat(player1.top) < parseFloat(bloc5.top) + parseFloat(bloc5.height)) {
                        animation = false;
                        player1.etat = "descendRDC";
                        if (parseFloat(player1.left) + parseFloat(player1.width) >= parseFloat(bloc5.left)+parseFloat(bloc5.width)) {
                            player1.collisionPlayer(5);

                        }
                        if (parseFloat(player1.left) + parseFloat(player1.width) >= parseFloat(bloc5.left)) {
                            player1.collisionPlayer(-5);
                         
                        }
                    }

                    if (parseFloat(player1.top) >= parseFloat(bloc5.top+bloc5.width)) {

                        player1.etat = "descendRDC";
                    } else if (parseFloat(player1.left) + parseFloat(player1.width) >= parseFloat(bloc5.left)+parseFloat(bloc5.width)+46 || parseFloat(
                            player1.left) + parseFloat(player1.width) <= parseFloat(bloc5.left)+23) {
                        player1.etat = "descendRDC";
                    } else {
                        if (player1.etat != "saute") {

                            player1.etat = "";

                        }

                    }


                }

                /******************************************************************************************** 
                 *******************************COLLISION AVEC LE BLOC 6*******************************
                 ********************************************************************************************/
                if (parseFloat(player1.left) <= parseFloat(bloc6.left) + parseFloat(bloc6.width) && parseFloat(
                        player1.left) + parseFloat(player1.width) >= parseFloat(bloc6.left) && parseFloat(
                        player1.top) <= parseFloat(bloc6.top) + parseFloat(bloc6.height) && parseFloat(player1.width) +
                    parseFloat(player1.top) >= parseFloat(bloc6.top)) {
                   
                    if (parseFloat(player1.top) + parseFloat(player1.height) > parseFloat(bloc6.top) &&
                        parseFloat(player1.top) < parseFloat(bloc6.top) + parseFloat(bloc6.height)) {
                        animation = false;
                        player1.etat = "descendRDC";
                        player1.collisionPlayer(5);
                    }
                    if (parseFloat(player1.top) >= parseFloat(bloc6.top+bloc6.width)) {

                        player1.etat = "descendRDC";
                    } else if (parseFloat(player1.left) >= parseFloat(bloc6.width)-5) {
                        player1.etat = "descendRDC";
                    } else {
                        if (player1.etat != "saute") {

                            player1.etat = "";
                        }

                    }


                }

                /******************************************************************************************** 
                 *******************************COLLISION AVEC LE BLOC 7*******************************
                 ********************************************************************************************/
                if (parseFloat(player1.left) <= parseFloat(bloc7.left) + parseFloat(bloc7.width) && parseFloat(
                        player1.left) + parseFloat(player1.width) >= parseFloat(bloc7.left)+20 && parseFloat(
                        player1.top) <= parseFloat(bloc7.top) + parseFloat(bloc7.height) && parseFloat(player1.width) +
                    parseFloat(player1.top) >= parseFloat(bloc7.top)) {
               
                 
                    if (parseFloat(player1.top) + parseFloat(player1.height) > parseFloat(bloc7.top) &&
                        parseFloat(player1.top) < parseFloat(bloc7.top) + parseFloat(bloc7.height)) {
                        animation = false;
                        player1.etat = "descendRDC";
                        player1.collisionPlayer(-5);
                    }
                    if (parseFloat(player1.top) >=parseFloat(bloc7.top+bloc7.width)) {

                        player1.etat = "descendRDC";
                    } else if (parseFloat(player1.left) + parseFloat(player1.width) <= parseFloat(bloc7.left)+25) {
                        player1.etat = "descendRDC";
                    } else {
                        if (player1.etat != "saute") {

                            player1.etat = "";
                        }
                        /* player1.jump.velocity = 1;
                        player1.gravite.velocity = 1; */
                    }


                }




            }


    




    /************************************************************************************************
     ************************************************************************************************
     ************************************************************************************************
     ******************************************FUNCTION PLAY*****************************************
     ************************************************************************************************
     ************************************************************************************************
     ************************************************************************************************/
    function play() {
        if(laPartiePeutCommencer){    
        if(joueurCréer){
        
            player1.gravityUpdate();
            player1.deplacement();
            player1.jumpUpdate();
            document.getElementById("player1").style.top = player1.top;
            document.getElementById("player1").style.left = player1.left;
            $("#compteur-piece").html(compteurPiece);
            
            collisionMario();
        }
        
    }
        requestAnimationFrame(play);

    }
    requestAnimationFrame(play);

var sec=5;
var tmp=sec*10;
var finChrono = false;
var min;
var chrono=setInterval(function (){
    if(laPartiePeutCommencer){ 
  if(sec<=0){
      $('.timer').remove();
       clearInterval(chrono);
       finChrono =true;
     }
     min=Math.floor(tmp/600);
     sec=Math.floor(tmp/10);
     tmp--;
    
    }
     
},100);

    var start = null;
    function emitPosition(timestamp){
        var progress;
        if(start === null){
            start = timestamp;
        }
        
            

        progress = timestamp - start;
        if(progress>1000/30){
            emit();
            start = start+progress;
        }
        requestAnimationFrame(emitPosition);
    }
    requestAnimationFrame(emitPosition);

    var saut = function(){
        if(player1.etat != "descendRDC"){
            
            player1.etat = "saute";
        }
    }
    /************************************************************************************************
     *************************************************************************************************
     *************************************************************************************************
     *****************************************TOUCHES CLAVIER*****************************************
     *************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/
    function clavierKeyDown(event) {
        if(finChrono){
        var code = event.keyCode;

        switch (code) {

            case 37: //fleche gauche
                animation = true;
                player1.etatDirection = "gauche";
                player1.sprite('scaleX(-1)');
                break;

            case 39: //fleche droite
                animation = true;
                player1.etatDirection = "droite";
                player1.sprite('scaleX(1)');
                break;

            case 32: //espace
               saut();

                break;

            case 81: //Q
                animationLuigi = true;
                player2.etatDirection = "gauche";
                player2.sprite('scaleX(-1)');
                break;

            case 68: //D
                animationLuigi = true;
                player2.etatDirection = "droite";
                player2.sprite('scaleX(1)');
                break;

            case 90: //Z
                player2.etat = "saute";

                break;
        };
    }


    };

    function clavierKeyUp(event) {
        var code = event.keyCode;

        if(finChrono){

        switch (code) {

            case 37: // fleche gauche
                animation = false;
                anim = false;
                player1.positionStatic();
                break;

            case 39: //fleche droite
                animation = false;
                anim = false;
                player1.positionStatic();
                break;

            case 32: //espace

                break;

            case 81: // Q
                animationLuigi = false;
                animLuigi = false;
                player2.positionStatic();
                break;

            case 68: // D
                animationLuigi = false;
                animLuigi = false;
                player2.positionStatic();
                break;

            case 90: //espace

                break;

        };
    }


    };
    window.addEventListener("keydown", clavierKeyDown, false);
    window.addEventListener("keyup", clavierKeyUp, false);

});