import { useState, useRef, useEffect } from "react";
import Send from "./assets/send.svg";
import ReactMarkdown from "react-markdown";


export default function Chat() {
  const [messages, setMessages] = useState([]); // store chat history
  const [input, setInput] = useState(""); // user input
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll to bottom when new message is added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      //  send request to FastAPI backend
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }), // ✅ matches backend model
      });

      const data = await res.json();

      const aiMessage = { sender: "ai", text: data.response };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: " Something went wrong. Try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) sendMessage();
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-[url('./assets/background.png')] bg-cover">
      
      {/* Header */}
      <div className="w-full bg-light p-6 text-center fixed top-0">
        <h1 className="font-montserrat text-4xl">Ask Mama Put 👩🏿‍🍳</h1>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto mt-24 mb-20 p-4 scrollbar-hide">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`my-2 flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 max-w-xs md:max-w-md rounded-2xl ${
                msg.sender === "user"
                  ? "bg-light text-dark"
                  : "bg-gray-200 text-dark"
              }`}
            >
              <ReactMarkdown>
                {msg.text}
                </ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-gray-500 italic text-sm mt-2">
            Mama Put is thinking...
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-2 bg-light mb-2 flex items-center fixed bottom-0 w-full">
        <input
          type="text"
          className="bg-white rounded-md p-2 w-full focus:outline-none"
          placeholder="Let Mama Cook!..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={loading}
        />
        <button
          className="bg-transparent border-0 p-0"
          onClick={sendMessage}
          disabled={loading}
        >
          <img src={Send} className="w-8 h-8 ml-2 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
