let loader = document.getElementById("loader-2");

class SearchResult {
  constructor(parent) {
    this.parent = parent;
  }

  renderResults(companies) {
    loader.classList.toggle("hide-elements", false);
    loader.classList.toggle("spinner-border", true);
    companies.map(company => {
      let companyArray = companies[company];
      console.log(companyArray);
      this.getStockValue(company.symbol).then(companyInfo => {
        let { image, companyName, changesPercentage } = companyInfo.profile;
        let companyLogo = this.getLogo(image);
        let link = this.getLink(companyInfo.symbol, companyName);
        let symbolCompany = this.getSymbolCompany(companyInfo.symbol);
        let percentage = this.getPercentage(changesPercentage);
        let list = document.createElement("li");
        let button = document.createElement("button");
        button.addEventListener("click", this.compare);
        button.setAttribute("id", company.symbol);
        button.setAttribute("class", "btnCompare");
        button.innerHTML = "Compare";
        list.appendChild(companyLogo);
        list.appendChild(link);
        list.appendChild(symbolCompany);
        list.appendChild(percentage);
        list.appendChild(button);
        this.parent.appendChild(list);
      });
    });
    loader.classList.toggle("hide-elements", true);
    loader.classList.toggle("spinner-border", false);
  }
  async compare(e) {
    const response = await fetch(
      `https://financialmodelingprep.com/api/v3/company/profile/${e.target.id}`
    );
    const dataCompany = await response.json();
    console.log(dataCompany);
  }
  async getStockValue(symbol) {
    const response = await fetch(
      `https://financialmodelingprep.com/api/v3/company/profile/${symbol}`
    );
    const dataCompany = await response.json();
    return dataCompany;
  }
  getLogo(image) {
    let companyLogo = document.createElement("img");
    companyLogo.src = image;
    return companyLogo;
  }

  getLink(symbol, companyName) {
    let link = document.createElement("a");
    link.href = `./company.html?symbol=${symbol}`;
    let companyLower = companyName.toLowerCase();
    let searchInputLower = searchInput.value.toLowerCase();
    if (companyLower.indexOf(searchInputLower) !== -1) {
      let same = companyLower.indexOf(searchInputLower);
      let inputLength = searchInput.value.length;
      let newStr = companyName.substring(same, same + inputLength);
      let name = companyName;
      let newName = name.replace(
        newStr,
        "<span style='background-color: yellow;'>" + newStr + "</span>"
      );
      link.innerHTML = newName;
    } else {
      link.innerHTML = companyName;
    }
    return link;
  }

  getSymbolCompany(symbol) {
    let symbolCompany = document.createElement("span");
    symbolCompany.innerHTML = `${symbol}`;
    symbolCompany.classList = "symbol-company";
    let symbolLower = `${symbol}`.toLowerCase();
    let searchInputLower = searchInput.value.toLowerCase();
    if (symbolLower.indexOf(searchInputLower) !== -1) {
      let same = symbolLower.indexOf(searchInputLower);
      let inputLength = searchInput.value.length;
      let newStr = `${symbol}`.substring(same, same + inputLength);
      let symb = `${symbol}`;
      let newsymbol = symb.replace(
        newStr,
        "<span style='background-color: yellow;'>" + newStr + "</span>"
      );
      symbolCompany.innerHTML = newsymbol;
    } else {
      symbolCompany.innerHTML = `${symbol}`;
    }
    return symbolCompany;
  }

  getPercentage(changesPercentage) {
    let percentage = document.createElement("span");
    percentage.innerHTML = changesPercentage;
    if (changesPercentage.charAt(1) == "+") {
      percentage.classList = "positive-percent";
    } else {
      percentage.classList = "negative-percent";
    }
    return percentage;
  }
}
