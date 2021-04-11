import React from 'react';
import { useRef } from 'react';
import TopBar from '../../components/TopBar';
import Viewer from '../../components/Viewer';
import highlight from 'highlight.js';
import axios from 'axios';

const Fetcher = ({ content }) => {
  const editorRef = useRef(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", overflowX: 'hidden', height: "100%" }}>
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

const makeProp = content => { return { props: { content } } };

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  try {
    const [actualId, language] = id.split('.');
    const response = (await axios.get(`http://localhost:3849/get?id=${actualId}`)).data;
    if(response.status === "failure") {
      return makeProp(response.message);
    } else {
      return makeProp(getHtmlFromCode(response + "\n", language ? [language] : undefined));
    }
  } catch(e) {
    return makeProp("Could not fetch paste!");
  }
}

export default Fetcher;