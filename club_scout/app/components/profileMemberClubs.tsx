import Link from "next/link";

export default function memberOfClubs(name: string, description: string, logo: string, id: string) {
    return (
        <div key={id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px", textAlign: "center" }}>
            {/* Mynd */}
            <img
                src={logo}
                alt={name}
                style={{ width: "100px", height: "100px", objectFit: "cover", marginBottom: "10px" }}
            />
            {/* Hlekkur */}
            <Link href={`/Club/${id}`} style={{ textDecoration: "none", color: "blue" }}>
                <h2>{name}</h2>
            </Link>
            {/* Lýsing */}
            <p>{description}</p>
        </div>
    );
}

