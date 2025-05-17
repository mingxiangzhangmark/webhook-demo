import { NextRequest, NextResponse } from "next/server";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../firebase";



export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, message, userId } = body;

  await addDoc(collection(db, "messages"), {
    name,
    message,
    userId,
    timestamp: Date.now(),
  });

  return NextResponse.json({ success: true });
}
