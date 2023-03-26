// Fetch the items from the JSON file
function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector(".items");
  const html = items.map((item) => createHTMLString(item));
  container.innerHTML = html.join("");
}

// Create HTML list item from the given data item
function createHTMLString(item) {
  return `
    <li class="item" data-type="${item.type}" data-color="${item.color}">
      <img src="${item.image}" alt="${item.type}" class="item__thumnail" />
      <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
  `;
}

// Handle button click
function onButtonClick(event) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  // displayItems(items.filter((item) => item[key] === value));
  const items = document.querySelectorAll(".item");
  updateItems(items, key, value);
}

// Make the items matching {key: value} invisible.
function updateItems(items, key, value) {
  items.forEach((item) => {
    if (item.dataset[key] === value) {
      item.classList.remove("invisible");
    } else {
      item.classList.add("invisible");
    }
  });
}

function setEventListners(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", (event) => onButtonClick(event));
}

// main
loadItems()
  .then((items) => {
    displayItems(items);
    setEventListners(items);
  })
  .catch(console.log);
