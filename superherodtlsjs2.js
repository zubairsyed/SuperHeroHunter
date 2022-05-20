// div id collector variables
var container = document.getElementById('main-container');
var div1=document.getElementById('div1');
var PrsnlDtls=document.getElementById('Prsnl-dtls');
var Biography=document.getElementById('biography');
var powerstats=document.getElementById('powerstats');
var div2 = document.getElementById('div2');
var imge = document.getElementById("imge");


// to fetch the API data suing id from present url.

function retrive(ShId) {
    fetch('https://www.superheroapi.com/api.php/1358348604650444/'+ShId)
        .then(function (e) {
            return e.json();
        })
        .then(function (data) {
            console.log("data", data);
            // console.log(data.image.url);
            PrintResults(data);
            return data;
        })
}




// when website loads on the exact moment storing the id from url in Shid varibale

window.onload = function(){
    let winurl = window.location.href;
    console.log(winurl);
    let ShId = winurl.substring(winurl.lastIndexOf('=') + 1);
    console.log(ShId);
    retrive(ShId);
}


// now printing the dtaa on dom.
function PrintResults(data) {
    console.log(data.image.url);
    imge.src = data.image.url;
    ul1 = document.createElement('ul');
    ul1.innerHTML = `
                        <h1>${data.name}</h1>
                        <p><strong>Gender : </strong>${data.appearance.gender}</p>
                        <p><strong>Height : </strong>${data.appearance.height}</p>
                        <p><strong>Hair-Color : </strong>${data['appearance']['hair-color']}</p>
                        <p><strong>Weight : </strong>${data.appearance.weight}</p>
                        <p><strong>Race : </strong>${data["appearance"]["race"]}</p>
                        <p><strong>Eye-Color : </strong>${data["appearance"]["eye-color"]}</p>
                        `
    PrsnlDtls.appendChild(ul1);

    ul2 = document.createElement('ul');
    ul2.innerHTML = `
                        <p><strong>Aliases : </strong>[${data["biography"]["aliases"].slice(0,10)}]</p>
                        <p><strong>Alignment : </strong>${data.biography.alignment}</p>
                        <p><strong>Alter-Egos : </strong>${data["biography"]["alter-egos"]}</p>
                        <p><strong>First-Appearance : </strong>${data["biography"]["first-appearance"].slice(0,10)}</p>
                        <p><strong>Full-Name : </strong>${data["biography"]["full-name"]}</p>
                        <p><strong>Place-Of-Birth: </strong>${data["biography"]["place-of-birth"]}</p>
                        <p><strong>Publisher: </strong>${data["biography"]["publisher"]}</p>
                        `
    Biography.appendChild(ul2);

    ul3 = document.createElement('ul');
    ul3.innerHTML = `
                        <p><strong>combat : &emsp;&emsp;</strong>${data.powerstats.combat}</p>
                        <p><strong>durability : &emsp;</strong>${data.powerstats.durability}</p>
                        <p><strong>intelligence : &emsp;</strong>${data["powerstats"]["intelligence"]}</p>
                        <p><strong>power : &emsp;&emsp;&emsp;</strong>${data["powerstats"]["power"]}</p>
                        <p><strong>speed : &emsp;&emsp;&emsp;</strong>${data["powerstats"]["speed"]}</p>
                        <p><strong>strength: &emsp;&emsp;</strong>${data["powerstats"]["strength"]}</p>
                        <p><strong>strength: &emsp;</strong>${data["work"]["occupation"]}</p>
                       `
    powerstats.appendChild(ul3);
}



