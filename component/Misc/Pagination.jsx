import React from "react";
// import { getPaginationData } from "../../utils/utils";
// import { Icon } from "../Icons";

const getPaginationData = (structure) => {
  const { total_records, records_per_page } = structure;
  const total_pages = Math.ceil(total_records / records_per_page);
  const pages = [];
  for (let i = 1; i <= total_pages; i++) {
    pages.push(i);
  }
  return { total_pages, pages };
};

const Pagination = ({ query, setQuery, count, per_page }) => {
  const { total_pages } = getPaginationData({
    total_records: count,
    records_per_page: per_page,
  });

  return (
    <div className="flex mx-right gap-3 justify-end mr-[50px] items-center text-grey-text">
      <p>
        <select
          className="appearance-none  bg-inherit focus:outline-none"
          onChange={(e) => setQuery({ ...query, per_page: e.target.value })}
        >
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
        - {query.page} of {total_pages || 1}
      </p>
      <div
        className="bg-[#B0BABF] p-2 px-3 rounded-lg cursor-pointer"
        onClick={() => {
          //   query.page > 1 &&
          setQuery({ ...query, page: query.page - 1 });
        }}
      >
        Left
      </div>
      <div
        className="bg-[#B0BABF] p-2 px-3 rounded-lg cursor-pointer"
        onClick={() =>
          //   query.page < total_pages &&
          setQuery({ ...query, page: query.page + 1 })
        }
      >
        Right
      </div>
    </div>
  );
};

export default Pagination;
