import React from "react";
import { MdDelete } from "react-icons/md";
import visa from "@/assets/visa.svg";
import Image from "next/image";
import styles from "./dashboardsettings.module.scss";

const PaymentDetailsCard = () => {
  return (
    <div className={styles.paymentdetailscard}>
      <div className={styles.paymentdetailscard__name}>
        <div className={styles.paymentdetailscard__image}>
          <Image src={visa} alt="visa" />
        </div>
        <p>Visa-8767</p>
      </div>
      <div className={styles.paymentdetailscard__delete}>
        <MdDelete color="#FF2C2C" size={25} />
        <p>Delete</p>
      </div>
    </div>
  );
};

export default PaymentDetailsCard;
