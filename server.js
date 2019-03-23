const express = require('express');
const session = require('express-session');
/* const MongoStore = require ( ' connect-mongo ' ) ( session ) ; */
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
/*   store: new MongoStore(options), */
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
var joueurConnecte = [];



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
          res.render('creation-compte', {message:'Ce Pseudo existe déjà fais pas chier change de Pseudo !!!!'});
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
io.on('connection', function (socket) {
  setInterval(function(){

    
  },1000);

  if (!joueurConnecte.includes(socket.id)) {
    joueurConnecte.push(socket.id);
    console.log(player1);
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

  if (joueurConnecte.length === 2) {
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

  }


  socket.on('emitPosition', function (message) {
    socket.broadcast.emit('receivePosition', {
      data: message
    });
  });
  socket.on('emitPiece', function (message) {
    console.log(app.locals)
    socket['piece'+app.locals.identifiant] = message.piece;
    console.log(socket);
    socket.broadcast.emit('displayPiece', {
      data: message
    });
  });

  socket.on('disconnect', function (log) {
    console.log(socket.id);
    console.log('an user disconnected');
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

    joueurConnecte.pop();
    console.log('nb de joueur' + joueurConnecte.length);
  });
});
app.use(function(req, res){
  res.status(404).send('Error 404 ');
});


http.listen(process.env.PORT || 8080, function () {
  console.log('listen on port 8080');
});