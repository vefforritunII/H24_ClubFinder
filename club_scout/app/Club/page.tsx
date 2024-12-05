"use client";

import { useState, useEffect } from "react";
import { getAllClubsData, getUserPreferences } from "@/app/library/actions";
import memberOfClubs from "@/app/components/profileMemberClubs";
import styles from './club.module.css';

export default function DiscoverPage() {
    const [clubs, setClubs] = useState([]);
    const [userPreferences, setUserPreferences] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 

    useEffect(() => {
        async function fetchData() {
            const fetchedClubs = await getAllClubsData();
            const preferences = await getUserPreferences(); // Get user preferences from the database
            setClubs(fetchedClubs);
            setUserPreferences(preferences);
        }
        fetchData();
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
    const categories = ['Sports', 'Outdoors', 'Indoors']; // Add other categories if needed
    const categorizedClubs = categories.reduce((acc, category) => {
        acc[category] = clubs.filter(club => normalizeCategory(club, category.toLowerCase()));
        return acc;
    }, {});

    // Show all clubs that match any user preference
    const recommendedClubs = categories.reduce((acc, category) => {
        if (userPreferences.includes(category.toLowerCase())) {
            acc[category] = categorizedClubs[category];
        }
        return acc;
    }, {});

    return (
        <div>
            {/* Searchbar */}
            <input
                type="text"
                placeholder="Search Clubs"
                onChange={(e) => setSearchTerm(e.target.value)} // Search bar logic
            />

            {/* Display categories dynamically */}
            <div className={styles.recommendedClubs}>
                {categories.map(category => (
                    <div key={category}>
                        <h2>{category} Clubs</h2>
                        <div className={styles.clubRow}>
                            {categorizedClubs[category]
                                .filter(club => club.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map(club => memberOfClubs(club.name, club.description, club.img, club.id, false))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Display All Clubs as a fallback */}
            <div>
                <h2>All Clubs</h2>
                <div className={styles.clubRow}>
                    {clubs
                        .filter(club => club.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(club => memberOfClubs(club.name, club.description, club.img, club.id, false))}
                </div>
            </div>

            {/* Display recommended clubs based on user preferences */}
            <div>
                <h2>Recommended for You</h2>
                {Object.keys(recommendedClubs).map(category => (
                    <div key={category}>
                        <h3>{category} Clubs</h3>
                        <div className={styles.clubRow}>
                            {recommendedClubs[category]
                                .filter(club => club.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map(club => memberOfClubs(club.name, club.description, club.img, club.id, false))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
