import Link from "next/link";

export default function memberOfClubs(name: string, description: string, logo: string, id: string) {
    return (
        <div key={id}>
            {/* Mynd */}
            <img
                src={logo}
                alt={name}
                
            />
            {/* Hlekkur */}
            <Link href={`/Club/${id}`} >
                <h2>{name}</h2>
            </Link>
            {/* Lýsing */}
            <p>{description}</p>
        </div>
    );
}

