import React from "react";
import { useRef } from "react";
import TopBar from "../components/TopBar";
import Viewer from "../components/Viewer";
import Head from "next/head";
import { extensions, fetchConfig, BIN_HOST } from "../constants";
import { getHtmlFromCode, getPreviewUrl, makeProp } from "../utils";
import { fetch } from "../components/api";

const Fetcher = ({ content, id, ext }) => {
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
        {id !== undefined && (
          <>
            <meta name="twitter:card" content="summary_large_image" />
            {["twitter", "og"].map((x) => (
              <meta
                key={x}
                property={`${x}:image`}
                content={getPreviewUrl(id, ext)}
              />
            ))}
          </>
        )}
      </Head>
      <TopBar
        editorRef={editorRef}
        buttonText="New"
        buttonAction={() => {
          window.location = BIN_HOST;
        }}
      />
      <Viewer content={content} />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  try {
    const [actualId, language] = id.split(".");

    const response = await fetch(actualId, fetchConfig);

    if (response.success === false) {
      return makeProp(response.message);
    } else {
      /*
        The previewer bugs out when the language is JS for some reason,
        so it'll be better to use ts instead since the highlighting is
        on point anyway. TODO: remove this when the previewer bug has
        been fixed.
      */
      const highlighted = getHtmlFromCode(
        response + "\n",
        language ? [language] : undefined
      );

      return makeProp(
        highlighted.content,
        id,
        language !== undefined
          ? language === "js"
            ? "ts"
            : language
          : extensions[highlighted.language.toLowerCase()]
      );
    }
  } catch (e) {
    return makeProp(`Could not fetch paste because ${e}`);
  }
};

export default Fetcher;
