"use client";

import { useState, useEffect } from "react";
import { getAllClubsData } from "@/app/library/actions";
import memberOfClubs from "@/app/components/profileMemberClubs";
import styles from './club.module.css';

export default function Page() {
    const [clubs, setClubs] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [clubs, setClubs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Sækir klúbba frá API þegar síðan hleðst
    useEffect(() => {
        getAllClubsData().then((fetchedClubs) => {
            console.log("Nýlega sóttir klúbbar:", fetchedClubs);
            setClubs(fetchedClubs); // Uppfærir stöðugt ástand með klúbbum
            console.log("Fetched Clubs:", fetchedClubs);
            setClubs(fetchedClubs);
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
    const normalizeCategory = (club, categoryName) => {
        if (Array.isArray(club.category)) {
            return club.category.map(c => c.toLowerCase()).includes(categoryName);
        } else if (typeof club.category === 'string') {
            return club.category.split(',').map(c => c.trim().toLowerCase()).includes(categoryName);
        }
        return false;
    };

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
 

    // Dynamically group clubs by their category
    const categories = ['Sports', 'Outdoors', 'Indoors']; // Add any other categories you want
    const categorizedClubs = categories.reduce((acc, category) => {
        acc[category] = clubs.filter(club => normalizeCategory(club, category.toLowerCase()));
        return acc;
    }, {});

    return (
        <div>
            {/* Searchbar */}
            {/* Search bar */}
            <input
                type="text"
                placeholder="Leita að klúbbum"
                onChange={(e) => setSearchTerm(e.target.value)} // update-ast leitarorð við innslátt
            />
            {/* Renderar flokka með flokkheitum og flokkanafni */}
            {renderClubSection("Sport clubs", "1")}
            {renderClubSection("Outdoors", "outdoors")}
            {renderClubSection("Inndoors", "indoors")}
                placeholder="Search Clubs"
                onChange={(e) => setSearchTerm(e.target.value)} // Update as you type
            />



            {/* Render clubs by category */}
            {categories.map(category => (
                <div key={category}>
                    <h2>{category} Clubs</h2>
                    <div className={styles.clubRow}>
                        {categorizedClubs[category]
                            .filter(club => club.name.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map(club => memberOfClubs(club.name, club.description, club.img, club.id))}
                    </div>
                </div>
            ))}
        </div>
    );
}
