"use client";

import { useState, useEffect } from "react";
import { getAllClubsData } from "@/app/library/actions"; // Import your fetch function
import memberOfClubs from "@/app/components/profileMemberClubs"; // Component to display club details

export default function Page() {
  const [clubs, setClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredClubs, setFeaturedClubs] = useState([]);
  const [sportsClubs, setSportsClubs] = useState([]);
  const [outdoorClubs, setOutdoorClubs] = useState([]);
  const [indoorClubs, setIndoorClubs] = useState([]);

  useEffect(() => {
    // Fetch all clubs
    getAllClubsData().then((clubs) => {
      setClubs(clubs);
    });

    // Fetch featured clubs
    getAllClubsData({ featured: true }).then((clubs) => {
      setFeaturedClubs(clubs);
    });

    // Fetch clubs by category (Sports, Outdoors, Indoors)
    getAllClubsData({ category: "Sports" }).then((clubs) => {
      setSportsClubs(clubs);
    });
    getAllClubsData({ category: "Outdoors" }).then((clubs) => {
      setOutdoorClubs(clubs);
    });
    getAllClubsData({ category: "Indoors" }).then((clubs) => {
      setIndoorClubs(clubs);
    });
  }, []);

  return (
    <div>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Clubs"
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
      />

      {/* Featured Clubs Section */}
      <h2>Featured Clubs</h2>
      <div>
        {featuredClubs
          .filter((club) =>
            club.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by search term
          )
          .map((club) => memberOfClubs(club.name, club.description, club.logo, club.id))}
      </div>

      {/* Sports Clubs Section */}
      <h2>Sports Clubs</h2>
      <div>
        {sportsClubs
          .filter((club) =>
            club.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by search term
          )
          .map((club) => memberOfClubs(club.name, club.description, club.logo, club.id))}
      </div>

      {/* Outdoors Clubs Section */}
      <h2>Outdoor Clubs</h2>
      <div>
        {outdoorClubs
          .filter((club) =>
            club.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by search term
          )
          .map((club) => memberOfClubs(club.name, club.description, club.logo, club.id))}
      </div>

      {/* Indoors Clubs Section */}
      <h2>Indoor Clubs</h2>
      <div>
        {indoorClubs
          .filter((club) =>
            club.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by search term
          )
          .map((club) => memberOfClubs(club.name, club.description, club.logo, club.id))}
      </div>
    </div>
  );
}
