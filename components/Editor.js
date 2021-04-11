import React, { useEffect } from "react";

export default function Editor({ editorRef }) {

  useEffect(() => {
    document.addEventListener("keydown", function(e) {
      if (e.key === "s" && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        (async () => {
          try {
            const form = new FormData();
            form.append('content', editorRef.current.value);
            axios.post('https://b.uditkaro.de/api/set', form).then(result => {
              if(result.data.status === "success") {
                window.location = `https://b.uditkaro.de/fetch/${result.data.message}`;
              } else if(result.data.status === "failure") {
                alert(result.data.message);
              } else {
                console.log(`Received invalid response ${result.data}`)
              }
            }).catch(e => {
              console.log("ERR>" + e);
            });
          } catch(e) {
            console.log(e.message);
          }
        })()
      }
    }, false);
  }, [editorRef]);

  return (
    <textarea
      autoFocus={true}
      style={{
        backgroundColor: "#101010",
        resize: "none",
        borderWidth: 0,
        flexGrow: 1,
        color: "#fbfbfb",
        fontSize: 16,
        padding: 10,
        margin: 10,
        borderRadius: 10,
        outline: "none",
        fontFamily: 'Fira Mono'
      }}
      ref={editorRef}
      />
  );
}
