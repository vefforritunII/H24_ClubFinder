"use client";

import { useState, useEffect } from "react";
import { getAllClubsData, getUserPreferences } from "@/app/library/actions";
import memberOfClubs from "@/app/components/profileMemberClubs";
import styles from "./club.module.css";

export default function DiscoverPage() {
    const [clubs, setClubs] = useState([]); // State for all clubs
    const [userPreferences, setUserPreferences] = useState([]); // State for user preferences
    const [searchTerm, setSearchTerm] = useState(""); // Initialize search term as empty string
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const fetchedClubs = await getAllClubsData(); // Fetch all clubs
                const preferences = await getUserPreferences(); // Fetch user preferences
                setClubs(fetchedClubs);
                setUserPreferences(preferences);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    // Filter clubs by search term
    const filteredClubs = clubs.filter((club) =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Category ID to name mapping (example)
    const categoryIdToNameMap = {
        1: "Sports",  // ID 1 is "Sports"
        2: "Outdoors", // ID 2 is "Outdoors"
        3: "Indoors",  // ID 3 is "Indoors"
        // Add more mappings as necessary
    };

    // Helper to normalize and check categories by ID
    const normalizeCategory = (club, categoryName) => {
        const categoryId = club.category; // Assuming club.category is a numeric ID

        if (categoryId && categoryIdToNameMap[categoryId]) {
            // Compare the category name (mapped from ID) with the requested category name
            return categoryIdToNameMap[categoryId].toLowerCase() === categoryName.toLowerCase();
        }

        return false; // If no match or invalid category, return false
    };

    // Define categories and categorize clubs dynamically
    const categories = ["Sports", "Outdoors", "Indoors"];
    const categorizedClubs = categories.reduce((acc, category) => {
        acc[category] = filteredClubs.filter((club) => normalizeCategory(club, category.toLowerCase()));
        return acc;
    }, {});

    // Recommend clubs based on user preferences
    const recommendedClubs = categories.reduce((acc, category) => {
        if (userPreferences.map(p => p.toLowerCase()).includes(category.toLowerCase())) {
            acc[category] = categorizedClubs[category];
        }
        return acc;
    }, {});

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search Clubs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchBar}
            />

            {/* All Clubs */}
            <div>
                <h2>All Clubs</h2>
                <div className={styles.clubRow}>
                    {filteredClubs.map((club) =>
                        memberOfClubs(
                            club.name,
                            club.description,
                            club.img,
                            club.id,
                            false
                        )
                    )}
                </div>
            </div>

            {/* Display clubs by category */}
            <div className={styles.recommendedClubs}>
                {categories.map((category) => (
                    <div key={category}>
                        <h2>{category} Clubs</h2>
                        <div className={styles.clubRow}>
                            {categorizedClubs[category].map((club) =>
                                memberOfClubs(
                                    club.name,
                                    club.description,
                                    club.img,
                                    club.id,
                                    false
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Recommended Clubs */}
            <div>
                <h2>Recommended for You</h2>
                {Object.keys(recommendedClubs).map((category) => (
                    <div key={category}>
                        <h3>{category} Clubs</h3>
                        <div className={styles.clubRow}>
                            {recommendedClubs[category].map((club) =>
                                memberOfClubs(
                                    club.name,
                                    club.description,
                                    club.img,
                                    club.id,
                                    false
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
