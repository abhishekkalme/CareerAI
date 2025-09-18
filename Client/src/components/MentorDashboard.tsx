import React, { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "./ui/button";
import { X, User, Send, Users } from "lucide-react";

interface Message {
  from: string;
  text: string;
  timestamp?: string;
}
interface UserType {
  id: string;
  name: string;
}

export default function MentorDashboard() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [students, setStudents] = useState<UserType[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<UserType | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [room, setRoom] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const mentorName = "Mentor (Rahul Sir)";

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Socket setup
  useEffect(() => {
    const s: Socket = io("http://localhost:5000");
    setSocket(s);

    s.on("chatHistory", (history: Message[]) => setMessages(history || []));
    s.on("receiveMessage", (msg: Message) =>
      setMessages((prev) => [...prev, msg])
    );
    s.on("roomUsers", (users: UserType[]) =>
      setStudents(users.filter((u) => u.name !== "Mentor"))
    );

    return () => {
      s.off("chatHistory");
      s.off("receiveMessage");
      s.off("roomUsers");
      s.disconnect();
    };
  }, []);

  const joinRoom = (roomId: number) => {
    if (!socket) return;
    if (room === roomId) return;
    setRoom(roomId);
    setSelectedStudent(null);
    setMessages([]);
    socket.emit("joinRoom", { room: roomId, user: "Mentor" });
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !room) return;
    const msg: Message = {
      from: mentorName,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, msg]);
    socket?.emit("sendMessage", { room, message: msg });
    setNewMessage("");
  };

  return (
    <div className="p-6 grid md:grid-cols-3 gap-6">
      {/* Sidebar */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4 flex flex-col">
        <h2 className="font-bold mb-4 text-lg flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" /> Mentor Dashboard
        </h2>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Select Expert Room</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={room === 1 ? "default" : "secondary"}
              onClick={() => joinRoom(1)}
            >
              Expert 1
            </Button>
            <Button
              variant={room === 2 ? "default" : "secondary"}
              onClick={() => joinRoom(2)}
            >
              Expert 2
            </Button>
            <Button
              variant={room === 3 ? "default" : "secondary"}
              onClick={() => joinRoom(3)}
            >
              Expert 3
            </Button>
          </div>
        </div>

        <h3 className="font-semibold mb-2">Active Students</h3>
        <div className="flex-1 overflow-y-auto space-y-2">
          {students.length === 0 ? (
            <p className="text-gray-500 text-sm">No students online</p>
          ) : (
            students.map((student) => (
              <div
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${
                  selectedStudent?.id === student.id
                    ? "bg-indigo-100 dark:bg-indigo-700"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </div>
                <span className="text-sm font-medium">{student.name}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Window */}
      {selectedStudent && room && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-md flex flex-col max-h-[70vh]">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Mentor (Rahul Sir)
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Chat with {selectedStudent.name}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSelectedStudent(null)}
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
          messages.map((msg, i) => {
            const isMentor = msg.from.startsWith("Mentor");
            return (
              <div
                key={i}
                className={`max-w-[80%] p-3 rounded-xl ${
                  isMentor
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
            );
          })
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
