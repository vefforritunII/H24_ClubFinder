"use client";

import { useState, useEffect } from "react";
import { getAllClubsData } from "@/app/library/actions";
import memberOfClubs from "@/app/components/profileMemberClubs";
import styles from './club.module.css';

export default function Page() {
    // býr til stöðugt ástand fyrir geymslu á clubs og search
    const [clubs, setClubs] = useState([]); // Geyma alla clubs
    const [searchTerm, setSearchTerm] = useState(""); // search

    // Nota useEffect til að sækja club data þegar síðan loadast
    useEffect(() => {
        getAllClubsData().then((fetchedClubs) => {
            console.log("Fetched Clubs:", fetchedClubs); // Skráir club data í console fyrir problems
            setClubs(fetchedClubs); // Uppfærir lista með clubs
        });
    }, []);

    //  setur saman category (string eða array) og bera saman við nafn
    const normalizeCategory = (club, categoryName) => {
        // Ef 'category' er array, berum saman öll atriði
        if (Array.isArray(club.category)) {
            return club.category.map(c => c.toLowerCase()).includes(categoryName);
        } 
        // Ef 'category' er strengur, brjótum hann niður og berum saman
        else if (typeof club.category === 'string') {
            return club.category.split(',').map(c => c.trim().toLowerCase()).includes(categoryName);
        }
        return false;
    };

    // Flokkar klúbba í mismunandi hópa eftir einkennum
    const featuredClubs = clubs.filter(club => club.featured);
    const sportsClubs = clubs.filter(club => normalizeCategory(club, 'sports'));
    const outdoorClubs = clubs.filter(club => normalizeCategory(club, 'outdoors'));
    const indoorClubs = clubs.filter(club => normalizeCategory(club, 'indoors'));

    return (
        <div>
            {/* searchbar */}
            <input
                type="text"
                placeholder="Search Clubs"
                onChange={(e) => setSearchTerm(e.target.value)} //Þetta update-as þegar þu skrifar hverja stafi
            />

            <h2>Featured Clubs</h2>
            <div className={styles.clubRow}>
                {featuredClubs
                    .filter(club => club.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(club => memberOfClubs(club.name, club.description, club.img, club.id))}
            </div>

            <h2>Sports Clubs</h2>
            <div className={styles.clubRow}>
                {sportsClubs
                    .filter(club => club.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(club => memberOfClubs(club.name, club.description, club.img, club.id))}
            </div>

            <h2>Outdoor Clubs</h2>
            <div className={styles.clubRow}>
                {outdoorClubs
                    .filter(club => club.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(club => memberOfClubs(club.name, club.description, club.img, club.id))}
            </div>

            <h2>Indoor Clubs</h2>
            <div className={styles.clubRow}>
                {indoorClubs
                    .filter(club => club.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(club => memberOfClubs(club.name, club.description, club.img, club.id))}
            </div>
        </div>
    );
}
