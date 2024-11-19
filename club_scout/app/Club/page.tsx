//Club eða discovery page
import { getAllClubsData } from "@/app/library/actions";
import  memberOfClubs  from "@/app/components/profileMemberClubs"

export default async function Page() {

    const clubs = await getAllClubsData()

    let renderedClubs = []

    for (let x of clubs){
        renderedClubs.push(memberOfClubs(x.name,x.description,x.img,x.id))
    }

    console.log(clubs)

    return (
        <div>
            <div id="wrapper">
                {renderedClubs.map((a)=>a)}
            </div>
        </div>
    );
}
