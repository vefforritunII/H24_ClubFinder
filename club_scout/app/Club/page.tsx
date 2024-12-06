"use client";

import { useState, useEffect } from "react";
import { getAllClubsData, getUserPreferences } from "@/app/library/actions";
import memberOfClubs from "@/app/components/profileMemberClubs";
import styles from "./club.module.css";

export default function DiscoverPage() {
    const [clubs, setClubs] = useState([]); // State for all clubs
    const [userPreferences, setUserPreferences] = useState([]); // State for user preferences
    const [searchTerm, setSearchTerm] = useState(""); // Initialize search term as empty string

    useEffect(() => {
        async function fetchData() {
            const fetchedClubs = await getAllClubsData(); // Fetch all clubs
            const preferences = await getUserPreferences(); // Fetch user preferences
            setClubs(fetchedClubs);
            setUserPreferences(preferences);
        }
        fetchData();
    }, []);

    // Helper to normalize and check categories
    const normalizeCategory = (club, categoryName) => {
        if (Array.isArray(club.category)) {
            return club.category.map((c) => c.toLowerCase()).includes(categoryName);
        } else if (typeof club.category === "string") {
            return club.category
                .split(",")
                .map((c) => c.trim().toLowerCase())
                .includes(categoryName);
        }
        return false;
    };

    // Define categories and categorize clubs dynamically
    const categories = ["Sports", "Outdoors", "Indoors"]; // Add other categories as needed
    const categorizedClubs = categories.reduce((acc, category) => {
        acc[category] = clubs.filter((club) => normalizeCategory(club, category.toLowerCase()));
        return acc;
    }, {});

    // Recommend clubs based on user preferences
    const recommendedClubs = categories.reduce((acc, category) => {
        if (userPreferences.includes(category.toLowerCase())) {
            acc[category] = categorizedClubs[category];
        }
        return acc;
    }, {});

    return (
        <div>
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search Clubs"
                value={searchTerm} // Controlled input
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchBar}
            />

            {/* All Clubs */}
            <div>
                <h2>All Clubs</h2>
                <div className={styles.clubRow}>
                    {clubs
                        .filter((club) =>
                            club.name.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((club) =>
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
                            {categorizedClubs[category]
                                .filter((club) =>
                                    club.name.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((club) =>
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
                            {recommendedClubs[category]
                                .filter((club) =>
                                    club.name.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((club) =>
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
