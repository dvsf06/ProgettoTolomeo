CREATE DATABASE IF NOT EXISTS dbForseSpotify;
USE dbForseSpotify;

CREATE TABLE tblUtenti (
    idUtente INTEGER PRIMARY KEY AUTO_INCREMENT,
    username CHAR(50) NOT NULL,
    email VARCHAR(320) NOT NULL,
    passwordHash CHAR(64) NOT NULL
);

CREATE TABLE tblPlaylists (
    idPlaylist INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome CHAR(50) NOT NULL,
    utenteId INTEGER NOT NULL,
    FOREIGN KEY (utenteId) REFERENCES tblUtenti(idUtente)
);

CREATE TABLE tblArtisti (
    idArtista INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome CHAR(50) NOT NULL
);

CREATE TABLE tblBrani (
    idBrano INTEGER PRIMARY KEY AUTO_INCREMENT,
    titolo CHAR(50) NOT NULL,
    durata INTEGER NOT NULL,
    percorsoFile CHAR(100) NOT NULL,
    artistaId INTEGER NOT NULL,
    FOREIGN KEY (artistaId) REFERENCES tblArtisti(idArtista)
);

CREATE TABLE tblBraniPlaylist (
    idBranoPlaylist INTEGER PRIMARY KEY AUTO_INCREMENT,
    branoId INTEGER NOT NULL,
    playlistId INTEGER NOT NULL,
    FOREIGN KEY (branoId) REFERENCES tblBrani(idBrano),
    FOREIGN KEY (playlistId) REFERENCES tblPlaylists(idPlaylist)
)