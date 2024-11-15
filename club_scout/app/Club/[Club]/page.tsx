import { getClubData } from "@/app/library/actions"

export default async function Club({params}:{params:Promise<{Club:string}>}) {

    const club = (await params).Club

    const dataOfClub = await getClubData(club)
    return(
        <div>
            <h1>Velkominn til {dataOfClub.name}</h1>
            <img src={dataOfClub.logo} alt={dataOfClub.logo} />
            <p>Description: {dataOfClub.disc}</p>

            <p>This club was made in {dataOfClub.madeDate}</p>
        </div>
    )
    
}