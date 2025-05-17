import React from 'react'

interface MessageCardProps {
    name: string;
    message: string;
    timestamp: string;
}

export default function MessageCard({name, message, timestamp}: MessageCardProps) {
  return (
    <div>
        <div className="bg-gradient-to-br from-amber-50 via-amber-100 to-orange-100 shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-gray-700">{message}</p>
            <p className="text-gray-500 text-sm">{new Date(timestamp).toLocaleString()}</p>
        </div>
    </div>
  )
}
