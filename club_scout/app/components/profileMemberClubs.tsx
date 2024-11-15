import Link from "next/link";

// return-a club með nafn,description og logo-ið og id í key svo hún mun ekki væla
export default function memberOfClubs(name: string,descreption:string,logo:string,id:string){
    return(
        <div key={id}>
            <img src={logo} alt={logo} />
            <Link href={"/Club/"+id}>{name}</Link>
            <p>{descreption}</p>
        </div>
    )
}