async function creaClick(){
    const idUtente = getCookie("idUtente");
    const nomePlaylist = document.getElementById("nameInput").value;
    var params = [nomePlaylist, idUtente];
    var resp = await makeRequest("shared/actions/dataSource.php?createPlaylist=1", params);
    console.log(resp);
    window.location.replace("libreria.php");
}

async function makeRequest(url, params){
    urlFull = url + '&name=' + params[0] + '&idUser=' + params[1];
    const response = await fetch(urlFull);
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