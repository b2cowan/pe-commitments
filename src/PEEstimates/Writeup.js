import React from "react";

function Writeup() {
  const documentURL =
    "https://docs.google.com/document/d/1TmWNoiov-478VvHNijRtQq9CJDoKdXgh_TrJiPwF9Qo/edit";
  return (
    <div>
      <iframe src={documentURL} width="100%" height="600px" title="writeup" />
    </div>
  );
}

export default Writeup;
