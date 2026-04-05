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

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOeuvres from "./pages/AdminOeuvres";
import AdminCollections from "./pages/AdminCollections";
import AdminTechniques from "./pages/AdminTechniques";
import AdminStatus from "./pages/AdminStatus";

import Erreur from "./pages/Erreur";

import Mentions from "./pages/Mentions";
import Politique from "./pages/Politique";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import RequireAuth from "./components/RequireAuth";

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
                <Route path="/collection" element={<Collection />} />
                <Route path="/oeuvre/:id" element={<Toile />}/>
                <Route path="/technique" element={<Technique />}/>
                <Route path="/status" element={<Status />}/>
                <Route path="/annee" element={<Annee />}/>
                <Route path="/artiste" element={<Artiste />}/>
                <Route path="/prestations" element={<Prestations />}/>
                <Route path="/contact" element={<Contact />}/>

                {/* Pages administrateurs */}
                <Route path="/admin/login" element={<AdminLogin />}/>
                <Route path="/admin/dashboard" element={
                    <RequireAuth>
                        <AdminDashboard />
                    </RequireAuth> 
                }/>
                <Route path="/admin/oeuvres" element={
                    <RequireAuth>
                        <AdminOeuvres /> 
                    </RequireAuth>
                }/>
                <Route path="/admin/collections" element={
                    <RequireAuth>
                        <AdminCollections />
                    </RequireAuth> 
                }/>
                <Route path="/admin/techniques" element={
                    <RequireAuth>
                        <AdminTechniques />
                    </RequireAuth> 
                }/>
                <Route path="/admin/Status" element={
                    <RequireAuth>
                        <AdminStatus /> 
                    </RequireAuth>
                }/>
                
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