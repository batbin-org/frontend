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
  const isLengthFine = code.length < 15000;
  const hl = isLengthFine ? highlight.highlightAuto(code, language) : code;

  const retval = (hl.value ?? hl)
    .split("\n")
    .map((l, n) => {
      return `<tr><td class="line-number">${n + 1}</td><td>${l}</td></tr>`;
    })
    .join("");

  return {
    content: `<table>${retval}</table>`,
    language: isLengthFine ? hl.language : "large-text",
  };
};

export const makeProp = (content, id, ext) => {
  return { props: { ...(content && { content }), ...(id && { id }), ...(ext && { ext }) } };
};
