'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { IoArrowBack } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';

interface Message {
    id: string;
    name: string;
    message: string;
    timestamp: string;
}

export default function Dashboard() {
    const [name, setName] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [userId, ] = useState(() => localStorage.getItem("userId") || uuidv4());
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        localStorage.setItem("userId", userId);
        const fetchMessages = async () => {
          const res = await fetch("/api/messages?userId=" + userId);
          const data = await res.json();
          setMessages(data);
        };
        fetchMessages();
      }, [userId]);

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        await fetch("/api/webhook", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, message, userId }),
        });
        setMessage("");
        // Refresh messages
        const res = await fetch("/api/messages?userId=" + userId);
        const data = await res.json();
        setMessages(data);
        toast.success("Message submitted successfully!");
        } catch (error) {
            console.error("Error submitting message:", error);
            toast.error("Failed to submit message.");
        }
      };

  return (
    <>
         <main className="p-6">
         <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
                duration: 3000,
                style: {
                background: '#363636',
                color: '#fff',
                },
                success: {
                duration: 3000,
                style: {
                    background: 'green',
                },
                },
            }}
            />
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-start flex-col mb-2'>
                    <h2 className="text-2xl font-bold mb-1">Dashboard</h2>
                    <p className='md:block hidden'>UserId will be generate automatically by uuid</p>
                </div>
              
                <Link href={"/"} className="text-black mb-4  border border-gray-400 p-2 flex items-center rounded hover:bg-gray-200">
                    <IoArrowBack className='md:mr-3'/>
                    <div className='md:block hidden'>Back to HomePage</div>
                </Link>
            </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-4 py-2 rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border px-4 py-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit to Webhook
        </button>
      </form>
      <div>
        <h3 className="text-xl font-semibold mb-2">Your Messages</h3>
        <ul className="space-y-2">
          {messages
            .slice() 
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) 
            .map((msg) => (
              <li key={msg.id} className="border p-3 rounded">
                <strong>{msg.name}:</strong> {msg.message} 
                <div className="text-sm text-gray-500">ID: {msg.id}</div>
                <div className="text-sm text-gray-500">Timestamp: {new Date(msg.timestamp).toLocaleString()}</div>
              </li>
            ))}
        </ul>
      </div>
    </main>
    </>
  )
}
