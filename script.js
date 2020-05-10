let searchBtn = document.getElementById("searchBtn");
let urlParams = new URLSearchParams(window.location.search);
let symbol = urlParams.get("symbol");
searchBtn.addEventListener("click", callServer);
searchInput = document.getElementById("searchInput");
let loader = document.getElementById("loader-2");
let listCompany = document.getElementById("results");
// let marquee = document.getElementById("marquee");
listCompany.innerText = "";
let arraySymbol = [];
let arrayName = [];
// MILESTONE 3

async function callServer() {
  listCompany.innerHTML = "";
  loader.classList.toggle("hide-elements", false);
  loader.classList.toggle("spinner-border", true);
  let fetchedStocks = [];
  await fetch(
    "https://financialmodelingprep.com/api/v3/search?query=" +
      searchInput.value +
      "&limit=10&exchange=NASDAQ"
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      return (fetchedStocks = data);
    });
  console.log(fetchedStocks);
  fetchedStocks.map(async company => {
    company.profile = [];
    await fetch(
      `https://financialmodelingprep.com/api/v3/company/profile/${company.symbol}`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        company.profile = data.profile;
        return company.profile;
      })
      .then(a => {
        console.log(company.profile);
        let createProfile;
        if (company.profile.changesPercentage.charAt(1) == "+") {
          createProfile = `<li> <img src= ${company.profile.image} alt=''><a href="./company.html?symbol= ${company.symbol}">${company.name}</a>${company.symbol} <span class="positive-percent">${company.profile.changesPercentage}</span></li>`;
        } else if (company.profile.changesPercentage.charAt(1) == "-") {
          createProfile = `<li> <img src= ${company.profile.image} alt=''><a href="./company.html?symbol= ${company.symbol}">${company.name}</a>${company.symbol} <span class="negative-percent">${company.profile.changesPercentage}</span></li>`;
        } else {
          createProfile = `<li> <img src= ${company.profile.image} alt=''><a href="./company.html?symbol= ${company.symbol}">${company.name}</a>${company.symbol} <span>${company.profile.changesPercentage}</span></li>`;
        }
        listCompany.innerHTML += createProfile;
      });
    loader.classList.toggle("hide-elements", true);
    loader.classList.toggle("spinner-border", false);
  });
}

// function createMarquee() {
//   let companyPrice = [];
//   fetch(`https://financialmodelingprep.com/api/v3/company/stock/list`)
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       companyPrice = data;
//       return companyPrice;
//     });
// }
// .then(b => {
//   for (i = 0; i < companyPrice.symbolsList.length && i < 100; i++) {
//     let stockPrice = `${companyPrice.symbolsList[i].symbol} <span class="positive-percent">    ${companyPrice.symbolsList[i].price}   </span>  <i class="fas fa-hand-holding-usd"></i>    `;
//     marquee.innerHTML += stockPrice;
//   }
// });
// .then(c => {
//   let companySymbol = [];
//   for (i = 0; i < companyPrice.symbolsList.length; i++) {
//     companySymbol.push(companyPrice.symbolsList[i].symbol);
//   }

//   $(function() {
//     companySymbol.sort();
//     $("#searchInput").autocomplete({
//       source: companySymbol
//     });
//   });
// });
// }
// createMarquee();

// MILESTONE 1
// function callServer() {
//   loader.classList.toggle("hide-elements", false);
//   loader.classList.toggle("spinner-border", true);
//   fetch(
//     "https://financialmodelingprep.com/api/v3/search?query=" +
//       searchInput.value +
//       "&limit=10&exchange=NASDAQ"
//   )
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       $("li").remove();
//       for (let i = 0; i < data.length - 1; i++) {
//         createElements(data[i], i);
//       }
//       loader.classList.toggle("hide-elements", true);
//       loader.classList.toggle("spinner-border", false);
//     });
// }

// function createElements(element, index) {
//   let name = element.name;
//   let symbol = element.symbol;
//   let listItem = document.createElement("li");
//   listItem.setAttribute("id", `${index} ${name}`);
//   let link1 = document.createElement("a");
//   link1.innerText = name;
//   link1.setAttribute("class", "allLink");
//   link1.setAttribute("href", "/company.html?symbol=" + symbol);
//   let link2 = document.createElement("a");
//   link2.innerText = " (" + symbol + ")";
//   link2.setAttribute("class", "allLink");
//   link2.setAttribute("href", "./company.html?symbol=" + symbol);
//   listItem.appendChild(link1);
//   listItem.appendChild(link2);
//   listCompany.appendChild(listItem);
// }
