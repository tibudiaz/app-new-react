import React from "react";
import { DotWave } from "@uiball/loaders";

export const Loader = () => {
  const styles = {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={styles}>
      <DotWave
        size={47}
        speed={1}
        color="white"
      />
    </div>
  );
};
