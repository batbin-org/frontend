import { PREVIEW_HOST } from "./constants";
import highlight from "highlight.js";

export const getPreviewUrl = (id, ext) => {
  const splitId = id.split(".")[0];
  if (ext == undefined) {
    return `${PREVIEW_HOST}/p/${splitId}`;
  } else {
    return `${PREVIEW_HOST}/pk/${splitId}/${ext}`;
  }
};

export const getHtmlFromCode = (code, language) => {
  const hl = highlight.highlightAuto(code, language);

  const retval = hl.value
    .split("\n")
    .map((l, n) => {
      return `<tr><td class="line-number">${n + 1}</td><td>${l}</td></tr>`;
    })
    .join("");

  return {
    content: `<table>${retval}</table>`,
    language: hl.language,
  };
};

export const makeProp = (content, id, ext) => {
  return { props: { content, id, ext } };
};
