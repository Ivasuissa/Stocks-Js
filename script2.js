// MILESTONE 2
let urlParams = new URLSearchParams(window.location.search);
let symbol = urlParams.get("symbol");
let loaderbis = document.getElementById("loader-3");
let companyProfil = document.getElementById("companyProfil");
companyProfil.innerText = "";
let xlabels = [];
let ychange = [];
document.addEventListener("DOMContentLoaded", loaderOff);

function loaderOff() {
  loaderbis.classList.toggle("spinner-border", false);
  loaderbis.classList.toggle("hide-elements", true);
}

function getCompanyProfil() {
  fetch(`https://financialmodelingprep.com/api/v3/company/profile/${symbol}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      createElement2(data.profile);
      historyOfStockPrice();
    })
}
getCompanyProfil();

function createElement2(element) {
  let image = element.image;
  let name = element.companyName;
  let description = element.description;
  let link1 = element.website;
  let price = element.price;
  let percentage = element.changesPercentage;
  let listProfilItem1 = document.createElement("li");
  listProfilItem1.setAttribute("id", "listProfilItem1");
  let img1 = document.createElement("img");
  img1.setAttribute("src", image);
  img1.setAttribute("class", "companyInfo");
  let link = document.createElement("a");
  link.setAttribute("href", link1);
  link.innerText = name;
  let listProfilItem2 = document.createElement("li");
  listProfilItem2.setAttribute("id", "listProfilItem2");
  let divPrice = document.createElement("div");
  divPrice.innerText = "stock price: " + price + "$";
  let changesP = document.createElement("div");
  changesP.setAttribute("id", "changesP");
  changesP.innerText = "" + percentage;
  colorPercent(percentage, changesP);
  let listProfilItem3 = document.createElement("li");
  let div2 = document.createElement("div");
  div2.innerText = description;
  div2.setAttribute("class", "companyInfo");
  listProfilItem1.appendChild(img1);
  listProfilItem1.appendChild(link);
  listProfilItem2.appendChild(divPrice);
  listProfilItem2.appendChild(changesP);
  listProfilItem3.appendChild(div2);
  companyProfil.appendChild(listProfilItem1);
  companyProfil.appendChild(listProfilItem2);
  companyProfil.appendChild(listProfilItem3);
}

function colorPercent(percentage, changesP) {
  if (percentage < 0) {
    changesP.setAttribute("class", "negative-percent");
  } else {
    changesP.setAttribute("class", "positive-percent");
  }
}

function historyOfStockPrice() {
  console.log(symbol);
  fetch(
    `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line`
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      for (let i = 0; i < data.historical.length && i < 4000; i += 250) {
        let dates = data.historical[i].date;
        let change = data.historical[i].close;
        xlabels.push(dates);
        ychange.push(parseFloat(change));
      }
      console.log(xlabels);
      console.log(ychange);
    });
}
historyOfStockPrice();

let ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: xlabels,
    datasets: [
      {
        label: "Stock Price History",
        data: ychange,
        backgroundColor: "rgb(255, 0, 255)",
        borderColor: "rgb(255, 0, 255)",
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            max: 60,
            min: 0,
            stepSize: 10
          }
        }
      ]
    }
  }
});
