import Link from "next/link"; // Notum Next.js Link til að bæta hlekk við

export default function memberOfClubs(name: string, description: string, logo: string, id: string) {
    return (
        <div key={id}> {/* Hver klúbbur hefur einstakt ID sem notað er sem 'key' */}
            <img
                src={logo}
                alt={name} 
            />
            {/* linkur sem vísir inn í club */}
            <Link href={`/Club/${id}`}>
                <h2>{name}</h2>
            </Link>
            <p>{description}</p>
        </div>
    );
}

