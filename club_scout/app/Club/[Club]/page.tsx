import { getClubData,joinOrLeaveClub,listOfMembersOfClubs,getUserData } from "@/app/library/actions"
import { cookies } from "next/headers"

export default async function Club({params}:{params:Promise<{Club:string}>}) {

    const club = (await params).Club
    const cookie = await cookies()
    const dataOfClub = await getClubData(Number(club))
    let type = "join"

    let join_text = "Log in to join!"// má ekki setja þetta í else{} því það mun "ekki finna join_text"

    if (cookie.has("haveSignedIn")){
        join_text = "Join"

        const userData = await getUserData(cookie.get("haveSignedIn")?.value)

        const memberOfClubs = await listOfMembersOfClubs(userData.id)
        if (memberOfClubs.includes(dataOfClub.id)){
            join_text = "Leave"
            type = "leave"
        }
    }    

    console.log(dataOfClub)
    return(
        <div>
            <h1>Velkominn til {dataOfClub.name}</h1>
            <img src={dataOfClub.logo} alt={dataOfClub.img} />
            <p>Description: {dataOfClub.description}</p>

            <p>This club was made in {dataOfClub.created_at.split("T")[0]}</p>

            <form action={joinOrLeaveClub}>{/* notar server side */}
                <input type="hidden" name="club_id" value={dataOfClub.id} />
                <input type="hidden" name="type" value={type} />
                <button type="submit">{join_text}</button>
            </form>

        </div>
    )
    
}