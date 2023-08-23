import OuterPage from "@/component/OuterPage";
import styles from "@/styles/terms.module.scss";
const TermsOfService = () => {
  return (
    <OuterPage>
      <div className={`${styles.terms} container`}>
        {" "}
        <h1>Agreement</h1>
        {/* <h2>Last update 8th September 2023</h2> */}
        <div className={styles.terms__content}>
          <p>
            <span className={styles.span}>This CSA </span> is entered into the
            day the website transaction is complete. BETWEEN
            <br />
            <span className={styles.spancaps}>
              NAGAI AGROTRADE LIMITED OF NO. 13
            </span>{" "}
            Gwandu Crescent, off Aminu Kano Boulevard, Garki II Abuja
            (hereinafter referred to as the “COMPANY” which expression shall
            where the context so admit include his Legal Representatives) on the
            first part. AND ,<div className={styles.line}></div>
            {/* ____________________________________________________ */}
            <br />
            (hereinafter referred to as the <span>“CLIENT”</span> which
            expression shall where the context so admit include his/her legal
            representatives) of the other part.
            <br />
            <span> 2. WHEREAS:</span>
            <br />
            i. The company is a corporate entity registered under the laws of
            the Federation of Nigeria with the object of providing agro-allied
            services including buying, storing, marketing, and selling of
            agricultural products.
            <br />
            ii. The company accepts offers from members of the public (Clients)
            who are interested in buying, storing, and selling agricultural
            products for profit-making purposes.
            <br />
            iii. The clients who subscribe to this agreement are therefore bound
            by the terms contained herein.
            <br />
            <span>THIS AGREEMENT WITNESSETH THUS:</span>
            <br />
            i) That the company shall buy agricultural products at the instance
            of her clients and at their request, directive and with the finances
            of the client.
            <br />
            ii) That the company shall keep safe custody of all funds and
            product taken, bought and stored for and on behalf of her client
            save for unforeseen circumstances at a fee.
          </p>
          <p>
            iii) That the client shall insure all goods purchased and stored by
            the company with the designated insurance company for that purpose.
            <br />
            iv) That the company shall buy and sell agricultural products upon
            the receipt of at least two weeks’ notice from the client with clear
            instructions as to the product to buy or sell on his/her behalf.
            <br />
            v) The company shall upon the expiration of a client’s two weeks’
            notice accommodate an extension of time request from the client to
            carry out the client’s instruction or refund to the client any
            unutilized balance from the transaction.
            <br />
            vi) If the price of a commodity appreciates within the time of the
            receipt of the client’s purchase order and the fulfillment of the
            order, the client shall be entitled to pay the difference or a
            refund of his/her funds.
            <br />
            vii) The client shall pay to the company commission and storage fees
            along with the purchase order.
            <br />
            viii) Clients who may wish to move their products from a location to
            another shall be totally responsible for their transport and other
            logistics incurable in that regard.
            <br />
            ix) The company shall offer tips on when to buy and sell products
            and the decision to do either shall solely be at the discretion of
            the client.
            <br />
            x) The company shall not be liable to the client over his/her
            product after purchase; the insurance company engaged by the client
            for that purpose shall recompense or compensate in the event of loss
            or destruction of the products.
            <br />
            <span>
              INTENDED TO BE LEGALLY BOUND THE PARTIES HAVE HEREUNTO SETFORTH
              THEIR RESPECTIVE HANDS AND SEAL THE DAY AND YEAR FIRST ABOVE
              WRITTEN.
            </span>
          </p>
        </div>
      </div>
    </OuterPage>
  );
};

export default TermsOfService;
