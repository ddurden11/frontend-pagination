import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import Comments from "./Comments";
import Pagination from "./Pagination";
import Pagination2 from "./Pagination2";

import Button from "./button";

function App() {
  //all the comments
  const [comments, setComments] = useState([]);

  const [loading, setLoading] = useState([false]);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage, setCommentsPerPage] = useState(15);

  //including the empty dependency list makes useEffect behave like ComponentDidMount
  useEffect(() => {
    //api call to jsonplaceholder, need async/await
    const getComments = async () => {
      //loading data
      setLoading(true);
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );
      setComments(res.data);

      //done loading
      setLoading(false);
    };

    getComments();
  }, []);

  //get the comments for the current page
  const lastCommentIndex = currentPage * commentsPerPage;
  const firstCommentIndex = lastCommentIndex - commentsPerPage;
  const currentComments = comments.slice(firstCommentIndex, lastCommentIndex);

  function paginate(pageObject) {
    setCurrentPage(pageObject.selected + 1);
  }

  function paginate2(number) {
    if (number > 0 && number <= Math.ceil(comments.length / commentsPerPage))
      setCurrentPage(number);
  }

  return (
    <Router>
      <div className="App">
        <h1>Comments</h1>
        <Comments comments={currentComments} loading={loading} />
        {/*<Button label="Cool Button" />*/}
        <Switch>
          <Route path="/react-paginate">
            <Pagination
              commentsPerPage={commentsPerPage}
              totalComments={comments.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </Route>
          <Route path="/">
            <Pagination2
              commentsPerPage={commentsPerPage}
              totalComments={comments.length}
              paginate={paginate2}
              currentPage={currentPage}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
