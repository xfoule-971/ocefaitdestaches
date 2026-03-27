import { useState } from "react";

import { Routes, Route } from "react-router-dom";

import Accueil from "./pages/Accueil";
import Galerie from "./pages/Galerie";
import Collection from "./pages/Collection";
import Technique from "./pages/Technique";
import Status from "./pages/Status";
import Annee from "./pages/Annee"
import Toile from "./pages/Toile";
import Artiste from "./pages/Artiste";
import Prestations from "./pages/Prestations";
import Contact from "./pages/Contact";

import Erreur from "./pages/Erreur";

import Mentions from "./pages/Mentions";
import Politique from "./pages/Politique";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const App = () => {

    const [searchTerm, setSearchTerm] = useState("");

    return (
        
        <div>
            
            <Navigation 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <Routes>

                {/* Pages visiteurs */}
                <Route path="/" element={<Accueil />} />
                <Route path="/galerie" element={<Galerie />} />
                <Route path="/collection/:id" element={<Collection />} />
                <Route path="/oeuvre/:id" element={<Toile />}/>
                <Route path="/technique/:id" element={<Technique />}/>
                <Route path="/status/:id" element={<Status />}/>
                <Route path="/archives/:annee" element={<Annee />}/>
                <Route path="/artiste" element={<Artiste />}/>
                <Route path="/prestations" element={<Prestations />}/>
                <Route path="/contact" element={<Contact />}/>
                
                {/* Erreur système */}
                <Route path="*" element={<Erreur />} />
                
                {/* Pages infos légales */}
                <Route path="/mentions-legales" element={<Mentions />} />
                <Route path="/politique-confidentialite" element={<Politique />} />
            </Routes>

            <Footer />
        </div>

    );
    
};

export default App;