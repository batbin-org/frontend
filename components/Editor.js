import React, { useEffect } from "react";
import { BIN_HOST, createConfig } from "../constants";
import { save } from "./api";

export default function Editor({ editorRef }) {
  useEffect(() => {
    document.addEventListener(
      "keydown",
      (e) => {
        if (
          e.key === "s" &&
          (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
        ) {
          e.preventDefault();
          save(
            editorRef.current.value,
            createConfig,
            (data) => (window.location = `${BIN_HOST}/${data.message}`),
            alert
          );
        }
      },
      false
    );
  }, [editorRef]);

  return (
    <textarea
      autoFocus={true}
      style={{
        backgroundColor: "#101010",
        resize: "none",
        padding: 10,
        borderWidth: 0,
        flexGrow: 1,
        color: "#fbfbfb",
        fontSize: 16,
        margin: 10,
        borderRadius: 10,
        outline: "none",
        fontFamily: "Fira Mono, monospace",
      }}
      ref={editorRef}
    />
  );
}
