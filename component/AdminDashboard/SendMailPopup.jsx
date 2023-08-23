import Popup from "reactjs-popup";
import SendEmail from "./SendEmail";
import styles from "./admin.module.scss";

const SendMailPopup = ({ children, trigger, ref }) => (
  <Popup trigger={trigger} modal nested ref={ref}>
    {(close) => <div className="popup">{children}</div>}
  </Popup>
);

export default SendMailPopup;
