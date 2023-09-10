
import DashboardPage from "@/component/DashboardGlobalComponents/DashboardPage";
import styles from "./dashboard.module.scss";
import { useState } from "react";
import { useGetAllOpportunitiesQuery } from "@/states/services/overlappingApi";
import ProtectedHOC from "@/component/Misc/ProtectedHOC";
import Loader, { TinyLoader } from "@/component/Misc/Loader";
import ReactPaginate from "react-paginate";
import MyMarket from "./MyMarket";
import {MdArrowBack} from 'react-icons/md'

export const initialQuery = {
  page: 1,
  limit: 10,
  search: "",
};

const AdminMarket = ({handleBack, userData, handleBuyProduct}) => {
    console.log(userData)
  const [query, setQuery] = useState(initialQuery);
  //GET ALL OPPORTUNITIES FOM REDUX
  const { data: opportunity, isFetching: isLoadingOpp } =
    useGetAllOpportunitiesQuery(query);

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;

    setQueryCashout({ ...queryCashout, page: currentPage });
  };
  const pageCount = opportunity?.data.totalPage;

  return (
    <div>
      
        <div className={styles.calculator}>
          {isLoadingOpp ? (
            <div className={styles.loading}>
              <TinyLoader />
            </div>
          ) : (
            <div className={styles.productscontainer}>
                <button className={styles.backButton} style={{paddingBottom:"10px", marginBottom:"10px"}}  onClick={handleBack}><MdArrowBack/></button>
              <MyMarket
                product="Potato"
                price="NGN 2,000,000"
                percentage="+0.25%"
                equity="30%"
                opportunity={opportunity?.data}
                handleBuyProduct={handleBuyProduct}
              />
              <ReactPaginate
                previousLabel={"< Prev"}
                nextLabel={"Next >"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                pageClassName={"page_item"}
                pageLinkClassName={"page_link"}
                previousClassName={"page_item"}
                previousLinkClassName={"page_link page_link_prev"}
                nextClassName={"page_item"}
                nextLinkClassName={"page_link page_link_next"}
                breakClassName={"page_item"}
                breakLinkClassName={"page_link"}
                activeClassName={"active"}
              />
            </div>
          )}
        </div>
    
    </div>
  );
};

export default AdminMarket;
