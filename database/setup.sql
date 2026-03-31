-- 1. Création de la base de données
CREATE DATABASE IF NOT EXISTS paintoce_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE paintoce_db;

-- 2. Table des Collections (Parent)
CREATE TABLE IF NOT EXISTS collections (

    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    slogan VARCHAR(255),
    image_presentation VARCHAR(255)

)

-- 3. Table des Techniques (Parent)
CREATE TABLE IF NOT EXISTS techniques (

    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL

)

-- 4. Table des Statuts (Parent)
CREATE TABLE IF NOT EXISTS statuts (

    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL

)

-- 5. Table des Oeuvres (Table principale avec clés étrangères)
CREATE TABLE IF NOT EXISTS oeuvres (

    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(100) NOT NULL,
    annee INT NOT NULL,
    description TEXT,
    nom_fichier VARCHAR(255) NOT NULL,
    collection_id INT,
    technique_id INT,
    statut_id INT,
    top3 TINYINT(1) DEFAULT 0,
    CONSTRAINT fk_oeuvre_collection FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE SET NULL,
    CONSTRAINT fk_oeuvre_technique FOREIGN KEY (technique_id) REFERENCES techniques(id) ON DELETE SET NULL,
    CONSTRAINT fk_oeuvre_statut FOREIGN KEY (statut_id) REFERENCES statuts(id) ON DELETE SET NULL

)

-- 6. Table Administrateur
CREATE TABLE IF NOT EXISTS administrateurs (

    id INT AUTO_INCREMENT PRIMARY KEY,
    identifiant VARCHAR(50) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL
    
)

-- 7. CREATION UTILISATEUR RESTREINT
CREATE USER IF NOT EXISTS 'oceane971'@'localhost' IDENTIFIED BY '@15dec2006';
GRANT SELECT, INSERT, UPDATE, DELETE ON `paintoce_db`.* TO 'oceane971'@'localhost';
FLUSH PRIVILEGES;

-- ==========================================================
-- INSERTIONS DES DONNÉES
-- ==========================================================

-- Insertion des Techniques
INSERT INTO techniques (nom) VALUES 
('Acrylique sur toile'),
('Technique mixte'),
('Gouache'),
('Aérosol & Acrylique'),
('Huile sur toile');

-- Insertion des Statuts
INSERT INTO statuts (nom) VALUES 
('Disponible'), 
('Vendu'), 
('Collection privée');

-- Insertion des Collections
INSERT INTO collections (nom, slogan, image_presentation) VALUES 
('Portraits & Âmes', 'L''expression du regard et de l''identité', 'Muse.jpg'),
('Nature & Horizons', 'Textures et couleurs du monde', 'Citronnade.jpg'),
('Abstractions', 'Exploration des formes et des émotions', 'Solitude.jpg'),
('Urban Vibes', 'L''énergie de la rue sur toile', 'Graphart.jpg');

-- Insertion de toutes les Oeuvres (20 images au total)
INSERT INTO oeuvres (titre, annee, description, nom_fichier, collection_id, technique_id, statut_id, top3) VALUES 
-- Série 1
("L'Eveil des Agrumes", 2026, 'Composition vive aux agrumes et feuillage vert', 'Citronnade.jpg', 2, 5, 1, 1),
('Muse Stellaire', 2025, 'Portrait de profil aux tons dorés et fond étoilé', 'Muse.jpg', 1, 5, 2, 1),
('La Matadore', 2026, 'Femme à la coiffe traditionnelle en madras', 'Matadore.jpg', 1, 1, 1),
('Guérrière créole', 2025, 'Silhouette texturée sur fond abstrait vert d''eau', 'Solitude.jpg', 3, 2, 1, 1),
("Force d'Ebène", 2025, "Portrait d'un homme sur halo lumineux bleu", 'Pop.jpg', 1, 1, 3, 0),
('Case créole', 2025, 'Scène de vie devant une architecture traditionnelle rose', 'Case.jpg', 2, 1, 1, 0),
('Eclat Maternel', 2025, 'Portrait chaleureux aux tresses et bijoux dorés', 'Mom.jpg', 1, 1, 3, 0),
("L'Âme Azur", 2025, 'Visage bleu intense sur fond jaune contrasté', 'Naavi.jpg', 1, 1, 1, 0),
('Ballet Bleue', 2025, 'Deux carpes koï nageant dans un tourbillon bleu profond', 'Ocean.jpg', 2, 3, 1, 0),
('Souveraine Créole', 2025, 'Buste doré sculptural sur fond noir profond', 'Creole.jpg', 1, 2, 1, 0),

-- Série 2
('Kalinagoo', 2024, 'Labyrinthe aux lignes bleues géométriques et fond gris', 'Kalinago.jpg', 3, 1, 1, 0),
('Afro-Génération', 2024, 'Portrait pop-art coloré sur fond jaune graffiti', 'Coiffure.jpg', 1, 2, 1, 0),
("L'hibiscus d'Or", 2024, 'Fleur tropicale éclatante en gros plan', 'Hibis.jpg', 2, 1, 1, 0),
('En-trou-ée', 2024, 'Silhouette noire mystique sur fond coloré abstrait', 'En-trou-ee.jpg', 3, 1, 1, 0),
('Puzzle Chromatique', 2024, 'Mélange de couleurs fluides et organiques', 'Gouache.jpg', 3, 3, 1, 0),
("L'heure Bleue", 2024, 'Rivage paisible avec hamac et palmiers', 'Cocotiers.jpg', 2, 1, 1, 0),
('Maré Tèt', 2023, 'Profil minimaliste avec coiffe verte et or', 'Doudou.jpg', 1, 1, 1, 0),
('Fragmentations', 2023, 'Carrés de motifs abstraits et graphiques', 'Popart.jpg', 3, 2, 1, 0),
('Aura Sonore', 2023, 'Graffiti Music aux tons violets et bleus', 'Graphart.jpg', 4, 4, 1, 0),
('Essence obscure', 2023, 'Lettrage Soul stylisé sur fond sombre texturé', 'Essart.jpg', 4, 4, 1, 0);

-- ==========================================================
-- REQUETES SQL
-- ==========================================================

-- Récupérer toutes les oeuvres avec details
SELECT o.titre, o.annee, o.description, o.nom_fichier, 
       c.nom AS collection, t.nom AS technique, s.nom AS statut
FROM oeuvres o
LEFT JOIN collections c ON o.collection_id = c.id
LEFT JOIN techniques t ON o.technique_id = t.id
LEFT JOIN statuts s ON o.statut_id = s.id
ORDER BY o.annee DESC;

-- le top 3 pour changer en 1 (car 0 par default)
UPDATE oeuvres
SET top3 = 1
WHERE id = x;(id œuvre choisie)

-- filtrer par collection
SELECT * FROM oeuvres
WHERE collection_id

-- Afficher les collections pour le menu de navigation
SELECT nom, slogan, image_presentation 
FROM Collections

-- Espace admin
INSERT INTO oeuvres (titre, annee, description, nom_fichier, nom_fichier, collection_id, technique_id, statut_id)
