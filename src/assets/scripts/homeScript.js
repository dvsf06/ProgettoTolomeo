window.onload = async () => {
    idUtente = getCookie("idUtente");
    console.log("Utente loggato: " + idUtente);
    var resp = await makeRequest("shared/actions/dataSource.php?getUserPlaylists=1", idUtente);
    console.log(resp);

    if(resp.length == 0){
        document.getElementById("mainContainer").innerHTML = "";
    }
    else{
        content = '<h1 class="mainTitle" style="text-align: center;">Suggeriti</h1><div class="row g-1 justify-content-evenly">';
        resp.forEach(element => {
            content += '<div class="col-lg-3 col-md-6 col-sm-6"><div class="p-3"><div class="card playlist-card" style="max-width: 200px !important; margin: 0 auto !important;"><img src="' + element.coverImage + '" class="card-img-top"><div class="card-body"><h5 class="card-title">' + element.nome + '</h5><p class="card-text">Author</p><a class="btn btn-open-playlist" href="dettaglioPlaylist.php?id=' + element.idPlaylist + '&nome=' + element.nome + '">Apri playlist</a></div></div></div></div>';
        });
        content += '</div>';
        document.getElementById("mainContainer").innerHTML = content;

    }
}

async function makeRequest(url, param){
    urlFull = url + '&userId=' + param;
    const response = await fetch(urlFull);
    const data = await response.json();
    return data;
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}