import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const Setup = () => {
  const [companyName, setCompanyName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [description, setDescription] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [Training, setTraining] = useState(false);
  const navigate = useNavigate();

  const dummyPages = [
    { url: "https://example.com/about", status: "Scraped" },
    { url: "https://example.com/services", status: "Pending" },
    { url: "https://example.com/contact", status: "Scraped" },
  ];

  const dataChunks = {
    "https://example.com/about": ["About Us - Company History", "Mission Statement","Development"],
    "https://example.com/contact": ["Email: example@gmail.com", "Phone: +1234567890","Address: xyz"],
  };

  useEffect(() => {
    setPages(dummyPages);
  }, []);

  const fetchMetaDescription = async () => {
    if (!websiteUrl) return;
    try {
      const response = await axios.get(
        `https://api.allorigins.win/get?url=${encodeURIComponent(websiteUrl)}`
      );
      const html = response.data.contents;
      const match = html.match(/<meta name="description" content="(.*?)"/i);
      if (match) setMetaDescription(match[1]);
    } catch (error) {
      console.error("Failed to fetch meta description:", error);
    }
  };

  const startTraining = () => {
    setTraining(true);
    setTimeout(() => {
      setTraining(false);
      setPages(pages.map((page) => ({ ...page, status: "Scraped" })));
    }, 3000);
  };

  const NextStep = () => {
    navigate("/integration"); 
  };

  return (
    <div className="p-6 max-w-lg mx-auto border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Setup Organisation</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium">Company Name</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Company Website URL</label>
        <input
          type="text"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          className="border p-2 w-full"
          onBlur={fetchMetaDescription}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Company Description</label>
        <textarea
          value={description || metaDescription}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        ></textarea>
      </div>

      <h2 className="text-lg font-semibold mt-4">Detected Webpages</h2>
      <div className="border p-2 rounded-md mt-2">
        {pages.map((page) => (
          <div
            key={page.url}
            className={`p-2 cursor-pointer rounded-md ${page.status === "Scraped" ? "bg-green-100" : "bg-yellow-100"}`}
            onClick={() => setSelectedPage(page.url)}
          >
            {page.url} - <span className="font-bold">{page.status}</span>
          </div>
        ))}
      </div>

      {selectedPage && (
        <div className="mt-4 p-4 border rounded-md">
          <h3 className="text-lg font-semibold">Data from {selectedPage}</h3>
          <ul className="list-disc pl-5">
            {dataChunks[selectedPage]?.map((chunk, index) => (
              <li key={index}>{chunk}</li>
            )) || <p>No data found.</p>}
          </ul>
        </div>
      )}

      {Training ? (
        <p className="text-blue-500 text-center mt-4">⏳ Training in progress...</p>
      ) : (
        <div className="mt-4">
          <button
            onClick={startTraining}
            className="bg-blue-500 text-white p-2 w-full rounded-md mb-2"
          >
            Train Chatbot
          </button>
          <button
            className="bg-green-500 text-white p-2 w-full rounded-md"
            onClick={NextStep} 
          >
            Next Step
          </button>
        </div>
      )}
    </div>
  );
};

export default Setup;
