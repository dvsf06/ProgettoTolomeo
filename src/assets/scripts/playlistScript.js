var resp;
var playerPointer = 0;

window.onload = async() => {
    resp = await makeRequest("shared/actions/dataSource.php?getPlaylistTracks=1", currPlaylist);
    document.getElementById("risBrani").innerHTML = "";
    console.log(resp);

    resp.forEach(element => {
        uriElement = encodeURIComponent(JSON.stringify(element));
        document.getElementById("risBrani").innerHTML += '<tr><td><img style="width: 50px;" src="' + element.coverImage + '"></td><td>' + capitalizeFirstLetter(element.titolo) + '</td><td>' + element.nome + '</td><td class="col-durata">' + millisToMinutesAndSeconds(element.durata) + '</td><td><button class="btn btn-primary btn-play-song" onclick="playTrack(\''+ uriElement + '\')"><i class="bi bi-play-fill h4"></i></button></td></tr>';
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
    artistContainer.innerText = trackObj.nome;
    coverContainer.src = coverLink;
    audio.src = "../" + audioPath;
    playState="play";
    changePlayState();
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
    nameContainer.innerText = capitalizeFirstLetter(trackObj.titolo);
    artistContainer.innerText = trackObj.nome;
    coverContainer.src = coverLink;
    playState="play";
    changePlayState();

    setCookie("playerPointer", playerPointer);
    setSession("playlist", JSON.stringify(resp));

    audio.play();
}

function setCookie(name,value) {
    document.cookie = name + "=" + (value || "");
}

async function setSession(key, value){
    var r = await makeSetSessionRequest(key, value);
}

async function makeSetSessionRequest(key, value){
    url = 'shared/actions/sessionManagement.php';
    const response = await fetch(url,
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({"setSession": 1, "key": key, "value": value})
        })
    const data = await response.text();
    return data;
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}