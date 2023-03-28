// I wish you good luck and happy coding 🥰🤠🥳🥳💯💯
// declare all the variables from html
const date = new Date().toLocaleTimeString("en-US", {
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});
const form_button = document.querySelector("#ewallet-form");
// add event listener to the form
form_button.addEventListener("submit", (e) => {
  e.preventDefault();
  const type = document.querySelector(".add__type").value;
  const description = document.querySelector(".add__description").value;
  const value = document.querySelector(".add__value").value;
  if (description && value.length > 0) {
    add_item(type, description, value);
    reset_form();
  }
});

// show items from local storage
showItems();
function showItems() {
  let items = getItemsfromLS();
  const collection = document.querySelector(".collection");
  for (let item of items) {
    const newHtml = `<div class="item">
   <div class="item-description-time">
  <div class="item-description">
    <p>${item.desc}</p>
  </div>
  <div class="item-time">
    <p>${item.time}</p>
  </div>
</div>
<div class="item-amount ${
      item.type === "+" ? "income-amount" : "expense-amount"
    }">
  <p>${item.type}$${item.value}</p>
</div>
</div>`;
    collection.insertAdjacentHTML("afterbegin", newHtml);
  }
}

// adding items to the list
add_item = (type, description, value) => {
  const newHtml = `<div class="item">
<div class="item-description-time">
  <div class="item-description">
    <p>${description}</p>
  </div>
  <div class="item-time">
    <p>${date}</p>
  </div>
</div>
<div class="item-amount ${type === "+" ? "income-amount" : "expense-amount"}">
  <p>${type}$${value}</p>
</div>
</div>`;
  const collection = document.querySelector(".collection");
  collection.insertAdjacentHTML("afterbegin", newHtml);
  addItemToLS(type, description, value, date);
  showTotalExpense();
  showTotalIncome();
  showTotalBalance();
};

// reset the form input fields
reset_form = () => {
  document.querySelector(".add__type").value = "+";
  document.querySelector(".add__description").value = "";
  document.querySelector(".add__value").value = "";
};

// get items from local storage

function getItemsfromLS() {
  let items = localStorage.getItem("items");

  if (items) {
    items = JSON.parse(items);
  } else {
    items = [];
  }

  return items;
}

function addItemToLS(type, desc, value, time) {
  let items = getItemsfromLS();
  items.push({ desc, time, type, value });

  localStorage.setItem("items", JSON.stringify(items));
}
showTotalBalance();
showTotalExpense();
showTotalIncome();
function showTotalIncome() {
  let items = getItemsfromLS();
  let totalIncome = 0;
  for (let item of items) {
    if (item.type === "+") {
      totalIncome += parseInt(item.value);
    }
    document.querySelector(".income__amount").textContent = "$" + totalIncome;
  }
}

function showTotalExpense() {
  let items = getItemsfromLS();
  let totalExpense = 0;
  for (let item of items) {
    if (item.type === "-") {
      totalExpense = parseInt(item.value);
    }
    document.querySelector(".expense__amount").textContent = "$" + totalExpense;
  }
}

function showTotalBalance() {
  let items = getItemsfromLS();
  let totalBalance = 0;
  for (let item of items) {
    if (item.type === "+") {
      totalBalance += parseInt(item.value);
    } else {
      totalBalance -= parseInt(item.value);
    }

    document.querySelector(".balance__amount").textContent = "$" + totalBalance;
  }
  document.querySelector("header").className =
    totalBalance >= 0 ? "green" : "red";
}

// I wish you good luck and happy coding 🥰🤠🥳🥳💯💯
