<nav class="navbar fixed-top navbar-expand-md z-10">
    <div class="container-fluid">
        <a class="navbar-brand" href="home.php">
            <img src="assets/images/logoNoText.png" height="38px">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContents" aria-controls="#navbarContents" aria-expanded="false">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarContents">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">        
                    <a class="nav-link" href="account.php">Account</a>
                </li>
                <li class="nav-item">        
                    <a class="nav-link" href="libreria.php">Libreria</a>
                </li>
            </ul>
            <form class="d-flex" role="search" action="search.php" method="GET">
                <input class="form-control me-2" type="search" name="searchQuery" placeholder="Cerca">
                <button class="btn btn-success" type="submit">Cerca</button>
            </form>
        </div>       
    </div>
</nav>