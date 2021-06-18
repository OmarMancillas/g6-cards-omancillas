// const express = require('express');
// const app = express();

// const path = require('path');
// const router = express.Router();

// app.set('view engine', 'pug');

// const { Deck, Hand } = require('./app/deck');

// router.get('/', (req, res) => {
//   res.render('index');
// });

// router.get('/game', (req, res) => {
//   const deck = new Deck();
//   const players = req.query.players;
//   let hands ={};
//   let remainingPlayers = players
//   for(let i = 1; i<=players; i++){
//     const hand = deck.dispatchCards(5, remainingPlayers);
//     const hand1 = hand.toString();
//     hands[i] = hand1;
//     remainingPlayers --;
//   }
//   res.render('game', { deck: deck.cards,  hands : hands });
// });

// const port = 4000;
// app.use('/', router);
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
const express = require('express');
const app = express();
const { Deck, Hand } = require('./app/deck');
const deck = new Deck();

app.use(express.static('public'))

app.get('/styles.css', (rqe,res)=>{
  res.sendFile(__dirname + '/public/css/styles.css')
})

app.get('/javascript.js', (rqe,res)=>{
  res.sendFile(__dirname + '/public/js/javascript.js')
})


app.get('/deck',(req,res)=>{
  // console.log(deck);
  res.send(deck);
})

app.get('/hands', (req, res) => {
  const hand = deck.dispatchCards(2);
  // console.log({hand:hand});
  res.send(hand);
});

app.listen(4001, () => {
  console.log('Server running on port 4001');
});