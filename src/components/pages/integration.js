import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const Integration = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [integrationSuccess, setIntegrationSuccess] = useState(null);
  const navigate = useNavigate();

  const testChatbot = () => {
    window.open("https://client.com", "_blank");
  };

  const testIntegration = () => {
    const testWindow = window.open("test-integrate.html", "_blank", "width=800,height=600");
    setTimeout(() => {
      const success = Math.random() > 0.3;  
      setIntegrationSuccess(success);
      testWindow.postMessage({ success }, "*");
    }, 2000);
  };

  const PostMessage = (event) => {
    if (event.origin !== window.location.origin) return; 
    const { success } = event.data;
    setIntegrationSuccess(success);
  };

  useEffect(() => {
    window.addEventListener("message", PostMessage);
    return () => {
      window.removeEventListener("message", PostMessage);
    };
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Chatbot Integration & Testing</h1>

      <button
        onClick={testChatbot}
        className="bg-blue-500 text-white p-2 w-full rounded-md mb-4"
      >
        Test Chatbot
      </button>

      <button
        onClick={() => setShowInstructions(true)}
        className="bg-green-500 text-white p-2 w-full rounded-md mb-4"
      >
        Integrate on Your Website
      </button>

      {showInstructions && (
        <div className="border p-4 rounded-md bg-gray-100 mt-4">
          <h2 className="text-lg font-semibold">Integration Instructions</h2>
          <p>Copy and paste the following script inside your &lt;head&gt; tag:</p>
          <pre className="bg-white p-2 rounded-md mt-2 overflow-x-auto">
            <code className="text-sm">{`<script src="https://your-chatbot-url.com/chatbot.js"></script>`}</code>
          </pre>
          <button
            onClick={() => alert("Instructions sent to developer!")}
            className="bg-gray-500 text-white p-2 mt-4 rounded-md"
          >
            Mail Instructions to Developer
          </button>
        </div>
      )}

      <button
        onClick={testIntegration}
        className="bg-purple-500 text-white p-2 w-full rounded-md mt-4"
      >
        Test Integration
      </button>
    </div>
  );
};

export default Integration;
