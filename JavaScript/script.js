function helloWorld () {
    document.getElementById("message").innerText = "Hello World!";
    }

function byeWorld () {
    document.getElementById("message").innerText = "";
}

let number = 1;

const container = document.getElementById("container");

function addHello () {
    const newparagraph = document.createElement("p");
    newparagraph.innerText = "Hello World! " + number;
    container.appendChild(newparagraph);
    number++;
}