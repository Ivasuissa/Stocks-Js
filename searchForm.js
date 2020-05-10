class SearchForm {
  constructor(parent) {
    this.parent = parent;
    this.createForm();
  }

  async createForm() {
    const searchInput = document.createElement("input");
    searchInput.setAttribute("id", "searchInput");
    searchInput.classList.add("form-control");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("placeholder", "Search");
    searchInput.setAttribute("arial-label", "Search");

    const buttonS = document.createElement("button");
    buttonS.setAttribute("id", "searchBtn");
    const icon = document.createElement("i");
    icon.setAttribute("class", "fas fa-search-dollar");
    buttonS.appendChild(icon);

    const loader = document.createElement("loader");
    loader.classList.add("hide-elements");
    loader.setAttribute("id", "loader-2");
    loader.setAttribute("role", "status");
    const loading = document.createElement("span");
    loading.classList.add("sr-only");
    loading.textContent = "loading...";
    loader.appendChild(loading);

    this.parent.append(searchInput, buttonS, loader);
  }

  async onSearch() {
    if (searchInput.value === "") {
      searchBtn.addEventListener("click", this.SearchInputToResult);
    }
    document.getElementById("results").innerText = "";
    const response = await fetch(
      "https://financialmodelingprep.com/api/v3/search?query=" +
        searchInput.value +
        "&limit=10&exchange=NASDAQ"
    );
    const companiesData = await response.json();
    return companiesData;
  }

  SearchInputToResult() {
    const result = new SearchResult(document.getElementById("results"));
    SearchForm.prototype.onSearch().then(companies => {
      result.renderResults(companies);
      
    });
  }
}

// const searchBar = document.getElementById("form", searchInput);
// const form = new Form(searchBar);
// form.createForm()
