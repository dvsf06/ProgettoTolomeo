window.onload = async () => {
    idUtente = 8;
    var resp = await makeRequest("shared/actions/dataSource.php?getUserPlaylists=1", idUtente);
    console.log(resp);

    if(resp.length == 0){
        document.getElementById("mainContainer").innerHTML = "<p>No items</p>";
    }
    else{
        content = '<h1 class="mainTitle" style="text-align: center;">Le tue playlist</h1><div class="row g-1 justify-content-evenly">';
        resp.forEach(element => {
            content += '<div class="col-lg-3 col-md-6 col-sm-6"><div class="p-3"><div class="card" style="max-width: 200px !important; margin: 0 auto !important;"><img src="https://placehold.co/100" class="card-img-top"><div class="card-body"><h5 class="card-title">' + element.nome + '</h5><p class="card-text">Author</p><a class="btn btn-primary">Apri playlist</a></div></div></div></div>';
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