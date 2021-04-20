import React from 'react';
import { useRef } from 'react';
import TopBar from '../components/TopBar';
import Viewer from '../components/Viewer';
import highlight from 'highlight.js';
import axios from 'axios';
import Head from 'next/head';

const Fetcher = ({ content, id }) => {
  const editorRef = useRef(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", overflowX: 'hidden', height: "100%" }}>
        <Head>
          <meta property="og:title" content={`${id}`} />
          <meta property="og:type" content="website"/>
          <meta property="og:site_name" content="Batbin"/>
          { id !== undefined &&
              <meta property="og:image" content={`https://p.uditkaro.de/p/${id.split('.')[0]}`} />
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

const makeProp = (content, id) => { return { props: { content, id } } };

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  try {
    const [actualId, language] = id.split('.');
    const response = (await axios.get(`http://localhost:3849/get?id=${actualId}`)).data;
    if(response.status === "failure") {
      return makeProp(response.message);
    } else {
      return makeProp(getHtmlFromCode(response + "\n", language ? [language] : undefined), id);
    }
  } catch(e) {
    return makeProp("Could not fetch paste!");
  }
}

export default Fetcher;