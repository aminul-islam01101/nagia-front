import OuterPage from "@/component/OuterPage";
import Product from "@/component/Product/Index";
import styles from "@/styles/products.module.scss";

const Products = () => {
  return (
    <OuterPage>
      <div className={`${styles.products} container`}>
        <div className={styles.recent}>
          <div className={styles.recent__heading}>
            <h2>Recent Products</h2>
            <p>View all</p>
          </div>
          <div className={styles.recent__product}>
            <Product />
            <Product />
            <Product />
            <Product />
          </div>
        </div>
        <div className={styles.popular}>
          <div className={styles.recent__heading}>
            <h2>Popular Products</h2>
            <p>View all</p>
          </div>
          <div className={styles.popular__product}>
            <Product />
            <Product />
            <Product />
            <Product />
          </div>
        </div>
      </div>
    </OuterPage>
  );
};

export default Products;
