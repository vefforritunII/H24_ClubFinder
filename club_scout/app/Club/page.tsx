"use client";

import { useState, useEffect } from "react";
import { getAllClubsData } from "@/app/library/actions"; // Import your fetch function

export default function Page() {
  const [featuredClubs, setFeaturedClubs] = useState([]);
  const [sportsClubs, setSportsClubs] = useState([]);
  const [outdoorClubs, setOutdoorClubs] = useState([]);
  const [indoorClubs, setIndoorClubs] = useState([]);

  useEffect(() => {
    // Fetch featured clubs
    getAllClubsData({ featured: true }).then((clubs) => {
      setFeaturedClubs(clubs);
    });

    // Fetch sports clubs
    getAllClubsData({ category: "Sports" }).then((clubs) => {
      setSportsClubs(clubs);
    });

    // Fetch outdoor clubs
    getAllClubsData({ category: "Outdoors" }).then((clubs) => {
      setOutdoorClubs(clubs);
    });

    // Fetch indoor clubs
    getAllClubsData({ category: "Indoors" }).then((clubs) => {
      setIndoorClubs(clubs);
    });
  }, []);

  return (
    <div>
      <h2>Featured Clubs</h2>
      <div>
        {featuredClubs.map((club) => (
          <div key={club.id}>
            <h3>{club.name}</h3>
            <img src={club.logo} alt={club.name} />
            <p>{club.description}</p>
          </div>
        ))}
      </div>

      <h2>Sports Clubs</h2>
      <div>
        {sportsClubs.map((club) => (
          <div key={club.id}>
            <h3>{club.name}</h3>
            <img src={club.logo} alt={club.name} />
            <p>{club.description}</p>
          </div>
        ))}
      </div>

      <h2>Outdoor Clubs</h2>
      <div>
        {outdoorClubs.map((club) => (
          <div key={club.id}>
            <h3>{club.name}</h3>
            <img src={club.logo} alt={club.name} />
            <p>{club.description}</p>
          </div>
        ))}
      </div>

      <h2>Indoor Clubs</h2>
      <div>
        {indoorClubs.map((club) => (
          <div key={club.id}>
            <h3>{club.name}</h3>
            <img src={club.logo} alt={club.name} />
            <p>{club.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
