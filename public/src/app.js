

// this function display the pokes (array of objs)  inside the (contaenier div ) 
const displayPokes = (pokemons, is = false) => {

    // this to check if argument is array of objs or single one (from (getNameAPI function ) )
    if (Array.isArray(pokemons)) {

        // this to display poke like a card 
        displayPokemons = pokemons.map(poke =>

            `
            <div class="card" id="${poke.name}">
                <div>
        
                    <div class ="imge">
                    <img src="${poke.image}" alt="${poke.name}">
                    </div>
        
                    <div class="icons">
                    <span  onclick ="displayDetalis(${poke.id})" class="fa fa-eye eye"></span>
                    <span onclick = "caughtPoke(${poke.id})" class="fa fa-check check"></span> 
                    </div>
                </div>
        
             <h3>${poke.name}</h3>
            </div>
        `
        )

        // put all pokes after displaying inside html
        if (is) {
            pokes.innerHTML = displayPokemons.join("")
        }
        else {
            pokes.innerHTML += displayPokemons.join("")

        }


    }

    // this eles if it single obj that comes from  (getNameAPI function )
    else {
        pokes.innerHTML = `

        <div class="card" id="${pokemons.name}">
            <div>
    
                <div class ="imge">
                <img src="${pokemons.image}" alt="${pokemons.name}">
                </div>
    
                <div class="icons">
                <span  onclick ="displayDetalis(${pokemons.id})" class="fa fa-eye eye"></span>
                <span onclick = "caughtPoke(${pokemons.id})" class="fa fa-check check"></span> 
                </div>
            </div>
    
         <h3>${pokemons.name}</h3>
        </div>
    `
    }


    // this to put green eye and check  by comparing the data stored in local storge 
    let storedSeen_caught = JSON.parse(localStorage.getItem("seen_caught"));
    for (poke in storedSeen_caught) {

        if (document.querySelector(`#${poke}`) != null && storedSeen_caught[poke].seen == true) {
            document.querySelector(`#${poke}`).querySelector(".eye").style.color = "green"

        }
        if (document.querySelector(`#${poke}`) != null && storedSeen_caught[poke].caught == true) {
            document.querySelector(`#${poke}`).querySelector(".check").style.color = "green"

        }
    }


}


// this function to display seen pokes when click on (seen span)
const getSeenPokes = () => {

    let getSeens = [];

    let storedSeen_caught = JSON.parse(localStorage.getItem("seen_caught"));
    if (storedSeen_caught["seenNum"] == 0) alert("u dont have seen pokes")

    // fetching them depnds on poke name 
    for (poke in storedSeen_caught) {
        if (storedSeen_caught[poke].seen == true && poke != "caughtNum" && poke != "seenNum") {
            getSeens.push(storedSeen_caught[poke])
        }
        // sending the pokes (array of objs) to  displayPokes function
        displayPokes(getSeens, true)
    }
}

// this function to display caught pokes when click on (caught span)
const getCaughtPokes = () => {
    let getCaughs = [];
    let storedSeen_caught = JSON.parse(localStorage.getItem("seen_caught"));
    if (storedSeen_caught["caughtNum"] == 0) alert("u dont have caught pokes")

    // this  to itartate pokes and fethcing them depends on name 
    for (poke in storedSeen_caught) {

        if (storedSeen_caught[poke].caught == true && poke != "caughtNum" && poke != "seenNum") {
            getCaughs.push(storedSeen_caught[poke])
        }

        // sending the pokes (array of objs) to  displayPokes function
        displayPokes(getCaughs, true)


    }

}




// this function to serch localy then displaying pokes 
getNameLocal = () => {
    let name = document.querySelector(".name");

    // if there no pokes that fethced 
    if (pokemonsObj.length == 0) {
        name.value = ""
        return alert("you should display  pokemons first")
    }
    // this filter func to filtring pokes depends on name 
    let serchByName = pokemonsObj.filter(poke => poke.name.toUpperCase().includes(name.value.toUpperCase()))
    // sending the pokes (array of objs) to  displayPokes function after filtring
    displayPokes(serchByName, true)

}




// this to add the event when cick on sort btn
let sortBtn = document.querySelector(".sort")
sortBtn.addEventListener("click", () => {
    sortPokes(pokemonsObj.slice(0,))
})

// this for popUP details when click on eye icon 
const displayDetalis = (id) => {

    // finding the poke depends on ID that sends when click on eye icon
    pokeomn = pokemonsObj.find((poke => poke.id == id))
    console.log(pokeomn, id)

    let stat = []
    for (type in pokeomn["stats"]) {

        stat.push(
            `     
        <li>
        <p>${type}</p>
        <div class="progress-bar">
            <div class="progress-track">
            <div class="progress-fill" style="width:${pokeomn["stats"][type]}%">
                <span>${pokeomn["stats"][type]}%</span>
            </div>
            </div>
        </div>

        </li>
        `
        )

        stat.join("")
    }



    let types = pokeomn.types.map(type =>

        `
          <li>
          ${type}
          </li>
        `
    ).join("")

    details.innerHTML =

        `
        <span class = "close"><i class="far fa-times-circle "> </i></span>
        <div class="name">

                <div class="imge">
                    <img src="${pokeomn.image}" alt="${pokeomn.name}">
                </div>
                <h3>${pokeomn.name}</h3>

            </div>
            <div class="types">
                <h3>types</h3>
                <ul>
                    ${types}
                </ul>
            </div>

            <div class="stats">
                <h3>stats</h3>
                <ul>
                   ${stat}
                </ul>

            </div>`

    // this  close icon 
    let close = document.querySelector(".close");
    details.style.display = "flex";
    details.style.visibility = "visible";

    // adding event on  close icon 
    close.addEventListener("click", function () {
        details.style.display = "none";
        details.style.visibility = "hidden";
    });

    // adding the poke to local storge when seeing it 
    if (seen_caught[pokeomn.name] == undefined) {
        console.log(pokeomn.name)
        seen_caught[pokeomn.name] = { ...pokeomn, seen: true, caught: false }
    } else {
        seen_caught[pokeomn.name]["seen"] = true
    }

    seen_caught.seenNum++
    seen.innerHTML = seen_caught.seenNum
    document.querySelector(`#${pokeomn.name}`).querySelector(".eye").style.color = "green"
    localStorage.setItem("seen_caught", JSON.stringify(seen_caught));
}


// this function to add poke to local storge when click on catch icon 

caughtPoke = (id) => {
    pokeomn = pokemonsObj.find((poke => poke.id == id))
    if (seen_caught[pokeomn.name] == undefined) {
        seen_caught[pokeomn.name] = { ...pokeomn, seen: false, caught: true }
        seen_caught.caughtNum++
        caught.innerHTML = seen_caught.caughtNum
        document.querySelector(`#${pokeomn.name}`).querySelector(".check").style.color = "green"
        alert(`${pokeomn.name} caught done`)

    }
    else {

        if (seen_caught[pokeomn["name"]]["caught"] == true) {
            seen_caught[pokeomn["name"]]["caught"] = false
            seen_caught.caughtNum--
            caught.innerHTML = seen_caught.caughtNum
            document.querySelector(`#${pokeomn["name"]}`).querySelector(".check").style.color = "black"
            alert(`${pokeomn.name} Uncaught done`)

        } else {
            seen_caught[pokeomn["name"]]["caught"] = true
            seen_caught.caughtNum++
            caught.innerHTML = seen_caught.caughtNum
            document.querySelector(`#${pokeomn["name"]}`).querySelector(".check").style.color = "green"
            alert(`${pokeomn.name} caught done`)

        }

    }

    localStorage.setItem("seen_caught", JSON.stringify(seen_caught));
}

