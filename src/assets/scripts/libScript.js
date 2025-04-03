const loadData = async () => {
    idUtente = getCookie("idUtente");
    var resp = await makeRequest("shared/actions/dataSource.php?getUserPlaylists=1", idUtente);

    if(resp.length == 0){
        content = '<h1 class="mainTitle" style="text-align: center;">Le tue playlist</h1><div class="row g-1 justify-content-evenly">';
        content += '<div class="col-lg-3 col-md-6 col-sm-6"><div class="p-3"><div class="card playlist-card" style="max-width: 200px !important; margin: 0 auto !important;"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX4nv7fdXLX8cvBQJY452jOmzzPEgW4yBGCw&s" class="card-img-top"><div class="card-body"><h5 class="card-title">Nuova playlists</h5><a href="newPlaylist.php" class="btn btn-primary">Crea una playlist</a></div></div></div></div>';
        content += '</div>';
        document.getElementById("mainContainer").innerHTML = content;
    }
    else{
        content = '<h1 class="mainTitle" style="text-align: center;">Le tue playlist</h1><div class="row g-1 justify-content-evenly">';
        resp.forEach(element => {
            content += '<div class="col-lg-3 col-md-6 col-sm-6"><div class="p-3"><div class="card playlist-card" style="max-width: 200px !important; margin: 0 auto !important;"><img src="' + element.coverImage + '" class="card-img-top"><div class="card-body"><h5 class="card-title">' + element.nome + '</h5><p class="card-text">Author</p><a class="btn btn-open-playlist" href="dettaglioPlaylist.php?id=' + element.idPlaylist + '&nome=' + element.nome + '">Apri playlist</a><button class="btn btn-delete-playlist" onclick="removePlaylist('+ element.idPlaylist + ')"><i class="bi bi-trash h5"></i></button></div></div></div></div>';
        });
        content += '<div class="col-lg-3 col-md-6 col-sm-6"><div class="p-3"><div class="card playlist-card" style="max-width: 200px !important; margin: 0 auto !important;"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX4nv7fdXLX8cvBQJY452jOmzzPEgW4yBGCw&s" class="card-img-top"><div class="card-body"><h5 class="card-title">Nuova playlists</h5><a href="newPlaylist.php" class="btn btn-primary">Crea una playlist</a></div></div></div></div>';
        content += '</div>';
        document.getElementById("mainContainer").innerHTML = content;
    }
}

window.onload = loadData;

async function removePlaylist(id){
    var r = await makeDeletePlaylistRequest(id);
    console.log("Delete: " + r);
    loadData();
}

async function makeRequest(url, param){
    urlFull = url + '&userId=' + param;
    const response = await fetch(urlFull);
    const data = await response.json();
    return data;
}

async function makeDeletePlaylistRequest(idPlaylist){
    url = 'shared/actions/dataSource.php?deletePlaylist=16&idPlaylist=' + idPlaylist;
    const response = await fetch(url);
    const data = await response.text();
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