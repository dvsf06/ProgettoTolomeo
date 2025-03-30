var resp;
var playerPointer = 0;

window.onload = async() => {
    resp = await makeRequest("shared/actions/dataSource.php?getPlaylistTracks=1", currPlaylist);
    document.getElementById("risBrani").innerHTML = "";
    console.log(resp);

    resp.forEach(element => {
        uriElement = encodeURIComponent(JSON.stringify(element));
        document.getElementById("risBrani").innerHTML += '<tr><td><img style="width: 50px;" src="' + element.coverImage + '"></td><td>' + element.titolo + '</td><td>' + element.nomeArtista + '</td><td>' + millisToMinutesAndSeconds(element.durata) + '</td><td><button class="btn btn-primary" onclick="playTrack(\''+ uriElement + '\')">Play icon</button></td></tr>';
        console.log(element["downloaded"]);
    });
}

async function makeRequest(url, param){
    urlFull = url + '&playlistId=' + param;
    const response = await fetch(urlFull);
    const data = await response.json();
    return data;
}

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function playTrack(element){
    var track = decodeURIComponent(element);
    var trackObj = JSON.parse(track);
    audioPath = trackObj["percorsoFile"];
    coverLink = trackObj["coverImage"];
    audio = document.querySelector("audio");
    var coverContainer = document.getElementById("coverContainer");
    var nameContainer = document.getElementById("trackNameContainer");
    var artistContainer = document.getElementById("artistNameContainer");
    nameContainer.innerText = trackObj.titolo;
    artistContainer.innerText = trackObj.nomeArtista;
    coverContainer.src = coverLink;
    audio.src = "../" + audioPath;
    playState="pause";
    audio.play();
}

function playPlaylist(){
    playerPointer = 0;
    var trackObj = resp[0];
    audio = document.querySelector("audio");
    audio.src = "../" + trackObj.percorsoFile;
    coverLink = trackObj["coverImage"];
    var coverContainer = document.getElementById("coverContainer");
    var nameContainer = document.getElementById("trackNameContainer");
    var artistContainer = document.getElementById("artistNameContainer");
    nameContainer.innerText = trackObj.titolo;
    artistContainer.innerText = trackObj.nomeArtista;
    coverContainer.src = coverLink;
    playState="pause";

    setCookie("playerPointer", playerPointer);
    setCookie("playlist", JSON.stringify(resp));

    audio.play();
}

function setCookie(name,value) {
    document.cookie = name + "=" + (value || "");
}