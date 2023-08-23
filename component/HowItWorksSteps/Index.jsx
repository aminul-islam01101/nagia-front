import select from "@/assets/select.svg";
import create from "@/assets/create.svg";
import preferred from "@/assets/preferred.svg";
import checkout from "@/assets/checkout.svg";
import Image from "next/image";
import styles from "./howitworks.module.scss";

const HowItWorksSteps = () => {
  return (
    <>
      <div className={styles.howitworkssteps}>
        <div className={`${styles.steps} ${styles.steps1}`}>
          <div className={styles.steps__image}>
            <Image
              src={create}
              alt="animation of female holding a web component"
            />
          </div>
          <div className={`${styles.steps__text} ${styles.steps__text1}`}>
            <span>1</span>
            <p>Create an account a nagaing.com</p>
          </div>
        </div>
        <div className={`${styles.steps} ${styles.steps2}`}>
          <div className={`${styles.steps__text} ${styles.steps__text2}`}>
            <span>2</span>
            <p>Select the commodity and quantity you want to buy</p>
          </div>
          <div className={styles.steps__image}>
            <Image
              src={select}
              alt="animation of female holding a web component"
            />
          </div>
        </div>
        <div className={`${styles.steps} ${styles.steps3}`}>
          <div className={styles.steps__image}>
            <Image
              src={preferred}
              alt="animation of female holding a web component"
            />
          </div>
          <div className={`${styles.steps__text} ${styles.steps__text3}`}>
            <span>3</span>
            <p>Choose your preferred storage and insurance</p>
          </div>
        </div>

        <div className={`${styles.steps} ${styles.steps4}`}>
          <div className={`${styles.steps__text}`}>
            <span>4</span>
            <p>Checkout</p>
          </div>
          <div className={styles.steps__image}>
            <Image
              src={checkout}
              alt="animation of female holding a web component"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorksSteps;
