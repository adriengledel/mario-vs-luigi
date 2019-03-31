const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const MongoClient = require("mongodb").MongoClient;
const objectId = require('mongodb').ObjectID;
const url = "mongodb+srv://Adrien:qXxGbspNrC9H9WX@mario-vs-luigi-database-nmfoh.mongodb.net/test?retryWrites=true";
const dbName = "jeuMultijoueur";
const http = require('http').Server(app);
const io = require('socket.io')(http);
var nb = 0;

app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(session({
  secret: '1234',
  saveUninitialized: true,
  resave: true
}));
app.use(express.static(__dirname));

app.set('view engine', 'pug');



app.get('/', function (req, res) {
  res.render('acceuil');
  /* if (req.session.identifiantSession === undefined) {

    res.render('acceuil');
  } else {
    res.render('authentifié.pug', {
      niveau: req.session.niveauSession
    });
  } */
});




app.post('/MarioVsLuigi', function (req, res) {
  var authentification = false;
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (error, client) {
    let db = client.db(dbName);
    db.collection('utilisateurs', function (err, collection) {
      console.log(req.body.pseudo);
      let cursor = collection.find({
        pseudo: req.body.pseudo
      });
      cursor.toArray(function (err, documents) {
        client.close();
        if (documents[0] != undefined) {
          if (documents[0].password === req.body.password) {
            req.session.identifiantSession = 1234;
            req.session.identifiant = documents[0].pseudo;
            app.locals['identifiant' + nb] = documents[0].pseudo;

            authentification = true;
          }
        }


        if (authentification) {
          res.render('MarioVsLuigi', {
            pseudo: app.locals['identifiant' + nb]
          });
          nb++;
          if (nb === 2) {
            nb = 0;
          }
        } else {
          res.render('acceuil.pug', {
            message: 'Pseudo ou mot de passe incorrect !'
          });
        }

      });
    });
  });


});


app.get('/creation-compte', function (req, res) {
  res.render('creation-compte');
});

app.post('/creation-compte-finalisation', function (req, res) {
  MongoClient.connect(url, {
    useNewUrlParser: true}, function (error, client) {
    let db = client.db(dbName);
    var utilisateur = {
      pseudo: req.body.pseudo,
      password: req.body.password
    };
    db.collection("utilisateurs").find({pseudo:req.body.pseudo}).toArray(function(err, documents){
        console.log(documents.length);
        if(documents.length === 1){
          res.render('creation-compte', {message:'Ce Pseudo existe déjà !'});
        }
        else{
          db.collection("utilisateurs").insertOne(utilisateur, function (err) {
            res.render('acceuil');
          });
        }
        client.close();
    });
    
  });
});

app.post('/valid', function (req, res) {
  res.render('MariovsLuigi');
});


let player1 = {
  left: "300px",
  scale: "scaleX(1)",
  image: "image/mario.png"
}
let player2 = {
  left: "450px",
  scale: "scaleX(-1)",
  image: "image/luigi.png"
}

              /****************************************************       
              __________   ____ |  | __ _____/  |_   |__| ____  
              /  ___/  _ \_/ ___\|  |/ // __ \   __\  |  |/  _ \ 
              \___ (  <_> )  \___|    <\  ___/|  |    |  (  <_> )
              /____  >____/ \___  >__|_ \\___  >__| /\ |__|\____/ 
                \/           \/     \/    \/     \/            
              ****************************************************/

let count = 0;
let nbId = 0;
let joueur1="";
let joueur2;
var joueurConnecte = [];

io.on('connection', function (socket) {
 
  if(joueur1 === ''){
    joueur1 = socket.id;
  }
  else{
    joueur2 = socket.id;
  }

  joueurConnecte[socket.id] = {
    id : socket.id,
    perso : {...player1},
    pseudo : app.locals['identifiant'+nbId],
    nbPieces : 0
  }

  nbId++;
  if(nbId === 2){
    nbId = 0;
  }


  if (!joueurConnecte.includes(socket.id)) {
    socket.emit('creation', {
      id: app.locals['identifiant0'],
      player1,
      player2
    });

    player1.left = "450px";
    player1.scale = "scaleX(-1)";
    player1.image = "image/luigi.png";
    player2.left = "300px";
    player2.scale = "scaleX(1)";
    player2.image = "image/mario.png";

  }

  if (Object.keys(joueurConnecte).length === 2) {
    socket.emit('matchmakingOk', {
      display: "none",
      id: app.locals['identifiant0'],
      player1,
      player2
    });
    socket.broadcast.emit('matchmakingOk', {
      display: "none",
      id: app.locals['identifiant1']
    });
    player1 = {
      left: "300px",
      scale: "scaleX(1)",
      image: "image/mario.png"
    }
    player2 = {
      left: "450px",
      scale: "scaleX(-1)",
      image: "image/luigi.png"
    }

    var sec=5;
    var tmp=sec*10;
    var finChrono = false;
    var min;
    var chrono=setInterval(function (){
        if(sec<=0){
       
        clearInterval(chrono);
        finChrono =true;
        }
      min=Math.floor(tmp/600);
      sec=Math.floor(tmp/10);
      tmp--;
      socket.emit('chrono', sec);
      socket.broadcast.emit('chrono', sec);
      
      
     
    },100);

  }


  socket.on('emitPosition', function (message) {
    socket.broadcast.emit('receivePosition', {
      data: message
    });
  });



  socket.on('emitPiece', function (message) {

    count++;
    joueurConnecte[socket.id].nbPieces++;
 
    socket.broadcast.emit('displayPiece', {
      message,
      player1 : joueurConnecte[joueur1],
      player2 : joueurConnecte[joueur2]
    });

    socket.emit('displayPiece',{
      message,
      player1 : joueurConnecte[joueur1],
      player2 : joueurConnecte[joueur2]
    });

    if(count === 165){
      
      let score = {
        player1 : {
          pseudo : joueurConnecte[joueur1].pseudo,
          nbPieces : joueurConnecte[joueur1].nbPieces
        },
        player2 : {
          pseudo : joueurConnecte[joueur2].pseudo,
          nbPieces : joueurConnecte[joueur2].nbPieces
        }
      }
      
      MongoClient.connect(url, {
        useNewUrlParser: true
      }, function (error, client) {
        let db = client.db(dbName);
        console.log('dans db',score)
        db.collection("score").insertOne(score);
      });
      count = 0;

        socket.emit('finDePartie', score);
        socket.broadcast.emit('finDePartie', score);

    }


  });

  socket.on('disconnect', function (log) {
    count = 0;
    if (joueurConnecte.findIndex(joueurConnecte => joueurConnecte === socket.id + "") === 1) {
      player1 = {
        left: "450px",
        scale: "scaleX(-1)",
        image: "image/luigi.png"
      }
      player2 = {
        left: "300px",
        scale: "scaleX(1)",
        image: "image/mario.png"
      }
    } else {
      player1 = {
        left: "300px",
        scale: "scaleX(1)",
        image: "image/mario.png"
      }
      player2 = {
        left: "450px",
        scale: "scaleX(-1)",
        image: "image/luigi.png"
      }
    }

    delete joueurConnecte[socket.id];
    joueur1 = "";
    joueur2 = "";
    console.log('deconnection', joueurConnecte);
  });
});
app.use(function(req, res){
  res.status(404).send('Error 404 ');
});


http.listen(process.env.PORT || 8080, function () {
  console.log('listen on port 8080');
});