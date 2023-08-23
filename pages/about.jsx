import OuterPage from "@/component/OuterPage";
import styles from "@/styles/about.module.scss";
import ourStory from "@/assets/our_story.png";
import achem from "@/assets/achem.jpg";
import barrister from "@/assets/barrister.jpg";
import evan from "@/assets/evan.jpg";
import Image from "next/image";
import Button from "@/component/onboarding/Button";
import FAQ from "@/component/FAQ/Index";
import redbean from "@/assets/redbeanabout.svg";
import grain from "@/assets/riceabout.svg";
import corn from "@/assets/cornabout.svg";
import potato from "@/assets/potatoesabout.svg";

const About = () => {
  return (
    <OuterPage>
      <div className={`${styles.about} container`}>
        <div className={styles.slogan}>
          <div className={styles.slogan__text}>
            <h2>Slogan</h2>
            <h3>
              About Our Company <span> Nagai Agrotrade</span>
            </h3>
            <p>
              Nagai Agrotrade Limited is an agricultural commodity trading
              company. We connect farmers with investors, making it easy and
              profitable for them to invest in the agricultural sector.
              <br />
              We started Nagai Agrotrade Limited in response to the growing
              demand for investment opportunities in the agricultural sector.
              With our online platform, we provide a convenient and secure way
              for investors to buy, store and sell agricultural produce.
              <br />
              We also offer storage facilities for a small fee, making it easy
              for investors to earn profits even during the ‘off-season’. So
              far, we have helped many farmers increase their incomes and
              improve their livelihoods. We are proud to be able to make a
              difference in the lives of those who work hard to feed our nation.
            </p>
          </div>
          <div className={styles.slogan__image}>
            <Image src={ourStory} alt="story" />
          </div>
        </div>
        <div className={styles.secondsection}>
          <div className={styles.executivesummary}>
            <h2>executive summary</h2>
            <p>
              Investors often struggle to invest in reliable businesses with
              high returns outside of their work without encountering issues due
              to poorly informed decisions. Our solution is an Integrated
              Agro-Commodity Trading Hub, a tech-driven platform that includes
              purchasing, storage, and sales/distribution components. It offers
              direct information for subscribers/investors, empowering them to
              make informed investment decisions based on current market
              conditions.
              <br />
              The hub offers a hybrid platform that seamlessly links online
              trading with physical commodity trading. The system, called NAIL,
              removes the burden of sourcing, storing, pricing, and selling
              commodities from investors. Instead, investors can monitor their
              investment and sales decisions based on current market trends.
              NAIL includes comprehensive insurance coverage, with contracts
              directly signed with insurance companies, to provide comfort and
              peace of mind. Investors are charged a small percentage per
              commodity for administrative and logistical purposes
            </p>
          </div>
          <div className={styles.goals}>
            <h2>primary goals and objectives of the business</h2>
            <ul>
              <li>
                To create a one-stop shop for trading and investment in
                agricultural products and services in Nigeria and West Africa.
              </li>
              <li>
                To develop an innovative agricultural investment value chain
                business that will become the biggest of its kind in West Africa
                with branches all over the continent.
              </li>
              <li>
                To help investors in agro commodities realize their returns on
                investment at the earliest and most appropriate time in the
                investment cycle.
              </li>
              <li>
                To create a revenue generation hub that will become a major
                booster for Nigeria’s economy.{" "}
              </li>
              <li>
                To help smallholder farmers leverage investor funds to create
                more value for their businesses.
              </li>
              <li>
                To create a system where investor is at peace while his/her
                money works to bring in needed returns.
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.thirdsection}>
          <div className={styles.images}>
            <div className={styles.image}>
              <Image src={potato} alt="potato" />
            </div>
            <div className={styles.image}>
              <Image src={corn} alt="corn" />
            </div>
            <div className={styles.image}>
              <Image src={redbean} alt="rice" />
            </div>
            <div className={styles.image}>
              <Image src={grain} alt="grain" />
            </div>
          </div>
          <div className={styles.text}>
            <h2>commodity - overview</h2>
            <p>
              We&lsquo;ll begin with five reliable commodities that have a
              history of generating high investment returns. Having traded these
              commodities ourselves for years, we&lsquo;re familiar with their
              annual performance and yield.
            </p>
            <ul>
              <li>
                Maize Corn – One of the most consumed commodity in Nigeria used
                for various human and animal meals.
              </li>
              <li>
                Beans – In the same category as maize is consumed by both humans
                and animal feeds.
              </li>
              <li>
                Bambara Nuts (Okpa) – Popularly known as okpa and used to make
                cakes and other food products especially in the eastern part of
                Nigeria.
              </li>
              <li>
                Palm Oil – An internationally viable commodity. Melon (Egusi) –
                Highly consumed in Nigerua and very viable in the market
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.stats}></div>
        <div className={styles.aim}>
          <div className={styles.aim__text}>
            <h2>Our Aim</h2>
            <p>
              The aim of helping farmers get better prices for their produce and
              investors get good returns on their investment.
              <br />
              The company&rsquo;s objective is to provide a hassle-free online
              platform for farmers to sell their produce, and for investors to
              buy and sell agricultural commodities. The company has a team of
              experienced professionals who are well-versed in the trends and
              dynamics of the agricultural commodities market.
            </p>
            <div className={styles.aim__btn}>
              <button type="button">Start Trading With Us</button>
            </div>
          </div>
          <div className={styles.aim__team}>
            <div className={styles.aim__team_text}>
              <h3>OMACHI U. ACHEM</h3>
              <p>General Manager Nagai</p>
            </div>
            <div className={styles.aim__image}>
              <Image src={achem} alt="achem" />
            </div>
          </div>
        </div>
        <div className={styles.aim}>
          <div className={styles.aim__team}>
            <div className={styles.aim__team_text}>
              <h3>FRED ACHOR ADEMU</h3>
              <p>Secretary/legal advicer</p>
            </div>
            <div className={styles.aim__image}>
              <Image src={barrister} alt="FRED ACHOR ADEMU" />
            </div>
          </div>
          <div className={styles.aim__team}>
            <div className={styles.aim__team_text}>
              <h3>EVANS AKURWE</h3>
              <p>Managing Director </p>
            </div>
            <div className={styles.aim__image}>
              <Image src={evan} alt="EVANS AKURWE" />
            </div>
          </div>
        </div>
        <div className={styles.offices}>
          <h2>Our offices </h2>
          <p>Modern offices designed for productivity and collaboration.</p>
          <div className={styles.offices__faq}>
            <FAQ
              title="Abuja, Nigeria"
              body="17, Gwandu Street,Off Ahmadu Bello Way, Obbo Crescent, Garki 11-Abuja., FCT Abuja Nigeria"
            />
          </div>
        </div>
      </div>
    </OuterPage>
  );
};

export default About;
