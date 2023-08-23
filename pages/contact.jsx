import OuterPage from "@/component/OuterPage";
import styles from "@/styles/contact.module.scss";
import Image from "next/image";
import Button from "@/component/onboarding/Button";
import ContactForm from "@/component/ContactForm/Index";
import call from "../assets/call.svg";
import message from "../assets/message.svg";

const Contact = () => {
  return (
    <OuterPage>
      <div className={`${styles.contact} container`}>
        <div className={styles.contact__form}>
          <ContactForm />
        </div>
        <div className={styles.details}>
          <h2>We’d love to hear from you</h2>
          <p>Reach out to us via</p>

          <div className={styles.options}>
            <div className={styles.options__single}>
              <div className={styles.options__icon}>
                <Image src={message} alt="message icon" />
              </div>
              <h3>Send us an email</h3>
              <p>info@nagaing.com</p>
            </div>
            <div className={styles.options__single}>
              <div className={styles.options__icon}>
                <Image src={call} alt="call icon" />
              </div>
              <h3>Call us on</h3>
              <p>09129253477</p>
            </div>
          </div>
        </div>
      </div>
    </OuterPage>
  );
};

export default Contact;
