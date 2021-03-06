

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
const getPokes = () => {
    var refr = 0
    num = Math.floor(Math.random() * 1000)
    random = pokemonsObj.slice(num, num + 15)
    displayPokes(random)
    if (refr != 0) {
        if (pokemonsObj.length > start) {
            displayPokes(pokemonsObj.slice(start, start + 15))
            start += 15
        }
    }

    refr++
}

window.addEventListener("scroll", () => {
    if (window.scrollY + window.innerHeight < document.documentElement.scrollHeight) {
        getPokes()
    }
})