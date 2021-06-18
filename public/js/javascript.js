let randomTable = null;

const createCard = (number, symbol) => {
  const cardDiv = document.createElement("div");
  const isNumber = !isNaN(number);
  cardDiv.classList.add("card");
  cardDiv.setAttribute("symbol", symbol);
  cardDiv.setAttribute("number", number);

  cardDiv.innerHTML = `
          <div class="card-corner top-left">
              <div>${number}</div>
              <div>${symbol}</div>
          </div>
          <div class="symbols">
              ${
                isNumber
                  ? `${new Array(parseInt(number))
                      .fill(symbol)
                      .map(
                        (cardSymbol) => `
                  <div>${cardSymbol}</div>
              `
                      )
                      .join("")}`
                  : ""
              }
          </div>
          <div class="card-corner bottom-right">
              <div>${number}</div>
              <div>${symbol}</div>
          </div>
        `;
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
  console.log(data.randomTable);
  randomTable = data.randomTable;
  // button.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   getHands();
  // });
  getHands();
  getCards();
});
