let randomTable = null;

const createCard = (number, symbol, isFlipped) => {
  const cardDiv = document.createElement("div");
  const isNumber = !isNaN(number);
  // let isFlipped = false;
  cardDiv.classList.add("card");
  cardDiv.setAttribute("symbol", symbol);
  cardDiv.setAttribute("number", number);
  // cardDiv.setAttribute("flipped", isFlipped)
{/* <div class="card card-${symbol} ${isFlipped ? "flipped" : ""}" number="${number}">
</div> */}

  cardDiv.innerHTML = `
  
    <div class='front'>
      <div class="card-corner top-left">
          <div>${number}</div>
          <div>${symbol}</div>
      </div>
      <div class="symbols">
          ${
            isNumber
              ? `${new Array(parseInt(number))
                  .fill(symbol)
                  .map((cardSymbol) => `<div>${cardSymbol}</div>`)
                  .join("")}`
              : `${
                  number === "A"
                    ? `<div >${symbol}</div>`
                    : ""
                }`
          }
      </div>
      <div class="card-corner bottom-right">
          <div>${number}</div>
          <div>${symbol}</div>
      </div>
    </div>
    <div class='back'>
    </div>
  `;
  /*number === "J" || number === "Q" || number === "K"
                    ? `<div   class=' image ${symbol} ${number}'></div>`
                    : ""
  */
  if (isFlipped) {
    cardDiv.classList.add("flipped");
  }   
  
  cardDiv.addEventListener("click", () => {
    if (cardDiv.classList.contains("flipped")) {
      cardDiv.classList.remove("flipped");
    } else {
      cardDiv.classList.add("flipped");
    }
    // let symbolsDiv = document.querySelector(`.symbols.Card${number}${symbol}`);
    // let imageDiv = null;
    // if(number==='J' || number==='Q' || number==='K'){
    //   imageDiv = document.querySelector(`.image.${symbol}.${number}`);
    // }
    // if (cardDiv.style.transform == "rotateY(180deg)") {
    //   cardDiv.style.transform = "rotateY(0deg)";
    //   symbolsDiv.setAttribute('flipped', false);
    //   if(imageDiv){
    //     imageDiv.setAttribute('flipped', false);
    //   }
    // } else {
    //   cardDiv.style.transform = "rotateY(180deg)";
    //   symbolsDiv.setAttribute('flipped', true);
    //   if(imageDiv){
    //     imageDiv.setAttribute('flipped', true);
    //   }
    // }
  });
  return cardDiv;
};

async function getCards() {
  const container = document.querySelector(".deck");
  (async () => {
    // const { cards } = await (await fetch("/deck")).json();
    let flipped = 1
    // randomTable.forEach((card) => {
    randomTable.forEach((card) => {
      const number = card.slice(0, -1);
      const symbol = card.slice(-1);

      if(flipped<=2){
        container.append(createCard(number, symbol, true));
        flipped++
      }else{
        container.append(createCard(number, symbol, false));
        flipped++
      }

      // container.append(createCard(number, symbol));
    });
  })();
}

async function getHands() {
  const container = document.querySelector(".hands");
  (async () => {
    const hand = await (await fetch("/hands")).json();

    let flipped = 1
    hand.forEach((card) => {
      const number = card.slice(0, -1);
      const symbol = card.slice(-1);

      if(flipped<=2){
        container.append(createCard(number, symbol, true));
        flipped++
      }else{
        container.append(createCard(number, symbol, false));
        flipped++
      }
      
    });
  })();
}

window.addEventListener("load", async () => {
  const data = await (await fetch("/deck")).json();
 
  randomTable = data.randomTable;
  // randomTable = data.cards;
  getHands();
  getCards();
});
