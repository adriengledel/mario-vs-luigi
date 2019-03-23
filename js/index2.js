/******************************************************************************************** 
     ********************************************************************************************
     ********************************************************************************************
     ******************************************************************************************** 
     ***************************************COLLISIONS LUIGI*************************************
     ********************************************************************************************
     ******************************************************************************************** 
     ********************************************************************************************
     ********************************************************************************************/

    var collisionLuigi = function () {
        /******************************************************************************************** 
         *******************************COLLISION AVEC LES PIECES*******************************
         ********************************************************************************************/
        var audioLuigi = new Audio('sounds/piece.wav');

        for (var i = 0; i < 165; i++) {
            var pieceLeft = document.getElementById("masque-piece" + i).style.left;
            var pieceWidth = document.getElementById("masque-piece" + i).style.width;
            var pieceTop = document.getElementById("masque-piece" + i).style.top;
            var pieceHeight = document.getElementById("masque-piece" + i).style.height;
            if (parseFloat(player2.left) <= parseFloat(pieceLeft) + parseFloat(pieceWidth) && parseFloat(player2.left) + parseFloat(player2.width) >= parseFloat(pieceLeft) && parseFloat(player2.top) <= parseFloat(pieceTop) + parseFloat(pieceHeight) && parseFloat(player2.width) + parseFloat(player2.top) >= parseFloat(pieceTop)) {

                if (document.getElementById("masque-piece" + i).style.display != "none") {
                    audioLuigi.play();
                }
                $('#masque-piece' + i).hide();

            }

        }




        /******************************************************************************************** 
         *******************************COLLISION AVEC LE BLOC 1*******************************
         ********************************************************************************************/
        if (parseFloat(player2.left) <= parseFloat(bloc1.left) + parseFloat(bloc1.width) && parseFloat(
                player2.left) + parseFloat(player2.width) >= parseFloat(bloc1.left) + 20 && parseFloat(
                player2.top) <= parseFloat(bloc1.top) + parseFloat(bloc1.height) && parseFloat(player2.width) +
            parseFloat(player2.top) >= parseFloat(bloc1.top)) {
            if (parseFloat(player2.top) + parseFloat(player2.height) > parseFloat(bloc1.top) &&
                parseFloat(player2.top) < parseFloat(bloc1.top) + parseFloat(bloc1.height)) {
                animation = false;
                player2.etat = "descendRDC";
                player2.collisionPlayer(-5);
            }
            if (parseFloat(player2.top) >= 525) {

                player2.etat = "descendRDC";
            } else if (parseFloat(player2.left) + parseFloat(player2.width) <= 520) {
                player2.etat = "descendRDC";
            } else {
                if (player2.etat != "saute") {
                    player2.etat = "";

                }
                /* player2.jump.velocity = 1;
                player2.gravite.velocity = 1; */
            }


        }

        /******************************************************************************************** 
         *******************************COLLISION AVEC LE BLOC 2*******************************
         ********************************************************************************************/
        if (parseFloat(player2.left) <= parseFloat(bloc2.left) + parseFloat(bloc2.width) && parseFloat(
                player2.left) + parseFloat(player2.width) >= parseFloat(bloc2.left) && parseFloat(
                player2.top) <= parseFloat(bloc2.top) + parseFloat(bloc2.height) && parseFloat(player2.width) +
            parseFloat(player2.top) >= parseFloat(bloc2.top)) {
            if (parseFloat(player2.top) + parseFloat(player2.height) > parseFloat(bloc2.top) &&
                parseFloat(player2.top) < parseFloat(bloc2.top) + parseFloat(bloc2.height)) {
                animation = false;
                player2.etat = "descendRDC";
                player2.collisionPlayer(5);
            }
            if (parseFloat(player2.top) > 500) {

                player2.etat = "descendRDC";
            } else if (parseFloat(player2.left) >= 300) {
                player2.etat = "descendRDC";
            } else {
                if (player2.etat != "saute") {
                    player2.etat = "";

                }
                /* player2.jump.velocity = 1;
                player2.gravite.velocity = 1; */
            }


        }

        /******************************************************************************************** 
         *******************************COLLISION AVEC LE BLOC 3*******************************
         ********************************************************************************************/
        if (parseFloat(player2.left) <= parseFloat(bloc3.left) + parseFloat(bloc3.width) && parseFloat(
                player2.left) + parseFloat(player2.width) >= parseFloat(bloc3.left) && parseFloat(
                player2.top) <= parseFloat(bloc3.top) + parseFloat(bloc3.height) && parseFloat(player2.width) +
            parseFloat(player2.top) >= parseFloat(bloc3.top)) {

            if (parseFloat(player2.top) + parseFloat(player2.height) > parseFloat(bloc3.top) &&
                parseFloat(player2.top) < parseFloat(bloc3.top) + parseFloat(bloc3.height)) {
                animation = false;
                player2.etat = "descendRDC";
                player2.collisionPlayer(5);
            }
            if (parseFloat(player2.top) >= 375) {

                player2.etat = "descendRDC";
            } else if (parseFloat(player2.left) >= 100) {
                player2.etat = "descendRDC";
            } else {
                if (player2.etat != "saute") {

                    player2.etat = "";
                }
                /* player2.jump.velocity = 1;
                player2.gravite.velocity = 1; */
            }


        }
        /******************************************************************************************** 
         *******************************COLLISION AVEC LE BLOC 4*******************************
         ********************************************************************************************/
        if (parseFloat(player2.left) <= parseFloat(bloc4.left) + parseFloat(bloc4.width) && parseFloat(
                player2.left) + parseFloat(player2.width) >= parseFloat(bloc4.left) + 20 && parseFloat(
                player2.top) <= parseFloat(bloc4.top) + parseFloat(bloc4.height) && parseFloat(player2.width) +
            parseFloat(player2.top) >= parseFloat(bloc4.top)) {
            if (parseFloat(player2.top) + parseFloat(player2.height) > parseFloat(bloc4.top) &&
                parseFloat(player2.top) < parseFloat(bloc4.top) + parseFloat(bloc4.height)) {
                animation = false;
                player2.etat = "descendRDC";
                player2.collisionPlayer(-5);
            }

            if (parseFloat(player2.top) >= 375) {

                player2.etat = "descendRDC";
            } else if (parseFloat(player2.left) + parseFloat(player2.width) <= 720) {
                player2.etat = "descendRDC";
            } else {
                if (player2.etat != "saute") {

                    player2.etat = "";
                }

            }


        }

        /******************************************************************************************** 
         *******************************COLLISION AVEC LE BLOC 5*******************************
         ********************************************************************************************/
        if (parseFloat(player2.left) <= parseFloat(bloc5.left) + parseFloat(bloc5.width) && parseFloat(
                player2.left) + parseFloat(player2.width) >= parseFloat(bloc5.left) && parseFloat(
                player2.top) <= parseFloat(bloc5.top) + parseFloat(bloc5.height) && parseFloat(player2.width) +
            parseFloat(player2.top) >= parseFloat(bloc5.top)) {

            if (parseFloat(player2.top) + parseFloat(player2.height) > parseFloat(bloc5.top) &&
                parseFloat(player2.top) < parseFloat(bloc5.top) + parseFloat(bloc5.height)) {
                animation = false;
                player2.etat = "descendRDC";
                if (parseFloat(player2.left) + parseFloat(player2.width) >= 640) {
                    player2.collisionPlayer(5);

                }
                if (parseFloat(player2.left) + parseFloat(player2.width) < 210) {
                    player2.collisionPlayer(-5);
                }
            }

            if (parseFloat(player2.top) > 300) {

                player2.etat = "descendRDC";
            } else if (parseFloat(player2.left) + parseFloat(player2.width) >= 645 || parseFloat(
                    player2.left) + parseFloat(player2.width) <= 220) {
                player2.etat = "descendRDC";
            } else {
                if (player2.etat != "saute") {

                    player2.etat = "";

                }

            }


        }

        /******************************************************************************************** 
         *******************************COLLISION AVEC LE BLOC 6*******************************
         ********************************************************************************************/
        if (parseFloat(player2.left) <= parseFloat(bloc6.left) + parseFloat(bloc6.width) && parseFloat(
                player2.left) + parseFloat(player2.width) >= parseFloat(bloc6.left) && parseFloat(
                player2.top) <= parseFloat(bloc6.top) + parseFloat(bloc6.height) && parseFloat(player2.width) +
            parseFloat(player2.top) >= parseFloat(bloc6.top)) {

            if (parseFloat(player2.top) + parseFloat(player2.height) > parseFloat(bloc6.top) &&
                parseFloat(player2.top) < parseFloat(bloc6.top) + parseFloat(bloc6.height)) {
                animation = false;
                player2.etat = "descendRDC";
                player2.collisionPlayer(5);
            }
            if (parseFloat(player2.top) > 150 && parseFloat(player2.top) < 300) {

                player2.etat = "descendRDC";
            } else if (parseFloat(player2.left) > 289) {
                player2.etat = "descendRDC";
            } else {
                if (player2.etat != "saute") {

                    player2.etat = "";
                }

            }


        }

        /******************************************************************************************** 
         *******************************COLLISION AVEC LE BLOC 7*******************************
         ********************************************************************************************/
        if (parseFloat(player2.left) <= parseFloat(bloc7.left) + parseFloat(bloc7.width) && parseFloat(
                player2.left) + parseFloat(player2.width) >= parseFloat(bloc7.left) + 20 && parseFloat(
                player2.top) <= parseFloat(bloc7.top) + parseFloat(bloc7.height) && parseFloat(player2.width) +
            parseFloat(player2.top) >= parseFloat(bloc7.top)) {


            if (parseFloat(player2.top) + parseFloat(player2.height) > parseFloat(bloc7.top) &&
                parseFloat(player2.top) < parseFloat(bloc7.top) + parseFloat(bloc7.height)) {
                animation = false;
                player2.etat = "descendRDC";
                player2.collisionPlayer(-5);
            }
            if (parseFloat(player2.top) > 150 && parseFloat(player2.top) < 300) {

                player2.etat = "descendRDC";
            } else if (parseFloat(player2.left) + parseFloat(player2.width) <= 520) {
                player2.etat = "descendRDC";
            } else {
                if (player2.etat != "saute") {

                    player2.etat = "";
                }
                /* player2.jump.velocity = 1;
                player2.gravite.velocity = 1; */
            }


        }




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
    var player1 = {
        width: document.getElementById("player").style.width = "50px",
        left: document.getElementById("player").style.left = "300px",
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



            /* else {
                this.etat = "descendRDC";
                this.gravite.velocity = 1;
                this.jump.velocity = 1;
                collisionBlocY = false;
                
            } */

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


    }

    /******************************************************************************************** 
     ********************************************************************************************
     ********************************************************************************************
     ******************************************************************************************** 
     *******************************CREATION PLAYER 2*******************************************
     ********************************************************************************************
     ******************************************************************************************** 
     ********************************************************************************************
     ********************************************************************************************/
    var player2 = {
        width: document.getElementById("player2").style.width = "50px",
        left: document.getElementById("player2").style.left = "450px",
        top: document.getElementById("player2").style.top = "575px",
        scale: document.getElementById("player2").style.transform = "scaleX(-1)",
        map: {
            height: document.getElementById("map").style.height = "700px"
        },
        height: document.getElementById("player2").style.height = "50px",
        positionStatic: function () {
            document.getElementById('player2').style.width = "30px";
            document.getElementById('luigi').style.left = "-1px";

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



            /* else {
                this.etat = "descendRDC";
                this.gravite.velocity = 1;
                this.jump.velocity = 1;
                collisionBlocY = false;
                
            } */

        },
        deplacement: function () {
            if (animationLuigi) {
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
            document.getElementById('player2').style.transform = scale;
            var identifiantDInterpolation = 0;
            var animationMario = 0;
            if (animLuigi === false) {
                setInterval(function () {
                    animLuigi = true;

                    if (animationLuigi) {

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
                            document.getElementById('luigi').style.left = x;
                            document.getElementById('player2').style.width = y;

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