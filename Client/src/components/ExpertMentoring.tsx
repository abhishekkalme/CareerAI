import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "./ui/button";
import { X, MapPin, Video, Phone, Send, User } from "lucide-react";

interface Expert {
  id: number;
  name: string;
  title: string;
  location: string;
  specialization: string;
  bio?: string;
}

interface Message {
  from: string;
  text: string;
  timestamp?: string;
}

const experts: Expert[] = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    title: "Career Counselor",
    location: "Srinagar, J&K",
    specialization: "Career Pathways & Higher Education",
    bio: "Helping students discover their career paths and strengths.",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    title: "Industry Mentor",
    location: "Jammu, J&K",
    specialization: "Engineering & IT Careers",
    bio: "Providing industry insights and real-world guidance.",
  },
  {
    id: 3,
    name: "Sneha Patel",
    title: "Academic Advisor",
    location: "Baramulla, J&K",
    specialization: "STEM & Research Opportunities",
    bio: "Expert academic support for smarter learning and growth.",
  },
];

export default function ExpertMentoring() {
  const [chatExpert, setChatExpert] = useState<Expert | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Setup socket
  useEffect(() => {
    const s: Socket = io("http://localhost:5000");
    setSocket(s);

    s.on("chatHistory", (history: Message[]) => {
      setMessages(history || []);
    });

    s.on("receiveMessage", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      s.off("chatHistory");
      s.off("receiveMessage");
      s.disconnect();
    };
  }, []);

  const handleChat = (expert: Expert) => {
    setChatExpert(expert);
    setMessages([]);
    socket?.emit("joinRoom", { room: expert.id, user: "Student" });
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !chatExpert) return;
    const msg: Message = {
      from: "Student",
      text: newMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, msg]);
    socket?.emit("sendMessage", { room: chatExpert.id, message: msg });
    setNewMessage("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Connect with Mentors in Jammu & Kashmir
      </h1>

      {/* Expert Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {experts.map((expert) => (
          <div
            key={expert.id}
            className="rounded-2xl shadow-lg border bg-white dark:bg-gray-900 dark:border-gray-700 p-6 flex flex-col text-center hover:shadow-xl transition"
          >
            {/* Default avatar instead of image */}
            <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-gray-500 dark:text-gray-300" />
            </div>

            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
              {expert.name}
            </h3>
            <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
              {expert.title}
            </p>
            <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-gray-400 mt-1 text-sm">
              <MapPin className="w-4 h-4" />
              {expert.location}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 italic">
              {expert.specialization}
            </p>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              {expert.bio}
            </p>
            <div className="flex gap-3 mt-4 justify-center">
              <Button onClick={() => handleChat(expert)}>Chat</Button>
              <Button
                variant="secondary"
                onClick={() =>
                  window.open(
                    "https://meet.jit.si/" + expert.name.replace(/\s+/g, ""),
                    "_blank"
                  )
                }
              >
                <Phone className="w-4 h-4 mr-1" /> Voice
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  window.open(
                    "https://meet.jit.si/" + expert.name.replace(/\s+/g, ""),
                    "_blank"
                  )
                }
              >
                <Video className="w-4 h-4 mr-1" /> Video
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Modal (smaller, centered box) */}
      {chatExpert && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-md flex flex-col max-h-[70vh]">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {chatExpert.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {chatExpert.title} · {chatExpert.location}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setChatExpert(null)}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-800">
              {messages.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-10">
                  👋 Start the conversation...
                </p>
              ) : (
                messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`max-w-[80%] p-3 rounded-xl ${
                      msg.from === "Student"
                        ? "bg-indigo-600 text-white self-end ml-auto"
                        : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600"
                    }`}
                  >
                    <div className="text-xs opacity-80 mb-1">
                      {msg.from} ·{" "}
                      {msg.timestamp &&
                        new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                    <div className="text-sm">{msg.text}</div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2 border-t border-gray-200 dark:border-gray-700 p-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 rounded-full border dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Button
                onClick={sendMessage}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
