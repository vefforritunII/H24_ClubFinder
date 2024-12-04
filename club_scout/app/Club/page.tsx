"use client";

import { useState, useEffect } from "react";
import { getAllClubsData } from "@/app/library/actions";
import memberOfClubs from "@/app/components/profileMemberClubs";
import styles from './club.module.css';

export default function Page() {
    const [clubs, setClubs] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 

    // Sækir klúbba frá API þegar síðan hleðst
    useEffect(() => {
        getAllClubsData().then((fetchedClubs) => {
            console.log("Nýlega sóttir klúbbar:", fetchedClubs);
            setClubs(fetchedClubs); // Uppfærir stöðugt ástand með klúbbum
        });
    }, []);

    // Filter fyrir clubs eftir flokk og leitarorði
    const filterClubs = (categoryName) => 
        clubs.filter(club => {
            const categories = Array.isArray(club.category) // Breytir 'category' í array ef nauðsynlegt og gerir samanburð auðveldari
                ? club.category.map(c => c.toLowerCase()) // Ef array, setur allt í lágstafi
                : club.category?.split(',').map(c => c.trim().toLowerCase()); // Ef strengur, splittar og hreinsar
            return categories?.includes(categoryName) && // checkar hvort flokkurinn passi og leitarorðið sé í nafninu
                club.name.toLowerCase().includes(searchTerm.toLowerCase());
        });

    // Renderar section (heiti, klúbbaflokkur)
    const renderClubSection = (title, categoryName) => (
        <>
            <h2>{title}</h2>
            <div className={styles.clubRow}>
                {filterClubs(categoryName).map(club => 
                    memberOfClubs(club.name, club.description, club.img, club.id) // Renderar klúbba
                )}
            </div>
        </>
    );

    return (
        <div>
            {/* Searchbar */}
            <input
                type="text"
                placeholder="Leita að klúbbum"
                onChange={(e) => setSearchTerm(e.target.value)} // update-ast leitarorð við innslátt
            />
            {/* Renderar flokka með flokkheitum og flokkanafni */}
            {renderClubSection("Íþróttaklúbbar", "sports")}
            {renderClubSection("Útiklúbbar", "outdoors")}
            {renderClubSection("Inniklúbbar", "indoors")}
        </div>
    );
}
