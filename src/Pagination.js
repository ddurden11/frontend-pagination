import React from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./index.css";

export default function Pagination(props) {
  const { commentsPerPage, totalComments, paginate, currentPage } = props;

  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(10);

  const pageNumbers = [];

  useEffect(() => {}, []);

  //get the total amount of pages for content. Total Data Size / Data Segment Size = # Segments
  //push each page into page number array
  for (let index = 1; index < totalComments / commentsPerPage; index++) {
    pageNumbers.push(index);
  }

  /* function prev() {
    if (start !== 1) {
      setEnd((prevEnd) => prevEnd - 5);
      setStart((prevStart) => prevStart - 5);
    }
  }

  function next() {
    if (end < pageNumbers.length) {
      setEnd((prevEnd) => {
        if (end + 5 > pageNumbers.length) return pageNumbers.length;
        else return prevEnd + 5;
      });
      setStart((prevStart) => prevStart + 5);
    }
  } */

  return (
    <div>
      {/* 
          Pagination component from react-paginate node module. getPageNumbers() not used - all logic handled
          by component 
        */}
      <ReactPaginate
        previousLabel={"«"}
        nextLabel={"»"}
        pageCount={pageNumbers.length}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={paginate}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        activeClassName={"active"}
        breakClassName={"break"}
        breakLinkClassName={"break"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
      />

      {/*<nav>
        <ul className="pagination">
          <li className="page-item">
            <a onClick={() => prev()} href="!#" className="page-link">
              Prev
            </a>
          </li>

          {pageNumbers
            .filter((number) => number >= start && number <= end)
            .map((number) => (
              <li className="page-item">
                <a
                  onClick={() => paginate(number)}
                  href="!#"
                  className="page-link"
                >
                  {number}
                </a>
              </li>
            ))}
          <li className="page-item">
            <a onClick={() => next()} href="!#" className="page-link">
              Next
            </a>
          </li>
        </ul>
            </nav>*/}
    </div>
  );
}
