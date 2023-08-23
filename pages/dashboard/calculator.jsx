import React from "react";
import { useState } from "react";
import select from "react-select";
import styles from "./dashboard.module.scss";
import DashboardPage from "@/component/DashboardGlobalComponents/DashboardPage";
import { useGetAllOpportunitiesQuery } from "@/states/services/overlappingApi";
import ProtectedHOC from "@/component/Misc/ProtectedHOC";
import Loader, { TinyLoader } from "@/component/Misc/Loader";
import ReactPaginate from "react-paginate";
import ButtonWithLoader from "@/component/Misc/ButtonWithLoader";

const InvestmentCalculator = () => {
  const [product, setProduct] = useState(0);
  const [cost, setCost] = useState(0);
  const [bags, setBags] = useState(10);
  const [price, setPrice] = useState(0);
  const [storage, setStorage] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [includeStorage, setIncludeStorage] = useState(false);

  const productOptions = [
    { label: "Wheat", value: 38000 },
    { label: "Oloyin Beans", value: 51000 },
    { label: "Soya Beans", value: 32000 },
    { label: "Bambara Nuts", value: 50000 },
    { label: "Sorghum White", value: 29000 },
    { label: "Sorghum Red", value: 31000 },
    { label: "Maize White", value: 260 },
  ];

  const calculatePrice = () => {
    // const { data: opportunity, isFetching: isLoadingOpp } =
    //   useGetAllOpportunitiesQuery(query);

    // if (!isLoadingOpp && Array.isArray(opportunity)) {
    //   const productOptions = opportunity.map(({ label, value }) => ({
    //     label,
    //     value,
    //   }));
    //   // Now productOptions contains the extracted data in the same format as the original productOptions dictionary
    //   console.log(productOptions);
    // } else {
    //   // Handle the case when data is still loading or unavailable
    // }

    const bagsValue = parseFloat(bags);
    const selectedProduct = productOptions.find(
      (option) => option.value.toString() === product
    );

    const costValue = selectedProduct?.value || 0;
    const priceValue = costValue * bagsValue;
    let storageValue = 0;
    if (includeStorage) {
      storageValue = 1500 * bagsValue;
    }
    const serviceChargeValue = 0.1 * priceValue;
    const totalPriceValue = priceValue + storageValue + serviceChargeValue;

    setCost(costValue.toFixed(2));
    setPrice(priceValue.toFixed(2));
    setStorage(storageValue.toFixed(2));
    setServiceCharge(serviceChargeValue.toFixed(2));
    setTotalPrice(totalPriceValue.toFixed(2));
  };

  return (
    <DashboardPage title="Investment Calculator">
      <div className={styles.calculator}>
        <div className={styles.center}>
          <div className={styles.product}>
            <h4 htmlFor="product">Product:</h4>
            <select
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="">Select a product</option>
              {productOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputGroup}>
            <h4 htmlFor="bags">Number of Bags (minimum 10):</h4>
            <input
              type="number"
              id="bags"
              value={bags}
              min="10"
              onChange={(e) => setBags(parseInt(e.target.value))}
            />
          </div>
          <div className={styles.inputGroup}>
            <h4>Include Storage:</h4>
            <input
              type="checkbox"
              checked={includeStorage}
              onChange={(e) => setIncludeStorage(e.target.checked)}
            />
          </div>
        </div>
        <div className={styles.center}>
          <button className={styles.btn2} onClick={calculatePrice}>
            Calculate
          </button>
          <div className={styles.resultGroup}>
            <h4>Cost of Product: {cost}</h4>
            <br />
            <h4>Price: {price}</h4>
            <br />
            <h4>Storage: {storage}</h4>
            <br />
            <h4>Service Charge: {serviceCharge}</h4>
            <br />
            <h3>Total Price: {totalPrice}</h3>
          </div>
        </div>
      </div>
    </DashboardPage>
  );
};

export default ProtectedHOC(InvestmentCalculator);
