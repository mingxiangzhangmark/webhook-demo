import { NextRequest, NextResponse } from "next/server";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../firebase";



export async function POST(req: NextRequest) {
  // Parse the request body
  const body = await req.json();
  // Check if the body contains the required fields
  if (!body.name || !body.message || !body.userId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  // Destructure the body to get the name, message, and userId
  const { name, message, userId } = body;  

  // Add the message to the database
  await addDoc(collection(db, "messages"), {
    name,
    message,
    userId,
    timestamp: Date.now(),
  });
  // Return a success response
  return NextResponse.json({ success: true });
}
