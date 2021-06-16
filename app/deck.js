class Deck {
    numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
    suits = ['♣', '♦', '♥', '♠'];
  
    cards = [];
  
    constructor() {
      this.suits.forEach(suit => {
        this.numbers.forEach(face => {
          this.cards.push(face + suit);
        });
      });
    }
  
    dispatchCards(size, remainingPlayers) {
      return new Array(size)
        .fill()
        .map(
          () =>{
            if(this.cards.length<5 && remainingPlayers>1){
              this.cards = new Deck().cards;
            }

            return this.cards.splice(parseInt(Math.random() * this.cards.length), 1)[0]
          }
            
        );
    }
  }
  
  class Hand {
    cards = [];
    constructor(deck, size) {
      this.cards = deck.dispatchCards(size);
    }
  }
  
  module.exports = {
    Deck,
    Hand
  };
  