//@ts-nocheck
import { authOptions } from "@/lib/auth";
import { Transaction } from "@/types/transaction";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<Transaction[]> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.error();
  }

  const res = await fetch("http://localhost:8080/api/transactions", {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });


  const data = await res.json();

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.error();
  }

  let body = await req.json()

  console.log(body)

  const res = await fetch("http://localhost:8080/api/transactions", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  const data = await res.json();

  return NextResponse.json({ data });
}