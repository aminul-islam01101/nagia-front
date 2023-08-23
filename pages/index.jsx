import Head from "next/head";
import Image from "next/image";
import { Mulish } from "@next/font/google";
import styles from "@/styles/Home.module.scss";
import OuterPage from "@/component/OuterPage";
import Link from "next/link";
import ourStory from "@/assets/our_story.png";
import reliability from "@/assets/reliability.svg";
import time from "@/assets/time.svg";
import efficiency from "@/assets/efficiency.svg";
import Testimonials from "@/component/Misc/Testimonials";
import "react-html5video/dist/styles.css";
import dynamic from "next/dynamic";
import farmer1 from "@/public/farmer1.jpeg";
import farmer2 from "@/public/farmer2.jpeg";
import farmer3 from "@/public/farmer3.jpeg";
import wheat from "@/assets/wheat.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { useEffect } from "react";
import HowItWorks from "@/component/HowItWorksSteps/Index";
import HowItWorksSteps from "@/component/HowItWorksSteps/Index";
import BackToTop from "@/component/Misc/BackToTop";
const mulish = Mulish({ subsets: ["latin"] });

export default function Home() {
  const DefaultPlayer = dynamic(
    () => import("react-html5video").then((lib) => lib.DefaultPlayer),
    {
      ssr: false,
    }
  );

  return (
    <OuterPage>
      <div className={styles.home}>
        <div className={styles.hero}>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
          >
            <SwiperSlide>
              <div
                className={styles.hero}
                style={{
                  background: `url(${wheat.src}) rgba(234, 226, 226, 0.274)`,
                  backgroundSize: "cover",
                  backgroundBlendMode: "lighten",
                }}
              >
                <div className={`${styles.hero__content} container`}>
                  <h1>Invest in a Better Tomorrow with Nagai Agrotrade</h1>
                  <p>
                    Join the growing community of impact-conscious investors and
                    make a positive impact on the world through agro investment.
                    Our platform provides a range of investment options in the
                    agriculture sector, so you can choose the one that aligns
                    with your values and goals.
                  </p>
                  <div className={styles.btns}>
                    <Link href="/signin">
                      <button className={styles.btn1}>Learn More</button>
                    </Link>
                    <Link href="/signup">
                      <button className={styles.btn2}>Get Started</button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className={`${styles.partners} container`}>
          <h2>Nigeria&apos;s most trusted Agrotrade Agents</h2>
        </div>
        <div className={`${styles.story} container`}>
          <div className={styles.story__image}>
            <Image src={ourStory} alt="image" />
          </div>
          <div className={styles.story__content}>
            <h2>Our Story</h2>
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
            <div className={styles.btns}>
              <Link href="/signin">
                <button className={styles.btn1}>Learn More</button>
              </Link>
              <Link href="/signup">
                <button className={styles.btn2}>Get Started</button>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.whyinvest}>
          <h2 className="container">Why invest with us</h2>
          <div className={styles.whyinvest__list}>
            <div className={`container ${styles.whyinvest__items}`}>
              <div className={styles.whyinvest__item}>
                <Image src={time} alt="time" />
                <h3>Result Driven</h3>
                <p>
                  Nagai Agrotrade Limited has a time-tested investment strategy
                  that has consistently produced high returns per cycle in
                  commodity trading within the Nigerian and African contexts.
                  Our Investments specialist have many years of experience
                  developing investment strategies that deliver results for our
                  investors
                </p>
              </div>
              <div className={styles.whyinvest__item}>
                <Image src={reliability} alt="reliability" />
                <h3>Hassle-free Platform </h3>
                <p>
                  We offer a fully automated online platform that provides
                  investors with access to all aspects of the investment
                  process, including automated investment calculation and
                  expected returns. This makes the investment process seamless
                  and easy to navigate, with flexible decision-making features
                  that put control in the hands of the investor
                </p>
              </div>
              <div className={styles.whyinvest__item}>
                <Image src={efficiency} alt="efficiency" />
                <h3>Insurance Policy</h3>
                <p>
                  Nagai Agrotrade Limited has a comprehensive insurance policy
                  that covers the storage and warehousing of commodities through
                  the investment cycle. This provides investors with peace of
                  mind, knowing that their investment is protected and secure,
                  and mitigates the risks associated with commodity trading.
                  Additionally, the low administrative and logistic charges make
                  it an affordable investment opportunity.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.how} container`}>
          <h2>How it works</h2>
          <p>Four simple step processes to start trading</p>
          <DefaultPlayer autoplay loop>
            <source src="nagaivideo.mp4" type="video/webm" />
          </DefaultPlayer>
          <HowItWorksSteps />
        </div>

        <div className={`${styles.what} container `}>
          <h2>What our investors say</h2>
          <Testimonials />
          <div className={styles.btns}>
            <Link href="/signin">
              <button className={styles.btn1}>See More Reviews</button>
            </Link>
            <Link href="/signup">
              <button className={styles.btn2}>Get Started</button>
            </Link>
          </div>
        </div>

        <div className={`${styles.what} container`}>
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: `
              
<link href="//cdn-images.mailchimp.com/embedcode/classic-071822.css" rel="stylesheet" type="text/css">
<style type="text/css">
	#mc_embed_signup{background:#fff; clear:left; font:22px Helvetica,Arial,sans-serif; text-align:center; width:auto; margin-top: 50px;}
 
</style>
<div id="mc_embed_signup">
    <form action="https://nagaing.us21.list-manage.com/subscribe/post?u=3e264806d5304efc436bed157&amp;id=6661c36eb1&amp;f_id=00775ae1f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
        <div id="mc_embed_signup_scroll">
        <h2>Subscribe to our Newsletter!</h2>
        <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
<div class="mc-field-group">
	<label for="mce-EMAIL">Email Address  <span class="asterisk">*</span>
</label>
	<input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL" required>
	<span id="mce-EMAIL-HELPERTEXT" class="helper_text"></span>
</div>
	<div id="mce-responses" class="clear foot">
		<div class="response" id="mce-error-response" style="display:none"></div>
		<div class="response" id="mce-success-response" style="display:none"></div>
	</div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_3e264806d5304efc436bed157_6661c36eb1" tabindex="-1" value=""></div>
        <div class="optionalParent">
            <div class="clear foot">
                <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" style="background-color: rgb(166, 99, 27); height: 56px; font-weight: 600; font-size: 16px;" class="button">
                <p class="brandingLogo"><a href="http://eepurl.com/is2p5U" title="Mailchimp - email marketing made easy and fun"><img src="https://eep.io/mc-cdn-images/template_images/branding_logo_text_dark_dtp.svg"></a></p>
            </div>
        </div>
    </div>
</form>
</div>
<script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
<!--End mc_embed_signup--></link>'
`,
              }}
            />
          </div>
        </div>
      </div>
    </OuterPage>
  );
}
