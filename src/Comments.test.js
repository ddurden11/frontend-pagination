import {
  getByTestId,
  render,
  screen,
  waitFor,
  getByRole,
} from "@testing-library/react";
import Comments from "./Comments";
import axios from "axios";

let comments = [];

function allComments() {
  axios
    .get("https://jsonplaceholder.typicode.com/comments")
    .then((res) => (comments = res.data))
    .catch((err) => {
      throw err;
    });
}

const mockComments = [
  {
    postId: 1,
    id: 1,
    name: "id labore ex et quam laborum",
    email: "Eliseo@gardner.biz",
    body:
      "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
  },
  {
    postId: 1,
    id: 2,
    name: "quo vero reiciendis velit similique earum",
    email: "Jayne_Kuhic@sydney.com",
    body:
      "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et",
  },
  {
    postId: 1,
    id: 3,
    name: "odio adipisci rerum aut animi",
    email: "Nikita@garfield.biz",
    body:
      "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione",
  },
  {
    postId: 1,
    id: 4,
    name: "alias odio sit",
    email: "Lew@alysha.tv",
    body:
      "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati",
  },
  {
    postId: 1,
    id: 5,
    name: "vero eaque aliquid doloribus et culpa",
    email: "Hayden@althea.biz",
    body:
      "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et",
  },
];

test("should display 'Loading...' when loading comments", () => {
  const { getByText } = render(
    <Comments loading={true} comments={[1, 2, 3]} />
  );
  expect(getByText("Loading...")).toBeInTheDocument();
});

test("should not display 'Loading...' when not loading comments", () => {
  const { queryByTestId } = render(
    <Comments loading={false} comments={[1, 2, 3]} />
  );
  expect(queryByTestId("loading")).not.toBeInTheDocument();
});

test("should display comments when loaded", () => {
  const { getByText } = render(
    <Comments loading={false} comments={mockComments} />
  );

  for (let i = 0; i < mockComments.length; i++) {
    let comment = getByText(mockComments[i].id);
    expect(comment).toBeInTheDocument();
  }
});

test("should display all comments", () => {
  allComments();
  const { getByText } = render(
    <Comments loading={false} comments={mockComments} />
  );

  for (let i = 0; i < mockComments.length; i++) {
    let query = getByText(`${i + 1}`);
    expect(query).toBeInTheDocument();
  }
});
