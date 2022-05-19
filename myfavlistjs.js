// id of 2 div list super hero
var shcontainer = document.getElementById('list-sprhro');
console.log(shcontainer);

// function to display data
async function display(data) {
    console.log(data);
    let div1 = document.createElement('div');
    div1.setAttribute('id', `${data.id}`);
    div1.className = 'childsh';
    div1.innerHTML = `<img src="${data.image.url}">
            <div><h3>${data.name}</h3><h3>Intelligence : ${data.powerstats.intelligence}</h3></div>
            `;
    let removeHero = document.createElement('button');
    removeHero.className = 'remove-fav';
    let textNode = document.createTextNode("Remove");
    removeHero.appendChild(textNode);
    removeHero.addEventListener('click', removerFromList);
    div1.appendChild(removeHero);
    shcontainer.appendChild(div1);
    console.log(div1);
}

// function to extract data from url using fetch method
async function Extract() {
    let heroloop = favourites();
    for (let i = 0; i < heroloop.length; i++){
        // console.log(heroloop[i]);
        // console.log('https://www.superheroapi.com/api.php/1358348604650444/' + heroloop[i]);
        fetch('https://www.superheroapi.com/api.php/1358348604650444/' + heroloop[i])
            .then(function (e) {
                return e.json();
            })
            .then(function (data) {
                // console.log(data);
                display(data);
                return data;
            })
    }
}

Extract();

// checking in local storage
function favourites() {
    let hero;
    if (localStorage.getItem('FavouriteHeros') === null) {
        hero = [];
        // console.log(hero);
    }
    else {
        hero = JSON.parse(localStorage.getItem('FavouriteHeros'));
    }
    return hero;
    
}

// removing the id from local storage as well as from dom
async function removerFromList(e) {
    let id = e.target.parentElement.id;
    console.log(id);
    let herof = favourites();
    // if the filter array is not equal to id then return
    let updatedFavs = herof.filter(function (val) {
        return val != id;
    })

    // removing from dom
    localStorage.setItem('FavouriteHeros', JSON.stringify(updatedFavs));
    let heros = document.getElementsByClassName('childsh');
    for (let i = 0; i < herof.length; i++){
        if (heros[i].id == id) {
            shcontainer.removeChild(heros[i]);
            console.log("removed!!", heros[i], id);
            break;
        }
    }

}