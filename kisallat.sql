CREATE DATABASE kisallat;

USE kisallat;

CREATE TABLE pet(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(30) UNIQUE NOT NULL,
    leiras VARCHAR(100) NOT NULL,
    ar INT NOT NULL,
    raktaron INT NOT NULL,
    kep VARCHAR(100)
);

INSERT INTO pet (nev, leiras, ar, raktaron, kep) VALUES 
("Hörcsögök", "Ez meg rágcsálók", 10500, 5, "./pictures/horcsog.jpg"),
("Tengeri malacok", "Tengeri röfik", 6300, 8, "./pictures/tmalac.jpg"),
("Madárpókok", "Veszélyes madárpókok", 80000, 3, "./pictures/madarpok.jpg"),
("Aranyhalak", "Szép aranyhalak", 3500, 1, "./pictures/aranyhal.jpg");