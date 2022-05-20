// id of input element
var inp = document.getElementById("input-mid");
// id of adding-content id
var AddingContent = document.getElementById("adding-content");


// for viewing hero page
function ViewHero(li){
    // console.log(li);
    var element = li.getElementsByTagName('h1')[0];
    // console.log("element",element);
    element.addEventListener('click',function(e){
        // console.log(e.target.id);
        // console.log(window.location.pathname+"/superherodtls.html#id="+e.target.id);
        let way1=`${window.location.pathname} + /../superherodtls2.html#id=${e.target.id}`;
        // console.log("viewhero****************",way1);
        window.open(way1);
    });
}

// creating each element name image like button list

function display(data, searchText, lclstrg) {
    // console.log('lclstrg***********', lclstrg);
    // console.log("under display111111",data);
    // console.log(searchText);
    // var datares=data.results;
    // console.log("data.results ",datares);
    // console.log("data.name ",data.name,counter++);
    // console.log("searchText.length ",searchText.length);
    // console.log("mai hoon re edawada",data.results[0].name.slice(0,searchText.length));
    
    // if(searchText)
            li=document.createElement("li");
            li.className="list-item";
            li.setAttribute("id",data.id);
            // console.log(li);
            // <i class="lni lni-heart-filled"></i>
            li.innerHTML = `<h1 id=${data.id}>${data.name}</h1>
                            <img src="${data.image.url}" id=${data.id}>`;
            favbutton = document.createElement("i");
            favbutton.className = "fa fa-heart";
            favbutton.setAttribute('id', data.id);
            li.append(favbutton);
            
            // adding fav button event listener
            favbutton.addEventListener('click',function (e){
                let id = e.target.id;
                let chngcolor = e.target;
                
                // creating empty array 
                let favchk = frvtHeros();
                console.log('sssssfavchk', favchk);
                if (!favchk.includes(id)) {
                    chngcolor.style.color = "red";
                    favchk.push(id);  
                }
                else {
                    alert('already added to Favs!!')
                    
                }
        // local storage consists the values in key-value pair
        // values are always stored in the form of strings
        // we have the favchk(in the form of array) that created in
        // frvtHeros(); function.
        // so to store the array in the form of sting 
        // using JSON.stringify
        localStorage.setItem('FavouriteHeros', JSON.stringify(favchk));
        console.log(id);
        
    })
    
    // console.log(i);
    li.append(favbutton);
            AddingContent.append(li);
            ViewHero(li,data);
            return;
}


// to check the local storage has hero id's or not
function frvtHeros(){
    let hero;
    if (localStorage.getItem('FavouriteHeros') === null) {
        hero = [];
        console.log("no heros ", hero);
    }
    else {
        hero = JSON.parse(localStorage.getItem('FavouriteHeros'));
        console.log(hero);
    }
    return hero;
}



// console.log(li);

// iterating over each element in a loop
function ExtractNames(data, searchText) {
    let lclstrg = frvtHeros();
    console.log("searchText",searchText);
    // now looping over the id's of each and every 
    for(let i=0;i<data.results.length;i++){
        // console.log("searchtext",searchText.toUpperCase());
        // console.log((data.results[i].name).slice(0,searchText.length).toUpperCase() == searchText.toUpperCase());
        if((data.results[i].name).slice(0,searchText.length).toUpperCase() == searchText.toUpperCase()){
            display(data.results[i], searchText,lclstrg);
        }
        
    }
    return; 
}



// here async is used to clear list automatically.It makes the function on hold till the user enter some text in input-box.
function searchSuperHero(searchText,KCode1) {
    // console.log(searchText,typeof(KCode1));
    // entering the text 
    if (searchText.length > 0) {
        console.log('https://www.superheroapi.com/api.php/1358348604650444/search/' + searchText);
            // fetching the API objects with promises 1st .then is used to retrive data in from of JSON 2nd to retrive actual data
         fetch('https://www.superheroapi.com/api.php/1358348604650444/search/'+searchText)
            .then(function (response) {
                return response.json();
            })
             .then(function (data) {
                
                console.log(data);
                // if we press enter where length of textt must be > 5 the very first super hero will be displayed
                if (KCode1 == 13 && searchText.length >= 5) {
                    // window.location.pathname retrives the current url path now adding the 
                    // extra elements of url to fetch id
                    let path = `${window.location.pathname} + /../superherodtls2.html#id=${data.results[0].id}`;
                    // trigger the windows.open to open path
                    window.open(path);
                } 
                // if the resonse is success the html parent div element must be empty 
            // other wise the list gets repeated
                if (data.response === 'success') {
                    AddingContent.innerHTML = "";
                // calling fun extract names
                    ExtractNames(data, searchText);
                }
                return data;
        })
    }
    // if no text is present
        else {
            AddingContent.innerHTML = "";
    }

    AddingContent.innerHTML = "";
    return;
}


// fetched the elements where ever is clicked on document
// console.log('https://www.superheroapi.com/api.php/3383566708344630/search/' + searchText);

// document.addEventListener('click',function(e){
//         var heart1=e.target;
//         // console.log(heart1);
//         var pointer = e.target.id;
//         if(pointer == 'heart'){
//             heart1.style.color="red";
//         } else {
//             heart1.style.color = 'black';
//         }
//         // console.log(pointer);
// });






// **************************************************

// on clicking the input function is invoked and searchSuperHero is called
inp.addEventListener('keyup', function (e) {
    searchSuperHero(e.target.value,e.keyCode);
});