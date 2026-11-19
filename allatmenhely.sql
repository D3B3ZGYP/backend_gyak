CREATE DATABASE allatmenhely;

USE allatmenhely;

CREATE TABLE allat(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(30) NOT NULL,
    faj VARCHAR(60) NOT NULL,
    kor INT NOT NULL,
    nem VARCHAR(10) NOT NULL,
    orokbefogadhato BOOL NOT NULL,
    kep VARCHAR(100) NOT NULL
);

INSERT INTO allat (nev, faj, kor, nem, orokbefogadhato, kep) VALUES
('Bodri', 'kutya', 4, 'him', TRUE, './pictures/bodri.jpg'),
('Mici', 'macska', 2, 'nőstény', FALSE, './pictures/mici.jpg'),
('Jozsi', 'ember', 47, 'him', TRUE, './pictures/jozsi.jpg')