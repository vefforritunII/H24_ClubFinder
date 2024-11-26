import styles from "./page.module.css"; // Adjust path if necessary

export default function Page() {
    return (
        <div className={styles.page}>
            {/* Main Content */}
            <div className={styles.main}>
                <h1>Welcome to ClubScout</h1>
                <p>Discover new hobbies and connect with like-minded individuals!</p>

                {/* Image Section */}
                <div className={styles.imageSection}>
                    <img src="/images/hobbies.jpg" alt="Discover Hobbies" className={styles.image} />
                </div>

                {/* Discover Button */}
                <div className={styles.ctas}>
                    <a className={styles.primary} href="/Club">Discover Hobbies</a>
                </div>
            </div>

            {/* Footer */}
            <footer className={styles.footer}>
                <p>© 2024 ClubScout. Your journey to discovering hobbies starts here.</p>
            </footer>
        </div>
    );
}
