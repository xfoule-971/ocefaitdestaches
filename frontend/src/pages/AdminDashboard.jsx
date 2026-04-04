import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import AdminHeroCard from "../components/AdminHeroCard";
import AdminCard from "../components/AdminCard";

import { Palette,Layers, Brush, Tag } from "lucide-react";

const AdminDashboard = () => {
    
    const navigate = useNavigate();

    // CHECK LOGIN
    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/admin/login");
        }

    }, [navigate]);

    const modules = [

        {
            icone: Palette,
            titre: "œuvres",
            path: "/admin/oeuvres"
        },
        {
            icone: Layers,
            titre: "collections",
            path: "/admin/collections",
        },
        {
            icone: Brush,
            titre: "techniques",
            path: "/admin/techniques"
        },
        {
            icone: Tag,
            titre: "Status",
            path: "/admin/status"
        }

    ];

    return (

        <>
            <Helmet>

                <title>Tableau de bord || ocefaitdestaches</title>

                {/*La description aux moteurs de recherche*/}
                <meta name="description" content="Votre artiste-peintre 2.0." />

                {/*Empêcher l'indexation de la page*/}
                <meta name="robots" content="noindex, nofollow" />

            </Helmet>
            
           <AdminHeroCard 
                titre1="Bienvenue Océane Foule" 
                titre2="Votre tableau de bord"
                showDashboardLink={false}
            />

           
            <main className="container my-5">

                <div className="row jusitfy-content-center g-4">
                    
                    {modules.map((item, idx) => (

                        <div 
                            key={idx}
                            className="col-12 col-sm-6 col-lg-3"
                        >
                            <AdminCard
                                icone={item.icone}
                                titre={item.titre}
                                path={item.path}
                            />
                        </div>

                    ))}
                    
                </div>
                

            </main>

        </>

    );

};

export default AdminDashboard;