// document.addEventListener("DOMContentLoaded", fetchData);

class Marquee {
  constructor(parent) {
    this.parent = parent;
    this.createMarquee();
  }

  async fetchMarqueData() {
    const fetchedData = await fetch(
      `https://financialmodelingprep.com/api/v3/company/stock/list`
    ).then(response => {
      return response.json();
    });
    return fetchedData;
  }

  async createMarquee() {
    const marqueeData = await this.fetchMarqueData();
    marqueeData.symbolsList.map((element, index) => {
      if (index < 50) {
        let stockPrice = `${element.symbol} <span class="positive-percent">   
     ${element.price}   </span>  <i class="fas fa-hand-holding-usd"></i>    `;
        this.parent.innerHTML += stockPrice;
      }
    });
  }
}
// const marquee = document.getElementById("marquee");
// new Marquee(marquee);
