import React, { useRef } from "react";
import TopBar from "../components/TopBar";
import Editor from "../components/Editor";
import axios from 'axios';

function App() {
  const editorRef = useRef(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", overflowX: 'hidden', height: "100%" }}>
      <TopBar buttonText="Save" buttonAction={async () => {
          try {
            const form = new FormData();
            form.append('content', editorRef.current.value);
            axios.post('https://b.uditkaro.de/api/set', form).then(result => {
              if(result.data.status === "success") {
                window.location = `https://b.uditkaro.de/${result.data.message}`;
              } else if(result.data.status === "failure") {
                alert(result.data.message);
              } else {
                console.log(`Received invalid response ${result.data}`)
              }
            }).catch(e => {
              console.log(`ERR> ${e}`);
            });
          } catch(e) {
            console.log(e.message);
          }
        }} />
      <Editor editorRef={editorRef} />
    </div>
  );
}

export default App;
