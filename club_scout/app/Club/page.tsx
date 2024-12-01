"use client";

import { useState, useEffect } from "react";
import { getAllClubsData } from "@/app/library/actions";
import memberOfClubs from "@/app/components/profileMemberClubs";

export default function Page() {
    const [clubs, setClubs] = useState([]);
    const [featuredClubs, setFeaturedClubs] = useState([]);
    const [sportsClubs, setSportsClubs] = useState([]);
    const [outdoorClubs, setOutdoorClubs] = useState([]);
    const [indoorClubs, setIndoorClubs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // Fetch all clubs
        getAllClubsData().then(setClubs);

        // Fetch featured clubs
        getAllClubsData({ featured: true }).then((data) => setFeaturedClubs(data || []));

        // Fetch clubs by category
        getAllClubsData({ category: "Sports" }).then((data) => setSportsClubs(data || []));
        getAllClubsData({ category: "Outdoors" }).then((data) => setOutdoorClubs(data || []));
        getAllClubsData({ category: "Indoors" }).then((data) => setIndoorClubs(data || []));
    }, []);

    return (
        <div>
            {/* Search bar */}
            <input
                type="text"
                placeholder="Search Clubs"
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Featured Clubs */}
            <h2>Featured Clubs</h2>
            <div>
                {featuredClubs.length > 0 ? (
                    featuredClubs
                        .filter((club) => club.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((club) => memberOfClubs(club.name, club.description, club.img, club.id))
                ) : (
                    <p>No featured clubs available.</p>
                )}
            </div>

            {/* Sports Clubs */}
            <h2>Sports Clubs</h2>
            <div>
                {sportsClubs.length > 0 ? (
                    sportsClubs
                        .filter((club) => club.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((club) => memberOfClubs(club.name, club.description, club.img, club.id))
                ) : (
                    <p>No sports clubs available.</p>
                )}
            </div>

            {/* Outdoor Clubs */}
            <h2>Outdoor Clubs</h2>
            <div>
                {outdoorClubs.length > 0 ? (
                    outdoorClubs
                        .filter((club) => club.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((club) => memberOfClubs(club.name, club.description, club.img, club.id))
                ) : (
                    <p>No outdoor clubs available.</p>
                )}
            </div>

            {/* Indoor Clubs */}
            <h2>Indoor Clubs</h2>
            <div>
                {indoorClubs.length > 0 ? (
                    indoorClubs
                        .filter((club) => club.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((club) => memberOfClubs(club.name, club.description, club.img, club.id))
                ) : (
                    <p>No indoor clubs available.</p>
                )}
            </div>
        </div>
    );
}
