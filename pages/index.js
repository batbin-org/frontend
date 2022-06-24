import React, { useRef } from "react";
import TopBar from "../components/TopBar";
import Editor from "../components/Editor";
import { BIN_HOST, createConfig } from "../constants";
import Head from "next/head";
import { save } from "../components/api";

function App() {
  const editorRef = useRef(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        height: "100%",
      }}
    >
      <Head>
        {/* Chrome, Firefox OS and Opera */}
        <meta name="theme-color" content="#000000" />

        {/* Windows Phone */}
        <meta name="msapplication-navbutton-color" content="#000000" />
        {/* iOS Safari */}
        <meta name="apple-mobile-web-app-status-bar-style" content="#000000" />

        {/* Favicons */}
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
      </Head>
      <TopBar
        buttonText="Save"
        buttonAction={() =>
          save(
            editorRef.current.value,
            createConfig,
            (data) => (window.location = `${BIN_HOST}/${data.message}`),
            alert
          )
        }
      />
      <Editor editorRef={editorRef} />
    </div>
  );
}

export default App;
