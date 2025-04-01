async function logoutClick(){
    var dt = await makeLogoutRequest();
    console.log(dt);
    window.location.replace("index.php");
}

async function makeLogoutRequest(){
    url = "shared/actions/userHandling.php?logout=1";
    const response = await fetch(url);
    const data = await response.text();
    return data;
}