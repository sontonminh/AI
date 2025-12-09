import { useState } from "react"; 
export default function Chat() { 
	const [messages, setMessages] = useState([{ role: "assistant", content: "Xin chào! Tôi có thể giúp gì cho bạn?" }]); 
    const [input, setInput] = useState(""); 
	const sendMessage = async () => { if (!input.trim()) return; 
	                                  const userMsg = { role: "user", content: input }; setMessages([...messages, userMsg]); setInput(""); 
									  const res = await fetch(import.meta.env.VITE_API_URL, { 
											method: "POST", 
											headers: { "Content-Type": "application/json", 
											            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` }, 
											body: JSON.stringify({ messages: [...messages, userMsg] }) }); 
									  const data = await res.json(); setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]); }; 
	return ( <div className="max-w-xl mx-auto p-4">
				<div className="border rounded-lg p-4 h-96 overflow-y-auto bg-white shadow"> {messages.map((m, i) => ( <div key={i} className={`my-2 ${m.role==="user" ? "text-right" : "text-left" }`}>
						<span className={`inline-block px-3 py-2 rounded-lg ${m.role==="user" ? "bg-blue-500 text-white" : "bg-gray-200" }`}> {m.content} </span>
				</div> ))} 
			</div>
  <div className="flex mt-3 gap-2">
    <input className="flex-1 border rounded px-3 py-2" value={input} onChange={(e)=> setInput(e.target.value)} placeholder="Nhập câu hỏi..." /> <button className="bg-blue-600 text-white px-4 rounded" onClick={sendMessage}>Gửi</button>
  </div>
</div> ); }