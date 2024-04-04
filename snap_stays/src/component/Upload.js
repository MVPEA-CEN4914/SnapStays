import React, { createContext, useEffect, useState } from "react";
import Button from  "@mui/material/Button";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function Upload({ uwConfig, setImageUrl }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setImageUrl(result.info.secure_url);
          }
        }
      );

      document.getElementById("upload_widget").addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <Button
        id="upload_widget"
        onClick={initializeCloudinaryWidget}
        color="secondary"
        variant="contained"
      >
        Upload
      </Button>
    </CloudinaryScriptContext.Provider>
  );
}

export default Upload;
export { CloudinaryScriptContext };
