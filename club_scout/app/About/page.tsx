import styles from "./about.module.css"; // Adjust the path if necessary

export default function AboutUs() {
  return (
    <div className={styles.page}>
      {/* Text Section */}
      <div className={styles.textSection}>
        <h1>About Us</h1>
        <p>
        Þetta fyrirtæki er fyrir þá sem vilja tengjast samfélagi með sömu áhugamál,
         hvort sem það eru tölvuleikir, íþróttir, borðspil eða annað.
        Notendur geta fundið klúbba sem passa við þeirra áhuga, gengið í þá og 
        tekið þátt í reglulegum viðburðum eða dagskrám sem snúa að því sem klúbburinn býður upp á. 
        Þetta er frábær leið til að læra nýja hluti, deila áhugamálum og vonandi kynnast nýjum vinum á leiðinni.
        </p>
      </div>

      {/* Profile Pictures Section */}
      <div className={styles.profiles}>
        <div className={styles.profile}>
          <img src="/images/thordur.png" alt="thordur" />
          <div className={styles.profileName}>Þórður</div> 
        </div>
        <div className={styles.profile}>
          <img src="/images/moonlet.png" alt="Mateusz" />
          <div className={styles.profileName}>Mateusz</div>
        </div>
        <div className={styles.profile}>
          <img src="/images/lukas.png" alt="Lukas" />
          <div className={styles.profileName}>Lukas</div>
        </div>
        <div className={styles.profile}>
          <img src="/images/agustsquidward.png" alt="Agust" />
          <div className={styles.profileName}>Ágúst</div>
        </div>
      </div>
    </div>
  );
}
