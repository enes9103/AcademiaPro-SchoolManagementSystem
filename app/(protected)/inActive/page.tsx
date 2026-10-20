import React from "react";

const Page = () => {
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          height: 0,
          paddingBottom: "55.46875%",
          position: "relative",
          width: "100%",
        }}
      >
        <iframe
          allowFullScreen={true}
          frameBorder="0"
          height="100%"
          src="https://giphy.com/embed/JnLrDWfy1j9fXeqW7t/video"
          style={{ left: 0, position: "absolute", top: 0 }}
          width="100%"
        ></iframe>
      </div>
    </div>
  );
};

export default Page;
