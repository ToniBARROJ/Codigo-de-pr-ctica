let number = 1;
let container = null;
let business_printer = null;

function helloWorld() {
  document.getElementById("message").innerText = "Hello World!";
}

function byeWorld() {
  document.getElementById("message").innerText = "";
}

window.onload = function () {
  container = document.getElementById("container");
  business_printer = document.getElementById("business-printer");
  readDatabase();
};

function isContainerNull(container) {
  return container === null || container === undefined;
}

function readDatabase() {
  fetch("http://localhost:3000/items")
    .then((response) => response.json())
    .then((data) => {
      showBusinesses(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getElement(tagName, text) {
  const p = document.createElement(tagName);
  p.innerText = text;
  return p;
}

function showBusinesses(database) {
  /**
   * Obtenir container id="business-printer"
   * Per cada business dins BUSINESSES crea un element
   * que mostri nom i ciutat.
   */
  const nBusiness = database.length;

  for (let i = 0; i < nBusiness; i++) {
    const business = database[i];
    const divElement = document.createElement("div");
    divElement.id = business.id;
    divElement.classList.add(
      "block",
      "max-w-sm",
      "p-6",
      "bg-white",
      "border",
      "border-gray-200",
      "rounded-lg",
      "shadow",
      "dark:bg-gray-800",
      "dark:border-gray-700"
    );
    const nameElement = getElement("h5", business.name);
    nameElement.classList.add(
      "mb-2",
      "text-2xl",
      "font-bold",
      "tracking-tight",
      "text-gray-900",
      "dark:text-white"
    );
    const cityP = getElement(
      "p",
      business.city + ", " + business.state + "." + business.address
    );

    cityP.classList.add("font-normal", "text-gray-700", "dark:text-gray-400");
    divElement.appendChild(nameElement);
    divElement.appendChild(cityP);
    business_printer.appendChild(divElement);
    const employees = business.employees;

    // Create the wrapper div
    const wrapperDiv = document.createElement("div");
    wrapperDiv.classList.add("relative", "overflow-x-auto");

    // Create the table and its structure
    const table = document.createElement("table");
    table.classList.add(
      "w-full",
      "text-sm",
      "text-left",
      "rtl:text-right",
      "text-gray-500",
      "dark:text-gray-400"
    );

    // Create the thead
    const thead = document.createElement("thead");
    thead.classList.add(
      "text-xs",
      "text-gray-700",
      "uppercase",
      "bg-gray-50",
      "dark:bg-gray-700",
      "dark:text-gray-400"
    );

    const headerRow = document.createElement("tr");
    const headers = ["Name", "Position", "Salary"]; // Columns defined

    headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.setAttribute("scope", "col");
      th.classList.add("px-6", "py-3");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create the tbody
    const tbody = document.createElement("tbody");

    for (let j = 0; j < employees.length; j++) {
      const employee = employees[j];

      // Create a new row for each employee
      const row = document.createElement("tr");
      row.classList.add(
        "bg-white",
        "border-b",
        "dark:bg-gray-800",
        "dark:border-gray-700"
      );

      // Create the first cell (name)
      const nameCell = document.createElement("th");
      nameCell.setAttribute("scope", "row");
      nameCell.classList.add(
        "px-6",
        "py-4",
        "font-medium",
        "text-gray-900",
        "whitespace-nowrap",
        "dark:text-white"
      );
      nameCell.textContent = employee.name; // Assuming employee.name corresponds to Name

      // Create additional cells for position and salary
      const positionCell = document.createElement("td");
      positionCell.classList.add("px-6", "py-4");
      positionCell.textContent = employee.title; // Assuming employee.position corresponds to Position

      const salaryCell = document.createElement("td");
      salaryCell.classList.add("px-6", "py-4");
      salaryCell.textContent = employee.salary + "€"; // Assuming employee.salary corresponds to Salary

      // Append cells to the row
      row.appendChild(nameCell);
      row.appendChild(positionCell);
      row.appendChild(salaryCell);

      // Append the row to the tbody
      tbody.appendChild(row);
    }

    // Append tbody to the table
    table.appendChild(tbody);

    // Append the table to the wrapper div
    wrapperDiv.appendChild(table);

    // Append the wrapper div to the desired container (assuming divElement is the container)
    divElement.appendChild(wrapperDiv);
  }
}

function addWord() {
  if (isContainerNull(container)) {
    const newparagraph = document.createElement("p");
    newparagraph.innerText = "Hello World! " + number;
    container.appendChild(newparagraph);
    number++;
  }
  alert("Container not found");
  return;
}
