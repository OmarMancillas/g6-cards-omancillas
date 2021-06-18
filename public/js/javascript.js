let randomTable = null;

const createCard = (number, symbol) => {
  const cardDiv = document.createElement("div");
  const isNumber = !isNaN(number);
  let flipped = false;
  cardDiv.classList.add("card");
  cardDiv.setAttribute("symbol", symbol);
  cardDiv.setAttribute("number", number);
  // cardDiv.setAttribute("flipped", false);

  cardDiv.innerHTML = `
    <div class="card-corner top-left">
        <div>${number}</div>
        <div>${symbol}</div>
    </div>
    <div class="symbols Card${number}${symbol}" flipped=false>
        ${
          isNumber
            ? `${new Array(parseInt(number))
                .fill(symbol)
                .map((cardSymbol) => `<div>${cardSymbol}</div>`)
                .join("")}`
            : `${
                number === "A"
                  ? `<div >${symbol}</div>`
                  : number === "" || number === "Q" || number === "K"
                  ? `<div   class=' image ${symbol} ${number}' flipped=${flipped}></div>`
                  : ""
              }`
        }
    </div>
    <div class="card-corner bottom-right">
        <div>${number}</div>
        <div>${symbol}</div>
    </div>
  `;
  
  
  cardDiv.addEventListener("click", () => {
    let symbolsDiv = document.querySelector(`.symbols.Card${number}${symbol}`);
    let imageDiv = null;
    if(number==='J' || number==='Q' || number==='K'){
      imageDiv = document.querySelector(`.image.${symbol}.${number}`);
    }
    if (cardDiv.style.transform == "rotateY(180deg)") {
      symbolsDiv.setAttribute('flipped', false);
      if(imageDiv){
        imageDiv.setAttribute('flipped', false);
      }
      cardDiv.style.transform = "rotateY(0deg)";
    } else {
      symbolsDiv.setAttribute('flipped', true);
      if(imageDiv){
        imageDiv.setAttribute('flipped', true);
      }
      cardDiv.style.transform = "rotateY(180deg)";
    }
  });
  return cardDiv;
};

async function getCards() {
  const container = document.querySelector(".deck");
  (async () => {
    // const { cards } = await (await fetch("/deck")).json();

    randomTable.forEach((card) => {
      const number = card.slice(0, -1);
      const symbol = card.slice(-1);

      container.append(createCard(number, symbol));
    });
  })();
}

async function getHands() {
  const container = document.querySelector(".hands");
  (async () => {
    const hand = await (await fetch("/hands")).json();
    hand.forEach((card) => {
      const number = card.slice(0, -1);
      const symbol = card.slice(-1);

      container.append(createCard(number, symbol));
    });
  })();
}

window.addEventListener("load", async () => {
  const data = await (await fetch("/deck")).json();
  // console.log(data.cards);
  // randomTable = data.cards;
  // console.log(data.randomTable);
  randomTable = data.randomTable;
  // button.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   getHands();
  // });
  getHands();
  getCards();
});
