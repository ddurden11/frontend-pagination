import { getByTestId, render, screen } from "@testing-library/react";
import Pagination2 from "./Pagination2";

let currentPage = 32;
let commentsPerPage = 15;
let totalComments = 500;
let lastPage = Math.ceil(totalComments / commentsPerPage);

function paginate(page) {
  currentPage = page;
}

test("should display the correct page", () => {
  let middleNumbers = [];

  if (currentPage === 1 || currentPage === 2 || currentPage === 3) {
    middleNumbers = [2, 3, 4];
  } else if (
    currentPage === lastPage - 2 ||
    currentPage === lastPage - 1 ||
    currentPage === lastPage
  ) {
    middleNumbers = [lastPage - 3, lastPage - 2, lastPage - 1];
  } else {
    middleNumbers = [currentPage - 1, currentPage, currentPage + 1];
  }
  let pageNumbers = [1, ...middleNumbers, lastPage];

  console.log(pageNumbers);
  const { getByText } = render(
    <Pagination2
      commentsPerPage={commentsPerPage}
      totalComments={totalComments}
      paginate={paginate}
      currentPage={currentPage}
    />
  );
  pageNumbers.forEach((number) => {
    if (number < 10) expect(getByText(`0${number}`)).toBeInTheDocument();
    else expect(getByText(number)).toBeInTheDocument();
  });
});
