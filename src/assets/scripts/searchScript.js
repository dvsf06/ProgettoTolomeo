var resp;
var songToAddToPlaylist;
var searchQ;
var fromPHP;

async function searchClick(query, isFromPHP) {
    searchQ = query;
    fromPHP = isFromPHP;
    if(!isFromPHP){
        resp = await makeRequest("shared/actions/dataSource.php?search=1", document.getElementById("searchInput").value);
    }
    else{
        resp = await makeRequest("shared/actions/dataSource.php?search=1", query);
    }
    document.getElementById("risBrani").innerHTML = "";
    console.log(resp);

    document.getElementById("tableHeader").innerHTML = '<tr><th>Img</th><th>Titolo</th><th>Artista</th><th>Durata</th><th>Disponibile</th><th>Aggiungi</th></tr>';
    resp["items"].forEach(element => {
        if(element["downloaded"]){
            uriElement = encodeURIComponent(JSON.stringify(element));
            document.getElementById("risBrani").innerHTML += '<tr><td><img style="width: 50px;" src="' + element["album"]["images"][0]["url"] + '"></td><td>' + element["name"] + '</td><td>' + element["artists"][0]["name"] + '</td><td>' + millisToMinutesAndSeconds(element["duration_ms"]) + '</td><td><button class="btn btn-primary btn-play-song" onclick="playTrack(\''+ uriElement + '\')"><i class="bi bi-play-fill"></i></button></td><td><button class="btn btn-success btn-search-secondary" onclick="addToPlaylistClick(\'' + uriElement + '\')"><i class="bi bi-plus-circle-fill"></i></button></td></tr>';
        }
        else{
            uriElement = encodeURIComponent(JSON.stringify(element));
            document.getElementById("risBrani").innerHTML += '<tr><td><img style="width: 50px;" src="' + element["album"]["images"][0]["url"] + '"></td><td>' + element["name"] + '</td><td>' + element["artists"][0]["name"] + '</td><td>' + millisToMinutesAndSeconds(element["duration_ms"]) + '</td><td colspan="2"><button class="btn btn-success btn-search-secondary" onclick="downloadClick(\'' + uriElement + '\')"><i class="bi-cloud-download"></i></button></td></tr>';
        }
        console.log(element["downloaded"]);
    });
}

async function downloadClick(element){
    var respDl = await makeDownloadRequest("shared/actions/dataSource.php?download=1", decodeURIComponent(element));
    console.log("DL_RESP=" + respDl);
    searchClick(searchQ, fromPHP);
}

async function makeRequest(url, param){
    if(param == ""){
        return "{}";
    }
    urlFull = url + '&titolo=' + param;
    const response = await fetch(urlFull);
    const data = await response.json();
    return data;
}

async function makeDownloadRequest(url, song){
    urlFull = url + '&song=' + song;
    const response = await fetch(urlFull);
    const data = await response.text();
    return data;
}

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

async function addToPlaylistClick(element){
    var track = decodeURIComponent(element);
    songToAddToPlaylist = JSON.parse(track);
    playlists = await makePlaylistRequest("shared/actions/dataSource.php?getUserPlaylists=1", getCookie("idUtente"));

    document.getElementById("tableHeader").innerHTML = '<tr><th>Img</th><th>Nome</th><th></th></tr>';
    document.getElementById("risBrani").innerHTML = "";
    playlists.forEach(element => {
        document.getElementById("risBrani").innerHTML += '<tr><td><img style="width: 50px;" src="' + element["coverImage"] + '"></td><td>' + element["nome"] + '</td><td colspan="2"><button class="btn btn-success btn-search-secondary" onclick="playlistSelectClick(\'' + element["idPlaylist"] + '\')"><i class="bi bi-plus-circle-fill"></i></button></td></tr>';
    });
}

async function playlistSelectClick(idPlaylist){
    var branoId = songToAddToPlaylist["dbId"];
    console.log(branoId);
    var response = await makeAddToPlaylistRequest("shared/actions/dataSource.php?addToPlaylist=1", idPlaylist, branoId);
    console.log(response);
    searchClick(searchQ, fromPHP);
}

async function makeAddToPlaylistRequest(url, idPlaylist, idBrano){
    urlFull = url + "&idPlaylist=" + idPlaylist + "&idBrano=" + idBrano;
    const response = await fetch(urlFull);
    const data = await response.text();
    return data;
}

async function makePlaylistRequest(url, userId){
    urlFull = url + "&userId=" + userId;
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

function playTrack(element){
    var track = decodeURIComponent(element);
    trackObj = JSON.parse(track);
    audioPath = trackObj["audioPath"];
    coverLink = trackObj["coverImage"];
    audio = document.querySelector("audio");
    var coverContainer = document.getElementById("coverContainer");
    var nameContainer = document.getElementById("trackNameContainer");
    var artistContainer = document.getElementById("artistNameContainer");
    nameContainer.innerText = trackObj["name"];
    artistContainer.innerText = trackObj["artists"][0]["name"];
    coverContainer.src = coverLink;
    audio.src = "../" + audioPath;
    playState="pause";
    audio.play();
}