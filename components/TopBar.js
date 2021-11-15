import React from "react";
import { Button } from "@primer/components";

export default function TopBar({ buttonText, buttonAction }) {
  const tagColor = { color: "#6BA2F0" };

  return (
    <div
      className="shadow-2xl"
      style={{
        width: "100%",
        backgroundColor: "#010101",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <h2 style={{ color: "#fbfbfb", fontFamily: "Fira Mono, monospace" }}>
        <span style={tagColor}>&lt;</span>BatBin
        <span style={tagColor}>/&gt;</span>
      </h2>

      <div>
        <Button
          backgroundColor="#010101"
          color="#fbfbfb"
          style={{ marginRight: 10 }}
          onClick={() => {
            window.location = "https://github.com/batbin-org";
          }}
        >
          Source
        </Button>

        <Button
          backgroundColor="#1f61c8"
          color="#fbfbfb"
          style={{ marginRight: 10 }}
          onClick={buttonAction}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
