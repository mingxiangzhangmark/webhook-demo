import { NextRequest, NextResponse } from "next/server";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebase";



export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json([]);

  const q = query(collection(db, "messages"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  const userMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return NextResponse.json(userMessages);
}
