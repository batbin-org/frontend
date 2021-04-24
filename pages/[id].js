import React from 'react';
import { useRef } from 'react';
import TopBar from '../components/TopBar';
import Viewer from '../components/Viewer';
import highlight from 'highlight.js';
import axios from 'axios';
import Head from 'next/head';

function getPreviewUrl(id, ext) {
  const splitId = id.split('.')[0];
  if(ext == undefined) {
    return `https://p.uditkaro.de/p/${splitId}`;
  } else {
    return `https://p.uditkaro.de/pk/${splitId}/${ext}`;
  }
};

const Fetcher = ({ content, id, ext }) => {
  const editorRef = useRef(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", overflowX: 'hidden', height: "100%" }}>
        <Head>
          { id !== undefined &&
              <>
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:image" content={getPreviewUrl(id, ext)} />
                <meta property="og:image" content={getPreviewUrl(id, ext)} />
              </>
          }
        </Head>
        <TopBar editorRef={editorRef} buttonText="New" buttonAction={() => { window.location = "https://b.uditkaro.de" }} />
        <Viewer content={content} />
    </div>
  );
}

const getHtmlFromCode = (code, language) => {
  const retval = highlight
          .highlightAuto(code, language)
          .value
          .split('\n')
          .map((l, n) => {
            return `<tr><td class="line-number">${n+1}</td><td>${l}</td></tr>`;
          }).join('');

  return `<table>${retval}</table>`;
}

const makeProp = (content, id, ext) => { return { props: { content, id, ext } } };

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  try {
    const [actualId, language] = id.split('.');
    const response = (await axios.get(`http://localhost:3849/get?id=${actualId}`)).data;
    if(response.status === "failure") {
      return makeProp(response.message);
    } else {
      return makeProp(getHtmlFromCode(response + "\n", language ? [language] : undefined), id, language);
    }
  } catch(e) {
    return makeProp("Could not fetch paste!");
  }
}

export default Fetcher;
