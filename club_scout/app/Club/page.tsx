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
            console.log("Fetched Clubs:", fetchedClubs);
            setClubs(fetchedClubs);
        });
    }, []);

    const normalizeCategory = (club, categoryName) => {
        if (Array.isArray(club.category)) {
            return club.category.map(c => c.toLowerCase()).includes(categoryName);
        } else if (typeof club.category === 'string') {
            return club.category.split(',').map(c => c.trim().toLowerCase()).includes(categoryName);
        }
        return false;
    };

    // Dynamically group clubs by their category
    const categories = ['Sports', 'Outdoors', 'Indoors']; // Add any other categories you want
    const categorizedClubs = categories.reduce((acc, category) => {
        acc[category] = clubs.filter(club => normalizeCategory(club, category.toLowerCase()));
        return acc;
    }, {});

    return (
        <div>
            {/* Searchbar */}
            <input
                type="text"
                placeholder="Search Clubs"
                onChange={(e) => setSearchTerm(e.target.value)} // update-ast leitarorð við innslátt
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
