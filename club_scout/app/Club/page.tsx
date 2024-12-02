"use client";

import { useState, useEffect } from "react";
import { getAllClubsData } from "@/app/library/actions"; // Fetch clubs
import memberOfClubs from "@/app/components/profileMemberClubs"; // Display club component
import styles from './club.module.css'; // Import CSS

export default function Page() {
    const [clubs, setClubs] = useState([]); // Store all clubs
    const [searchTerm, setSearchTerm] = useState(""); // Search term

    useEffect(() => {
        getAllClubsData().then((fetchedClubs) => {
            console.log("Fetched Clubs:", fetchedClubs); // Log all clubs
            setClubs(fetchedClubs);
        });
    }, []);

    const normalizeCategory = (club, categoryName) => {
        // Handle both array and string formats of 'category'
        if (Array.isArray(club.category)) {
            return club.category.map(c => c.toLowerCase()).includes(categoryName);
        } else if (typeof club.category === 'string') {
            return club.category.split(',').map(c => c.trim().toLowerCase()).includes(categoryName);
        }
        return false;
    };

    // Filter clubs into categories
    const featuredClubs = clubs.filter(club => club.featured);
    const sportsClubs = clubs.filter(club => normalizeCategory(club, 'sports'));
    const outdoorClubs = clubs.filter(club => normalizeCategory(club, 'outdoors'));
    const indoorClubs = clubs.filter(club => normalizeCategory(club, 'indoors'));

    return (
        <div>
            <input
                type="text"
                placeholder="Search Clubs"
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />

            {/* Featured Clubs */}
            <h2>Featured Clubs</h2>
            <div className={styles.clubRow}>
                {featuredClubs
                    .filter(club => club.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(club => memberOfClubs(club.name, club.description, club.img, club.id))}
            </div>

            {/* Sports Clubs */}
            <h2>Sports Clubs</h2>
            <div className={styles.clubRow}>
                {sportsClubs
                    .filter(club => club.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(club => memberOfClubs(club.name, club.description, club.img, club.id))}
            </div>

            {/* Outdoor Clubs */}
            <h2>Outdoor Clubs</h2>
            <div className={styles.clubRow}>
                {outdoorClubs
                    .filter(club => club.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(club => memberOfClubs(club.name, club.description, club.img, club.id))}
            </div>

            {/* Indoor Clubs */}
            <h2>Indoor Clubs</h2>
            <div className={styles.clubRow}>
                {indoorClubs
                    .filter(club => club.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(club => memberOfClubs(club.name, club.description, club.img, club.id))}
            </div>
        </div>
    );
}
