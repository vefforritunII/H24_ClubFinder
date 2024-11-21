import { getClubData } from "@/app/library/actions"
import { cookies } from "next/headers"

export default async function Club({params}:{params:Promise<{Club:string}>}) {

    const club = (await params).Club
    const cookie = await cookies()
    const dataOfClub = await getClubData(Number(club))

    console.log(cookie.has("haveSignedIn"))
    if (cookie.has("haveSignedIn")){
        console.log(cookie.getAll())
    }


    return(
        <div>
            <h1>Velkominn til {dataOfClub.name}</h1>
            <img src={dataOfClub.logo} alt={dataOfClub.img} />
            <p>Description: {dataOfClub.description}</p>

            <p>This club was made in {dataOfClub.created_at.split("T")[0]}</p>

            <button>{}</button>
        </div>
    )
    
}