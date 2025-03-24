var resp;

async function searchClick() {
    document.getElementById("risBrani").innerHTML = "";
    var resp = await makeRequest("shared/actions/dataSource.php?search=1", document.getElementById("searchInput").value);
    console.log(resp);

    resp["items"].forEach(element => {
        if(element["downloaded"]){
            document.getElementById("risBrani").innerHTML += '<tr><td><img style="width: 50px;" src="' + element["album"]["images"][0]["url"] + '"></td><td>' + element["name"] + '</td><td>' + element["artists"][0]["name"] + '</td><td>' + millisToMinutesAndSeconds(element["duration_ms"]) + '</td><td><button class="btn btn-primary">Play icon</button></td></tr>';
        }
        else{
            uriElement = encodeURIComponent(JSON.stringify(element));
            document.getElementById("risBrani").innerHTML += '<tr><td><img style="width: 50px;" src="' + element["album"]["images"][0]["url"] + '"></td><td>' + element["name"] + '</td><td>' + element["artists"][0]["name"] + '</td><td>' + millisToMinutesAndSeconds(element["duration_ms"]) + '</td><td><button class="btn btn-success" onclick="downloadClick(\'' + uriElement + '\')">Download</button></td></tr>';
        }
        console.log(element["downloaded"]);
    });
}

async function downloadClick(element){
    var respDl = await makeDownloadRequest("shared/actions/dataSource.php?download=1", decodeURIComponent(element));
    console.log(respDl);
}

async function makeRequest(url, param){
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