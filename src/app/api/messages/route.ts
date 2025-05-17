import { NextRequest, NextResponse } from "next/server";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebase";



export async function GET(req: NextRequest) {
  // Parse the URL to get the search parameters
  const { searchParams } = new URL(req.url);
  // Get the userId from the query parameters
  const userId = searchParams.get("userId");
  // Check if userId is provided
  if (!userId) return NextResponse.json([]);
  // Fetch messages for the specific userId
  const q = query(collection(db, "messages"), where("userId", "==", userId));
  // get the messages from the database
  const snapshot = await getDocs(q);
  // map the messages to an array of objects
  const userMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  // return the messages as a json response
  return NextResponse.json(userMessages);
}
