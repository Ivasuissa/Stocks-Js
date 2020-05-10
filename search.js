class Form {
  constructor(parent) {
    this.parent = parent;
    this.createForm();
  }

  async createForm() {
    const search = document.createElement("input");
    search.setAttribute("id", "searchInput");
    search.setAttribute("class", "form-control");
    search.setAttribute("type", "text");
    search.setAttribute("placeholder", "Search");
    search.setAttribute("arial-label", "Search");
    const buttonS = document.createElement("button");
    buttonS.setAttribute("id", "searchBtn");
    const icon = document.createElement("i");
    icon.setAttribute("class", "fas fa-search-dollar");
    buttonS.appendChild(icon);
    this.parent.append(search);
    this.parent.append(buttonS);
  }
  
  async onSearch(){
    if (inputSearch.value === ""){
      searchBtn.addEventListener("click",this.handleSearchInput);
    }
    document.getElementById("results").innerText = "";
    const response = await fetch   ("https://financialmodelingprep.com/api/v3/search?query=" +
    searchInput.value +
    "&limit=10&exchange=NASDAQ");
    const companiesData = await response.json();
    return companiesData;
}

handleSearchInput() {
  const result = newSearchResult(document.getElementById ('results'));
  Form.prototype.onSearch().then((companies) => {
    result.renderResults(companies)
  })

}
}

const searchBar = document.getElementById("searchB", searchInput);
// const form = new Form(searchBar);
// form.createForm()




