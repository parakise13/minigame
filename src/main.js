// Fetch the items from the JSON file
function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTRMLString(item)).join("");
}

// Create HTML list item from the given data item
function createHTRMLString(item) {
  return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item_thumbnail" />
        <span class="item_description">${item.gender}, ${item.size}</span>
    </li>`;
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return; // null 이면 return으로 함수를 끝내는 것
  }

  displayItems(items.filter((item) => item[key] === value));
}

function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", () => onButtonClick(event, items));
}

// main
loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .cath(console.log);
