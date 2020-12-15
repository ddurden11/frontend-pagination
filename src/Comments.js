import React from "react";

export default function Comments(props) {
  const { comments, loading } = props;

  if (loading) {
    return <h2 data-testid="loading">Loading...</h2>;
  }
  return (
    <div>
      <div role="article">
        {comments.map((comment, index) => (
          <p key={index}>{comment.id}</p>
        ))}
      </div>
    </div>
  );
}
