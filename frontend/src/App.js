import { useState } from "react";

import { Routes, Route } from "react-router-dom";

import Accueil from "./pages/Accueil";

import Navigation from "./components/Navigation";

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
                
                
            </Routes>

        </div>

    );
    
};

export default App;