import React from 'react';
import { useRef } from 'react';
import TopBar from '../components/TopBar';
import Viewer from '../components/Viewer';
import highlight from 'highlight.js';
import axios from 'axios';
import Head from 'next/head';

const getPreviewUrl = (id, ext) => {
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

const languageExts = {
  "1c": "1c",
  "abnf": "abnf",
  "accesslog": "accesslog",
  "actionscript": "as",
  "ada": "ada",
  "angelscript": "asc",
  "apache": "apacheconf",
  "applescript": "osascript",
  "arcade": "arcade",
  "arduino": "ino",
  "armasm": "arm",
  "asciidoc": "adoc",
  "aspectj": "aspectj",
  "autohotkey": "ahk",
  "autoit": "autoit",
  "avrasm": "avrasm",
  "awk": "awk",
  "axapta": "x++",
  "bash": "sh",
  "basic": "basic",
  "bnf": "bnf",
  "brainfuck": "bf",
  "cal": "cal",
  "capnproto": "capnp",
  "ceylon": "ceylon",
  "c": "c",
  "clean": "icl",
  "clojure": "clj",
  "cmake": "cmake.in",
  "coffeescript": "coffee",
  "coq": "coq",
  "cos": "cls",
  "cpp": "cpp",
  "crmsh": "crm",
  "crystal": "cr",
  "csharp": "cs",
  "csp": "csp",
  "css": "css",
  "dart": "dart",
  "delphi": "dpr",
  "diff": "patch",
  "django": "jinja",
  "d": "d",
  "dns": "bind",
  "dockerfile": "docker",
  "dos": "bat",
  "dsconfig": "dsconfig",
  "dts": "dts",
  "dust": "dst",
  "ebnf": "ebnf",
  "elixir": "elixir",
  "elm": "elm",
  "erb": "erb",
  "erlang": "erl",
  "erlang-repl": "erlang-repl",
  "excel": "xlsx",
  "fix": "fix",
  "flix": "flix",
  "fortran": "f90",
  "fsharp": "fs",
  "gams": "gms",
  "gauss": "gss",
  "gcode": "nc",
  "gherkin": "feature",
  "glsl": "glsl",
  "gml": "gml",
  "go": "golang",
  "golo": "golo",
  "gradle": "gradle",
  "groovy": "groovy",
  "haml": "haml",
  "handlebars": "hbs",
  "haskell": "hs",
  "haxe": "hx",
  "hsp": "hsp",
  "hy": "hylang",
  "inform7": "i7",
  "ini": "toml",
  "irpf90": "irpf90",
  "isbl": "isbl",
  "java": "java",
  "javascript": "js",
  "jboss-cli": "wildfly-cli",
  "json": "json",
  "julia": "julia",
  "julia-repl": "jldoctest",
  "kotlin": "kt",
  "lasso": "ls",
  "latex": "tex",
  "ldif": "ldif",
  "leaf": "leaf",
  "less": "less",
  "lisp": "lisp",
  "livescript": "ls",
  "llvm": "llvm",
  "lsl": "lsl",
  "lua": "lua",
  "makefile": "mk",
  "markdown": "md",
  "mathematica": "mma",
  "matlab": "matlab",
  "maxima": "maxima",
  "mel": "mel",
  "mercury": "m",
  "mipsasm": "mips",
  "mizar": "mizar",
  "monkey": "monkey",
  "moonscript": "moon",
  "n1ql": "n1ql",
  "nestedtext": "nt",
  "nginx": "nginxconf",
  "nim": "nim",
  "nix": "nixos",
  "nsis": "nsis",
  "objectivec": "objc",
  "ocaml": "ml",
  "openscad": "scad",
  "oxygene": "oxygene",
  "parser3": "parser3",
  "perl": "pl",
  "pf": "pf.conf",
  "pgsql": "postgres",
  "php": "php",
  "plaintext": "txt",
  "pony": "pony",
  "powershell": "ps",
  "processing": "pde",
  "profile": "profile",
  "prolog": "prolog",
  "properties": "properties",
  "protobuf": "protobuf",
  "puppet": "pp",
  "purebasic": "pb",
  "python": "py",
  "python-repl": "pycon",
  "q": "k",
  "qml": "qt",
  "reasonml": "re",
  "rib": "rib",
  "r": "r",
  "roboconf": "graph",
  "routeros": "mikrotik",
  "rsl": "rsl",
  "ruby": "rb",
  "ruleslanguage": "ruleslanguage",
  "rust": "rs",
  "sas": "sas",
  "scala": "scala",
  "scheme": "scheme",
  "scilab": "sci",
  "scss": "scss",
  "shell": "console",
  "smali": "smali",
  "smalltalk": "st",
  "sml": "ml",
  "sqf": "sqf",
  "sql": "sql",
  "stan": "stanfuncs",
  "stata": "do",
  "step21": "p21",
  "stylus": "styl",
  "subunit": "subunit",
  "swift": "swift",
  "taggerscript": "taggerscript",
  "tap": "tap",
  "tcl": "tk",
  "thrift": "thrift",
  "tp": "tp",
  "twig": "craftcms",
  "typescript": "ts",
  "vala": "vala",
  "vbnet": "vb",
  "vbscript-html": "vbscript-html",
  "vbscript": "vbs",
  "verilog": "v",
  "vhdl": "vhdl",
  "vim": "vim",
  "wasm": "wasm",
  "x86asm": "x86asm",
  "xl": "tao",
  "xml": "xml",
  "xquery": "xpath",
  "yaml": "yml",
  "zephir": "zep",
};

const getHtmlFromCode = (code, language) => {
  const hl = highlight.highlightAuto(code, language);

  const retval = hl.value.split('\n')
                      .map((l, n) => {
                        return `<tr><td class="line-number">${n+1}</td><td>${l}</td></tr>`;
                      }).join('');

  return {
    content: `<table>${retval}</table>`,
    language: hl.language
  };
}

const makeProp = (content, id, ext) => { return { props: { content, id, ext } } };

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  try {
    const [actualId, language] = id.split('.');
    const response = (await axios.get(`http://localhost:3849/paste/${actualId}`)).data;
    if(response.status === "failure") {
      return makeProp(response.message);
    } else {
      const highlighted = getHtmlFromCode(response + "\n", language ? [language] : undefined);
      return makeProp(highlighted.content, id, language !== undefined ? language : languageExts[highlighted.language.toLowerCase()]);
    }
  } catch(e) {
    return makeProp("Could not fetch paste!");
  }
}

export default Fetcher;
