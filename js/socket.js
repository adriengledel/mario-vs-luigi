(function(window, io){
    window.addEventListener('DOMContentLoaded', function(){
        console.log('socket connecté client');
        var socket  = io('https://mario-vs-luigi.herokuapp.com/');
       $('form').on('submit', function(e){
            e.preventDefault();
            var id = document.getElementById(nb).id;
           
            socket.emit('identifiant', {id:id});
        }); 
            
       
           emit = function(){
                socket.emit('emitPosition', {
            
                positionX:document.getElementById('player1').style.left,
                positionY:document.getElementById('player1').style.top,
                positionWidth:document.getElementById('player1').style.width,
                positionTransform:document.getElementById('player1').style.transform,
                positionSprite: document.getElementById('mario').style.left

                });
            }
            emitPiece = function(arg){
               
                socket.emit('emitPiece', {
                    display:arg,
                    piece:compteurPiece
                    });
                } 
            
        
        socket.on('creation', function(data){

            var nbPlayerPrincipal = 1;
            var nbPlayerSecondaire = 2;
            console.log('oh');
            player1 = new Player(data.player1.left, data.player1.scale, nbPlayerPrincipal, data.player1.image);
            
            joueurCréer = true;
            player2 = new Player2(data.player2.left, data.player2.scale,nbPlayerSecondaire, data.player2.image);
            console.log(player1);
            console.log(player2);
            nbPlayerPrincipal++;
            nbPlayerSecondaire--;
            console.log("ok créé");
        });
       
        socket.on('matchmakingOk', function(data){
            console.log(data.id);
            document.getElementById("circle-border").style.display = data.display;
            document.getElementById("circle-core").style.display = data.display;
            document.getElementById("image-acceuil").style.display = data.display;
            document.querySelector('h2').style.display = data.display;
            document.getElementById("player2").innerHTML = data.id;
            if($('#player2').css('left')==="450px"){

                $('#player2').append('<img id="luigi" src="image/luigi.png">');
            }
            else{
                $('#player2').append('<img id="luigi" src="image/mario.png">');
            }
            laPartiePeutCommencer = true;
            

            
        });

        socket.on('receivePosition', function(data){
           
            document.getElementById('player2').style.left = data.data.positionX;
            document.getElementById('player2').style.top = data.data.positionY;
            document.getElementById('player2').style.width = data.data.positionWidth;
            document.getElementById('player2').style.transform = data.data.positionTransform;
            document.getElementById('luigi').style.left = data.data.positionSprite;

            
        });

        socket.on('displayPiece', function(data){
            console.log(data);
            document.getElementById("masque-piece" + data.data.display).style.display = "none";
            $('#compteur-piece-adversaire').html(data.data.piece);

            
        });

        socket.on('chrono', function(data){
            
            $('.timer').text(data);
        });

    });

})(window, io);

/* var socket = io(); */