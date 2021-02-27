
let seen_caught = {
    caughtNum: JSON.parse(localStorage.getItem("seen_caught")) ? JSON.parse(localStorage.getItem("seen_caught")).caughtNum : 0,

    seenNum: JSON.parse(localStorage.getItem("seen_caught")) ? JSON.parse(localStorage.getItem("seen_caught")).seenNum : 0
}

let pokes = document.querySelector(".pokes");
let details = document.querySelector(".details");
let caught = document.querySelector(".caughtNum");
let seen = document.querySelector(".seenNum");
let num = document.querySelector(".num");

caught.innerHTML = seen_caught.caughtNum || 0
seen.innerHTML = seen_caught.seenNum || 0

// to store pokes after fetching them 
let pokemonsObj = [];