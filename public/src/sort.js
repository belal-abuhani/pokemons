// this function to sort pokes alphabetical 
const sortPokes = () => {

    // some check with alert
    // if (pokemons.length < 2) return alert("you should display more than 1 pokemons first")
    // if (pokemons.length > 30) alert("it will take some seconds")

    // this loop to itarate and check the sort
    // let len = start - 1
    // for (let i = 0; i < len; i++) {

    //     // check the chars of the two names until become differnt
    //     let first = sec = 0;
    //     while (pokemonsObj[i].name[first] == pokemonsObj[i + 1].name[sec]) {
    //         console.log(pokemonsObj[i].name[first], pokemonsObj[i + 1].name[sec], first, sec)
    //         first++
    //         sec++

    //     }

    //     // then do the comparesion
    //     if (pokemonsObj[i + 1].name[sec] < pokemonsObj[i].name[first]) {
    //         [pokemonsObj[i], pokemonsObj[i + 1]] = [pokemonsObj[i + 1], pokemonsObj[i]]
    //         i = -1

    //     }
    // }
    sorted = pokemonsObj.slice(0, start)
    sorted.sort((a, b) => {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    displayPokes(sorted, true)
}