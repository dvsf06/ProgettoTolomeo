async function searchClick() {
    document.getElementById("risBrani").innerHTML = "";
    var resp = await makeRequest("shared/actions/dataSource.php?search=1", document.getElementById("searchInput").value);
    console.log(resp);

    resp["items"].forEach(element => {
        if(element["downloaded"]){
            document.getElementById("risBrani").innerHTML += '<p>' + element["name"] + '</p><br>';
        }
        else{
            document.getElementById("risBrani").innerHTML += '<button onclick="downloadClick(\'' + encodeURIComponent(JSON.stringify(element)) + '\')">' + element["name"] + '</button><br>';
        }
        console.log(element["downloaded"]);
    });
}

async function downloadClick(element){
    var resp = await makeDownloadRequest("shared/actions/dataSource.php?download=1", decodeURIComponent(element));
    console.log(resp);
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