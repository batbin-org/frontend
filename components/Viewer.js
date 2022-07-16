import React from "react";
import "../node_modules/highlight.js/styles/atom-one-dark.css";

function Viewer({ content }) {
  return (
    <code
      class="codeline"
      style={{
        color: "#fbfbfb",
        overflowX: "auto",
        paddingTop: 3,
        paddingLeft: 20,
        fontSize: 16,
        fontFamily: "Fira Mono, monospace",
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export default Viewer;
