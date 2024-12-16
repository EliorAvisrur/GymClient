import React from "react";
import styles from "../styles/HomePage.module.css";
import GymPic from "../../pictures/commercial-gym-equipment-list-dk-2048x941.jpg";
const Home = () => {
  return (
    <div className={styles.wrapper}>
      {/* Image Section */}
      <section className={styles.imageSection}>
        <img src={GymPic} alt="Gym Image" className={styles.image} />
      </section>

      {/* Gym Packages Section */}
      <section id="packages" className={styles.packagesSection}>
        <h2>Our Gym Packages</h2>
        <div className={styles.packages}>
          <div className={styles.package}>
            <h3>Basic Package</h3>
            <p>Access to gym facilities and basic equipment.</p>
          </div>
          <div className={styles.package}>
            <h3>Premium Package</h3>
            <p>All access to premium equipment and exclusive classes.</p>
          </div>
          <div className={styles.package}>
            <h3>VIP Package</h3>
            <p>Personal training, spa access, and all premium services.</p>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className={styles.coursesSection}>
        <h2>Our Courses</h2>
        <div className={styles.courses}>
          <div className={styles.course}>
            <h3>Pilates</h3>
            <p>
              Strengthen your core and improve flexibility with Pilates classes.
            </p>
          </div>
          <div className={styles.course}>
            <h3>Spinning</h3>
            <p>
              Boost your cardiovascular fitness with our intense spinning
              sessions.
            </p>
          </div>
          <div className={styles.course}>
            <h3>Yoga</h3>
            <p>Relax your mind and body with our calming yoga sessions.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <ul>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li>
              <a href="#branches">Branches</a>
            </li>
          </ul>
        </div>
        <div className={styles.footerContact}>
          <p>Phone: 9940*</p>
          <p>Email: contact@holmesplace.co.il</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
