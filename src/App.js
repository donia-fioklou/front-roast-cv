import "./App.css";
import { useState } from "react";
import NavBar from "./components/NavBar";
const MarkdownIt = require("markdown-it");
const api_url = "https://back-roast-cv.onrender.com/roast_cv";
const md = new MarkdownIt();

function App() {
  const [filePath, setFilePath] = useState(null);

  const handleFileChange = (event) => {
    const newFilePath = event.target.files[0];
    setFilePath(newFilePath);
  };

  const [roastResponse, setRoastResponse] = useState("");
  const handleSubmit = async (file) => {
    try {
      const formData = new FormData();
      formData.append("cv", filePath); // Replace 'file' with the desired field name in your backend

      const response = await fetch(api_url, {
        // Replace with your backend endpoint
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setRoastResponse(data.roaster_response);
    } catch (error) {
      console.log(error);
    }
  };
  let htmlContent = "";

  if (roastResponse) {
    htmlContent = md.render(roastResponse);
  }

  return (
    <main className=" bg-bgColor h-screen ">
      <header className="no_underline">
        <NavBar />
      </header>
      {/* add the navaition here use the header and add a nav here*/}
      <section className="m-10 leading-25  h-screen space-y-8 ">
        <div className="mb-3 text-5xl space-y-4 ">
          <h1>
            {" "}
            GET YOUR CV ROASTED BY AI <br />
          </h1>
          <h1>
            {" "}
            GET YOUR CV MARKED BY AI <br />
          </h1>
          <h1>
            AND IMPROVED BY AI <br />
          </h1>
        </div>
        <p className=" text-textColor text-xl mb-8">
          Receive instant, honest feedback from our <br />
          AI-powered tool to make your CV stand out!
        </p>
        <form onClick={handleSubmit} className="space-y-4">
          <input
            className="block mb-2 text-2xl  "
            type="file"
            placeholder="Enter file path"
            // value={filePath}
            onChange={handleFileChange}
          />
          <button
            className=" text-xl p-1 bg-btColor text-white px-6 "
            type="submit"
          >
            Send my cv
          </button>
        </form>
        <div>
          {" "}
          {roastResponse ? (
            <div
              className="mx-10"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            ></div>
          ) : (
            <p>hi</p>
          )}
        </div>
      </section>
      {/* the main section of the landing page here */}
      {/* the footer here */}
    </main>
  );
}

export default App;
