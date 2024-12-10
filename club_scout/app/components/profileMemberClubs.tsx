import Link from "next/link";
import styles from "./profileMemberClubs.module.css";

// return-a club með nafn,description og logo-ið og id í key svo hún mun ekki væla
export default function memberOfClubs(name: string,descreption:string,logo:string,id:string,owner:boolean,username:string = "none"){
    if (owner === false){
        return(
            <Link className={styles.club_element} href={"/Club/"+id} key={id}>
                <img src={logo} alt={logo}/>
                <div className={styles.club_details}>
                    <p className={styles.club_title}>{name}</p>
                    <p className={styles.club_description}>{descreption}</p>
                </div>
            </Link>
        )
    }
    else if (owner === true){
        return(
            <Link className={styles.club_element} href={"/Club/"+id} key={id}>
                <img src={logo} alt={logo} />
                <div className={styles.club_details}>
                    <p className={styles.club_title}>{name}</p>
                    <p className={styles.club_description}>{descreption}</p>
                    <Link href={"/profile/"+username+"/"+id}>Change!</Link>
                </div>
            </Link>
        )
    }

}