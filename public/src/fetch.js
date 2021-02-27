

const storData = () => {

    fetch("/test")
        .then(res => res.json())
        .then(pokemons => {
            console.log(pokemons)

            pokemonsObj = pokemons.map(poke => {
                return {
                    name: poke.name.english,
                    id: poke.id,
                    image: poke.image,
                    types: poke.type,
                    stats: poke.base

                }
            })
            getPokes()
        })
}

let start = 0
const getPokes = (name) => {

    // // some edges when the user put num
    // if (num.value <= 0) alert("you should put num ")
    // if (num.value > 50) alert("its will take some seconds")

    if (pokemonsObj.length > start) {
        displayPokes(pokemonsObj.slice(start, start + 15))
        start += 15
    }
}

window.addEventListener("scroll", () => {
    if (window.scrollY + window.innerHeight < document.documentElement.scrollHeight) {
        getPokes()
    }
})