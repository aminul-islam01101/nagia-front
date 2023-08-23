import Image from "next/image";
import styles from "./product.module.scss";
import rice from "../../assets/rice.png";

const Product = () => {
  return (
    <div className={styles.product}>
      <Image src={rice} alt="rice" />
      <div className={styles.details}>
        <div className={styles.details__text}>
          <h3>Millet rice</h3>
          <p>NGN 200,000</p>
        </div>
        <button type="button">Trade</button>
      </div>
    </div>
  );
};

export default Product;
