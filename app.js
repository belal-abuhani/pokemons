

// store the seen & caught from local storge
let seen_caught = {
    caughtNum: JSON.parse(localStorage.getItem("seen_caught")) ? JSON.parse(localStorage.getItem("seen_caught")).caughtNum : 0,

    seenNum: JSON.parse(localStorage.getItem("seen_caught")) ? JSON.parse(localStorage.getItem("seen_caught")).seenNum : 0
}

// define variables using  querySelector to select dom
let pokes = document.querySelector(".pokes");
let details = document.querySelector(".details");
let caught = document.querySelector(".caughtNum");
let seen = document.querySelector(".seenNum");

// displaying the seen &caught num 
caught.innerHTML = seen_caught.caughtNum || 0
seen.innerHTML = seen_caught.seenNum || 0


// to store pokes after fetching them 
let pokemonsObj = [];

// this function to fetch pokes depends on poke ID and the user input how many pokes to fetch
const getPokes = (name) => {

    let num = document.querySelector(".num");

    // some edges when the user put num
    if (num.value <= 0) alert("you should put num ")
    if (num.value > 50) alert("its will take some seconds")


    let pokes = [];
    // this loop for itrating  on IDs and make requests and push to pokes array
    for (let i = 1; i <= num.value; i++) {
        url = `https://pokeapi.co/api/v2/pokemon/${i} `
        pokes.push(
            fetch(url)
                .then(res => res.json())
        )
    }

    // clear  the input value
    num.value = null

    // promising all requests and storing needed data
    Promise.all(pokes)
        .then(pokemons => {
            pokemonsObj = pokemons.map(poke => {
                return {
                    name: poke.name,
                    id: poke.id,
                    image: poke.sprites.front_default,
                    types: poke.types.map(type => type.type.name),
                    stats: poke.stats

                }
            })

            // sending the pokes (array of objs) to  displayPokes function
            displayPokes(pokemonsObj)
        })
}




// this function display the pokes (array of objs)  inside the (contaenier div ) 
const displayPokes = (pokemons) => {

    // this to check if argument is array of objs or single one (from (getNameAPI function ) )
    if (Array.isArray(pokemons)) {

        // this to display poke like a card 
        displayPokemons = pokemons.map(poke => {

            return `
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
        })

        // put all pokes after displaying inside html
        pokes.innerHTML = displayPokemons.join("")

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
            url = `https://pokeapi.co/api/v2/pokemon/${poke} `
            getSeens.push(
                fetch(url)
                    .then(res => res.json())
            )
        }

        Promise.all(getSeens)

            .then(pokemons => {
                pokemonsObj = pokemons.map(poke => {
                    return {
                        name: poke.name,
                        id: poke.id,
                        image: poke.sprites.front_default,
                        types: poke.types.map(type => type.type.name),
                        stats: poke.stats

                    }
                })

                // sending the pokes (array of objs) to  displayPokes function
                displayPokes(pokemonsObj)

            })




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
            url = `https://pokeapi.co/api/v2/pokemon/${poke} `
            getCaughs.push(
                fetch(url)
                    .then(res => res.json())
            )
        }

        Promise.all(getCaughs)

            .then(pokemons => {
                pokemonsObj = pokemons.map(poke => {
                    return {
                        name: poke.name,
                        id: poke.id,
                        image: poke.sprites.front_default,
                        types: poke.types.map(type => type.type.name),
                        stats: poke.stats

                    }
                })

                // sending the pokes (array of objs) to  displayPokes function
                displayPokes(pokemonsObj)

            })

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
    let serchByName = pokemonsObj.filter(poke => poke.name.includes(name.value))
    console.log(serchByName)

    // sending the pokes (array of objs) to  displayPokes function after filtring
    displayPokes(serchByName)

}

// this function to serch depends on name using api then displaying poke 
getNameAPI = () => {

    let name = document.querySelector(".nameAPI");
    // check if the input is empty
    if (name.value == "") return alert("put name")

    url = `https://pokeapi.co/api/v2/pokemon/${name.value} `
    fetch(url)
        .then(res => res.json())
        .then(poke => {
            pokemonsObj.push({
                name: poke.name,
                id: poke.id,
                image: poke.sprites.front_default,
                types: poke.types.map(type => type.type.name),
                stats: poke.stats

            })
            displayPokes({
                name: poke.name,
                id: poke.id,
                image: poke.sprites.front_default,
                types: poke.types.map(type => type.type.name),
                stats: poke.stats

            })
        })
        .catch(err => {
            alert("dose not find")
        })

    // cleat the input value
    name.value = ""
}



// this function to sort pokes alphabetical 
const sortPokes = (pokemonsObjs) => {

    // some check with alert
    if (pokemonsObjs.length < 2) return alert("you should display more than 1 pokemons first")
    if (pokemonsObjs.length > 30) alert("it will take some seconds")

    // this loop to itarate and check the sort
    let len = pokemonsObj.length - 1
    for (let i = 0; i < len; i++) {

        // check the chars of the two names until become differnt
        let first = sec = 0;
        while (pokemonsObj[i].name[first] == pokemonsObj[i + 1].name[sec]) {
            console.log(pokemonsObj[i].name[first], pokemonsObj[i + 1].name[sec], first, sec)
            first++
            sec++

        }

        // then do the comparesion
        if (pokemonsObj[i + 1].name[sec] < pokemonsObj[i].name[first]) {
            [pokemonsObj[i], pokemonsObj[i + 1]] = [pokemonsObj[i + 1], pokemonsObj[i]]
            i = -1

        }
    }

    displayPokes(pokemonsObjs)
}


// this to add the event when cick on sort btn
let sortBtn = document.querySelector(".sort")
sortBtn.addEventListener("click", () => {
    console.log("asd")
    sortPokes(pokemonsObj)
})

// this for popUP details when click on eye icon 
const displayDetalis = (id) => {

    // finding the poke depends on ID that sends when click on eye icon
    pokeomn = pokemonsObj.find((poke => poke.id == id))
    let stats = pokeomn.stats.map(stat => (

        `     
        <li>
        <p>${stat.stat.name}</p>
        <div class="progress-bar">
            <div class="progress-track">
            <div class="progress-fill" style="width:${stat.base_stat}%">
                <span>${stat.base_stat}%</span>
            </div>
            </div>
        </div>

        </li>
        `
    )).join("")

    let types = pokeomn.types.map(type => (

        `
          <li>
          ${type}
          </li>
        `
    )).join("")

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
                   ${stats}
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
        seen_caught[pokeomn.name] = { seen: true, caught: false }
        seen_caught.seenNum++
        seen.innerHTML = seen_caught.seenNum
        document.querySelector(`#${pokeomn.name}`).querySelector(".eye").style.color = "green"
    } else {
        seen_caught[pokeomn.name]["seen"] = true
        seen_caught.seenNum++
        seen.innerHTML = seen_caught.seenNum
        document.querySelector(`#${pokeomn.name}`).querySelector(".eye").style.color = "green"
    }
    localStorage.setItem("seen_caught", JSON.stringify(seen_caught));
}


// this function to add poke to local storge when click on catch icon 

caughtPoke = (id) => {
    pokeomn = pokemonsObj.find((poke => poke.id == id))

    if (seen_caught[pokeomn["name"]] == undefined) {
        seen_caught[pokeomn["name"]] = { seen: false, caught: true }
        seen_caught.caughtNum++
        caught.innerHTML = seen_caught.caughtNum
        document.querySelector(`#${pokeomn["name"]}`).querySelector(".check").style.color = "green"
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

