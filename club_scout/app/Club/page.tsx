"use client"; 

import { useState, useEffect } from "react";
import { getAllClubsData } from "@/app/library/actions"; // sækir öll Clubs
import memberOfClubs from "@/app/components/profileMemberClubs"; // Component til að birta upplýsingar um Clubs

export default function Page() {
    const [clubs, setClubs] = useState([]); // Til að geyma listann af Clubs
    const [searchTerm, setSearchTerm] = useState(""); // Til að geyma search-ið sem notandi slær inn

    useEffect(() => {
        getAllClubsData().then(setClubs); // Sækir gögnin um Clubs og uppfærir state
    }, []);

    return (
        <div>
            <input
                type="text"
                placeholder="Search Clubs"
                onChange={(e) => setSearchTerm(e.target.value)} // Uppfærir search-ið við hverja breytingu
            />
            {/* Filtrum Clubs eftir leitarorðinu og birtum þau */}
            {clubs.filter(club => 
                club.name.toLowerCase().includes(searchTerm.toLowerCase()) // Leita eftir nafni
            )
            .map((club) => memberOfClubs(club.name, club.description, club.img, club.id))} {/* Birtir inn í síðuna, alla klúbba.*/}
        </div>
    );
}
