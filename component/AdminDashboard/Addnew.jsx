import Popup from "reactjs-popup";
import styles from "./admin.module.scss";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import AddNewList from "./AddNewList";

const Addnew = () => {
  return (
    <div className={styles.addnew}>
      <Popup
        trigger={
          <div className={styles.addnewbtn}>
            <button type="button" className={styles.trigger}>
              Add New Content
              <MdOutlineKeyboardArrowDown size={30} />
            </button>
          </div>
        }
        position={["bottom center", "bottom right", "bottom left"]}
        // closeOnDocumentClick
        // keepTooltipInside={styles.tooltipBoundary}
        arrow={false}
        nested
      >
        <AddNewList />
      </Popup>
    </div>
  );
};

export default Addnew;
