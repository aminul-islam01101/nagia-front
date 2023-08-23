import Image from 'next/image';
import testimonial from '../../assets/testimonial.png';
import styles from './misc.module.scss';

const Testimonials = () => {
  return (
    <div className={styles.testimonials}>
      <div className={styles.testimonial}>
        <div className={styles.testimonial__heading}>
          {/* <Image src={testimonial} alt="investor" /> */}
          <div className={styles.testimonial__name}>
            <h3>Mrs. Bisi A.</h3>
            {/* <p>Business Man</p> */}
          </div>
        </div>
        <p>
          &rdquo;I have been investing with Nagai Agrotrade Limited for the past
          two years and have seen great returns on my investment. The online
          platform is easy to use, and the customer service team is always
          available to help with any questions I have. I would recommend Nagai
          Agrotrade Limited to any investor looking for a reliable and
          profitable investment opportunity.&rdquo;
        </p>
      </div>
      <div className={styles.testimonial}>
        <div className={styles.testimonial__heading}>
          {/* <Image src={testimonial} alt="investor" /> */}
          <div className={styles.testimonial__name}>
            <h3>Mrs. Lisu G.</h3>
            {/* <p>Business Man</p> */}
          </div>
        </div>
        <p>
          &rdquo;I was hesitant at first to invest in the commodity trading
          market, but Nagai Agrotrade Limited made it easy for me. The online
          platform is straightforward, the additional storage and insurance
          features also gave me peace of mind. I have recommended Nagai
          Agrotrade Limited to my friends and family.&rdquo;
        </p>
      </div>
      <div className={styles.testimonial}>
        <div className={styles.testimonial__heading}>
          {/* <Image src={testimonial} alt="investor" /> */}
          <div className={styles.testimonial__name}>
            <h3>Mr. Emmanuel O.</h3>
          </div>
        </div>
        <p>
          &rdquo;I have been investing with Nagai Agrotrade Limited for three
          investment cycles now, and I am impressed with the consistent returns
          on my investment. The automated investment calculation and
          decision-making features make monitoring my investment easy, and I
          appreciate the flexibility the platform provides. I am a satisfied
          investor. &rdquo;
        </p>
      </div>
      <div className={styles.testimonial}>
        <div className={styles.testimonial__heading}>
          {/* <Image src={testimonial} alt="investor" /> */}
          <div className={styles.testimonial__name}>
            <h3>Mrs. Naomi H.</h3>
          </div>
        </div>
        <p>
          &rdquo;Nagai Agrotrade Limited has made investing in the commodity
          trading market accessible and profitable for me. The online platform
          is user-friendly, and the storage and insurance features make it a
          low-risk investment opportunity. I appreciate the transparency in the
          investment process and the customer service team&apos;s
          responsiveness. &rdquo;
        </p>
      </div>
    </div>
  );
};

export default Testimonials;
