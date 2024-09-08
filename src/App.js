import "./App.css";
import { useState } from "react";
import NavBar from "./components/NavBar";
import FileUpload from "./components/uploadFile";
import "@fontsource/poppins";
import roasting_lg from './assets/roasting_lg.png';
const MarkdownIt = require("markdown-it");
const api_url = "https://back-roast-cv.onrender.com/roast_cv";
const md = new MarkdownIt();


function App() {
  const [filePath, setFilePath] = useState(null);
  const [roastResponse, setRoastResponse] = useState(null);
  const [ isLoading, setIsLoading] = useState(false)

  const buttonStyle = filePath
    ? `bg-btColor`
    : `bg-gray-300`;


  const handleFileChange = (event) => {
    const newFilePath = event.target.files[0];
    setFilePath(newFilePath);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)
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
      <section className="mx-10 flex leading-15  h-screen    ">
        <div className=" ">

        <div className=" mt-3 text-2xl space-y-1 font-poppins ">
          <h1>
            {" "}
            GET YOUR CV ROASTED BY AI   
          </h1>
          <h1>
            {" "}
            GET YOUR CV MARKED BY AI 
          </h1>
          <h1>
            AND IMPROVED BY AI
          </h1>
          
        </div>
        <p className=" text-textColor text-xl font-poppins mb-8">
          Receive instant, honest feedback from our <br />
          AI-powered tool to make your CV stand out!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="block mb-2 text-2xl font-poppins "
            type="file"
            placeholder="Enter file path"
            onChange={handleFileChange}
          />
          
          <button
            className={`text-xl font-poppins hover:bg-slate-900 hover:scale-105 rounded-[4px] hover:ml-1  p-1 ${buttonStyle} text-white px-6`}
            type="submit"
          >
            {!isLoading&& "Send my cv"}
            
            {filePath && isLoading&&!roastResponse&&<img 
              alt="loading..." 
              height="20"
              width="20"
              className="black"
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3ClinearGradient id='a11'%3E%3Cstop offset='0' stop-color='%23000000' stop-opacity='0'%3E%3C/stop%3E%3Cstop offset='1' stop-color='%23FFFFFF'%3E%3C/stop%3E%3C/linearGradient%3E%3Ccircle fill='none' stroke='url(%23a11)' stroke-width='15' stroke-linecap='round' stroke-dasharray='0 44 0 44 0 44 0 44 0 360' cx='100' cy='100' r='70' transform-origin='center'%3E%3CanimateTransform type='rotate' attributeName='transform' calcMode='discrete' dur='2' values='360;324;288;252;216;180;144;108;72;36' repeatCount='indefinite'%3E%3C/animateTransform%3E%3C/circle%3E%3C/svg%3E"
            />}
          {roastResponse&& "Send my cv" }
          </button>

        </form>
        <div>
          {" "}
          {roastResponse ? (
            <div
              className="mx-10 font-poppins"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            ></div>
          ) : (
            <p></p>
          )}
        </div>
        </div>
        <div className="">
          <img src={roasting_lg} height="100"  alt="lg" />
        </div>
      </section>  
      {/* the main section of the landing page here */}
      {/* the footer here */}
     
    </main>
  );
}

export default App;
