import "./App.css";
import { useState } from "react";
import NavBar from "./components/NavBar";

function App() {
  const api_url = 'https://back-roast-cv.onrender.com/roast_cv';

  const [filePath, setFilePath] = useState('');

  const handleFileChange = (event) => {
    const newFilePath = event.target.value;

    // Validate if the file path ends with ".pdf"
    if (newFilePath.endsWith('.pdf')) {
      setFilePath(newFilePath);
      // Send newFilePath to the backend using AJAX or fetch API
      console.log ('File path:', newFilePath); // For demonstration purposes
    } else {
      alert('Please enter a valid PDF file path.');
    }
  };

  const [roastResponse,setRoastResponse] = useState('')
  const handleSubmit = async () => {
  

    try {
      const formData = new FormData();
      formData.append('cv', filePath); // Replace 'file' with the desired field name in your backend

      const response = await fetch(api_url, { // Replace with your backend endpoint
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setRoastResponse(data.roaster_response)

      
    } catch (error) {
      console.log(error)
    } 
  }

  ;

  return <main className="bg-bgColor h-screen flex  ">
  <header className="no_underline">
  <NavBar/>
  </header>;

  {/* add the navaition here use the header and add a nav here*/ }
  <section className="m-10 leading-25  ">
    <div className="mb-3 text-4xl ">
      <h1> GET YOUR CV ROASTED BY AI   <br/></h1>
      <h1> GET YOUR CV MARKED  BY AI   <br/></h1>
      <h1>AND  IMPROVED BY AI   <br/></h1>
    </div>

    <p className=" text-textColor mb-8">Receive instant, honest feedback from our <br/>
       AI-powered tool to make your CV stand out!</p>
       <div className="">

      <input className="block mb-2 "
        type="file"
        placeholder="Enter file path"
        value={filePath}
        onChange={handleFileChange}
      />
       <input  className=" p-1 bg-btColor text-white " type="submit" value="Submit" onClick={handleSubmit}/>
    </div>
  </section>

  {/* the main section of the landing page here */ }


  {/* the footer here */ }


<p className=" ">{roastResponse?roastResponse:"Rien a affiché"}</p>
 </main>;

}

export default App;
