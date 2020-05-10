class Result {
  constructor(parent) {
    this.parent = parent;
  }

  renderResults(companies){
    companies.map(company => {
      this.getStockValue(company.symbol).then((companyInfo) => {
        let {image, companyName, changesPercentage} = companyInfo.profile;
        let companyLogo = this.setCompanyLogo(image);
        let link = this.setLink(companyInfo.symbol, companyName);
        let symbolCompany = this.setSymbolCompany(companyInfo.symbol);
        let percentage = this.setPercentage(changesPercentage);

        let list = document.createElement("li");
        list.className = "list-style";
        list.appendChild(companyLogo);
        list.appendChild(link);
        list.appendChild(symbolCompany);
        list.appendChild(percentage);
        this.parent.appendChild(list);
      
      })
    })
  }

async getStockValue(symbol){
  const response =   await fetch (`https://financialmodelingprep.com/api/v3/company/profile/${symbol}` );
  const dataCompany = await response.json();
  return dataCompany;
}

setCompanyLogo(logo) {
  let companyLogo = document.createElement("img");
  companyLogo.src = `${company.profile.image}`
}

setLink(symbol, companyName){
  let link = document.createElement("a");
  link.href= `./company.html?symbol=${symbol}`;
  link.innerHTML = companyName;
  return link
}

setSymbolCompant(symbol){
  let symbolCompany = document.createElement('span');
  symbolCompany.innerHTML = '(${symbol})';
  symbolCompany.classList = "symbol-company";
  return symbolCompany;
}
setPercentage(changesPercentage){
  let percentage = document.createElement("span");
  percentage.innerHTML = changesPercentage;
  this.setPErcentageColor(changesPercentage, percentage);
  return Percentage;
}
// set PercentageColor(changesPErcentage, percentage){
//   if (changesPercentage !== null )
// }



//   async createResult() {
//     const resultFetchData = await this.fetchResultData();
//     console.log(resultFetchData);
//     const fetchedProfil = await this.fetchProfilData();
//     console.log(fetchedProfil);
//     for (
//       let i = 0;
//       i < resultFetchData.length && i < fetchedProfil.length;
//       i++
//     ) {
//       let profilcomp = `${resultFetchData[i].symbol} <span class="positive-percent">
//        ${resultProfilData[i].price}   </span>  <i class="fas fa-hand-holding-usd"></i>    `;
//       console.log(profilcomp);
//       this.parent.append(profilcomp);
//     }
//   }

//   async fetchProfilData() {
//     const fetchedDataResult = await this.fetchResultData();
//     for (let i = 0; i < fetchedDataResult.length; i++) {
//       const fetchedProfil = await fetch(
//         `https://financialmodelingprep.com/api/v3/company/profile/${fetchedDataResult[i].symbol}`
//       ).then(response => {
//         return response.json();
//       });
//       return fetchedProfil;
//     }
//   }

// }

const result = document.getElementById("listComapny");
new Result(result);

