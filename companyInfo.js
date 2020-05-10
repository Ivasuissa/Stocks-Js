class CompanyInfo {
  constructor(parent, symbol) {
    this.parent = parent;
    this.symbol = symbol;
  }

  load() {
    fetch(
      `https://financialmodelingprep.com/api/v3/company/profile/${this.symbol}`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data;
      });
  }
  createElement2() {
      let {
        image,
        companyName,
        description,
        website,
        price,
        percentage
      } = data.profile;
    let img1 = this.getLogo(data.profile.image);
    let link = this.getLink(website, companyName);
    let price1 = this.getPrice(price);
    let changesP = this.getPercentage(percentage);
    let div2 = this.getDescription(description);
    let companyProfil = document.createElement("ul");
    companyProfil.setAttribute("id", "companyProfil");
    let listProfilItem1 = document.createElement("li");
    listProfilItem1.setAttribute("id", "listProfilItem1");
    let listProfilItem2 = document.createElement("li");
    listProfilItem2.setAttribute("id", "listProfilItem2");
    let listProfilItem3 = document.createElement("li");
    listProfilItem1.appendChild(img1);
    listProfilItem1.appendChild(link);
    listProfilItem2.appendChild(price1);
    listProfilItem2.appendChild(changesP);
    listProfilItem3.appendChild(div2);
    companyProfil.appendChild(listProfilItem1);
    companyProfil.appendChild(listProfilItem2);
    companyProfil.appendChild(listProfilItem3);
    this.parent.appendChild(companyProfil);
  }
  getLogo(image) {
    let img1 = document.createElement("img");
    img1.setAttribute("class", "companyInfo");
    img1.src = image;
    return img1;
  }

  getLink(website, companyName) {
    let link = document.createElement("a");
    link.href = website;
    link.innerText = companyName;
    return link;
  }

  getPrice(price) {
    let price1 = document.createElement("div");
    divPrice1.innerText = "stock price: " + price + "$";
    return price1;
  }

  getPercentage(percentage) {
    let changesP = document.createElement("div");
    changesP.setAttribute("id", "changesP");
    changesP.innerText = "" + percentage;
    colorPercent(percentage, changesP);
    return changesP;
  }
  getDescription(description) {
    let div2 = document.createElement("div");
    div2.innerText = description;
    div2.setAttribute("class", "companyInfo");
    return div2;
  }
}

//   addChart(){

//   }
