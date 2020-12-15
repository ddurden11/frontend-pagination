import React from "react";
import { useEffect } from "react";
import "./index.css";

export default function Pagination2(props) {
  const { commentsPerPage, totalComments, paginate, currentPage } = props;

  const pageNumbers = [];

  useEffect(() => {}, []);

  //get the total amount of pages for content. Total Data Size / Data Segment Size = # Segments
  //push each page into page number array
  for (
    let index = 1;
    index <= Math.ceil(totalComments / commentsPerPage);
    index++
  ) {
    pageNumbers.push(index);
  }

  //constants for the breaks in pagination bar
  const LEFT = "LEFT";
  const RIGHT = "RIGHT";

  //function to update the pagination bar on page change
  function getPageNumbers() {
    //The number of page numbers displayed on either side of the current page in the pagination bar.
    const pageNeighbors = 1;
    const totalPages = pageNumbers.length;

    //The total number of page numbers on pagination bar. First page, last page, and the current page, plus the neighbors on either side.
    const totalNumbers = 3 + pageNeighbors * 2;

    //if there are more pages than we want to put on the pagination bar
    if (totalPages > totalNumbers) {
      /*
        the first and the last pages will always be shown. Therefore, the page numbers inbetween will be determined by the index
        variables below.
    */
      const start = Math.max(2, currentPage - pageNeighbors);
      const end = Math.min(totalPages - 1, currentPage + pageNeighbors);

      //array variable to hold the inbetween pages.
      let middle = [];

      //populate the array using the indexes
      for (let index = start; index <= end; index++) {
        middle.push(index);
      }

      //these variables are to determine if there are hidden numbers to the right or left.
      const hasMoreLeft = start > 2;
      const hasMoreRight = totalPages - end > 1;

      //this offset variable is to help display the proper numbers when you are on pages close to the first/last pages.
      const offset = totalNumbers - (middle.length + 1);

      if (hasMoreLeft && !hasMoreRight) {
        let extra = [];

        for (let index = start - offset; index < start - 1; index++) {
          extra.push(index + 1);
        }
        middle = [LEFT, ...extra, ...middle];
      } else if (!hasMoreLeft && hasMoreRight) {
        let extra = [];
        for (let index = end + 1; index < end + offset; index++) {
          extra.push(index);
        }
        middle = [...middle, ...extra, RIGHT];
      } else {
        middle = [LEFT, ...middle, RIGHT];
      }

      return [1, ...middle, totalPages];
    }

    //Return the whole array if the number of pages is less than the number of pages to be displayed on the pagination bar.
    return pageNumbers;
  }

  const updatedPages = getPageNumbers();

  return (
    <div>
      <nav className="container">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a
              onClick={() => paginate(currentPage - 1)}
              href="/paginate/!#"
              className="page-link"
            >
              <span className="prev">&laquo;</span>
            </a>
          </li>

          {updatedPages.map((number, index) => {
            if (number === LEFT || number === RIGHT)
              return (
                <li className="break" key={index + 50}>
                  <span>...</span>
                </li>
              );

            return (
              <li
                className={`page-item ${
                  currentPage === number ? "active" : ""
                }`}
                key={index}
              >
                <a
                  onClick={() => paginate(number)}
                  href="#"
                  className="page-link"
                >
                  {number < 10 ? `0${number}` : number}
                </a>
              </li>
            );
          })}
          <li className="page-item">
            <a
              onClick={() => paginate(currentPage + 1)}
              href="/paginate/!#"
              className="page-link"
            >
              <span className="next">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
