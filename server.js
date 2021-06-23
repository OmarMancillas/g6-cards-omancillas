const express = require('express');
const cors = require('cors')
const app = express();
const { Deck, Hand } = require('./app/deck');
const deck = new Deck();

app.use(cors())
app.use(express.static('public'))

app.get('/styles.css', (rqe,res)=>{
  res.sendFile(__dirname + '/public/css/styles.css')
})

app.get('/javascript.js', (rqe,res)=>{
  res.sendFile(__dirname + '/public/js/javascript.js')
})


app.get('/deck',(req,res)=>{
  // console.log({ deck : deck, randomTable : deck.randomTable});
  res.send(deck);
})

app.get('/hands', (req, res) => {
  const hand = deck.dispatchCards(2);
  res.send(hand);
});

app.get('/table',(req,res)=>{
  // console.log({ deck : deck, randomTable : deck.randomTable});
  res.send({ deck : deck.cards, cards : deck.randomTable});
})

app.get('/playerHand', (req, res) => {
  const hand = deck.dispatchCards(2);
  // console.log(hand, {cards : hand});
  res.send({deck: hand, cards : hand});
});

app.listen(4001, () => {
  console.log('Server running on port 4001');
});