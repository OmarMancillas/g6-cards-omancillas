const express = require('express');
const app = express();

const path = require('path');
const router = express.Router();

app.set('view engine', 'pug');

const { Deck, Hand } = require('./app/deck');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/game', (req, res) => {
  const deck = new Deck();
  const players = req.query.players;
  let hands ={};
  let remainingPlayers = players
  for(let i = 1; i<=players; i++){
    const hand = deck.dispatchCards(5, remainingPlayers);
    const hand1 = hand.toString();
    hands[i] = hand1;
    remainingPlayers --;
  }
  res.render('game', { deck: deck.cards,  hands : hands });
});

const port = 4000;
app.use('/', router);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
