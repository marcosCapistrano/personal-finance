import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.error();
  }

  let body = await req.json()

  const res = await fetch("http://localhost:8080/api/accounts", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  const data = await res.json();

  return NextResponse.json({ data });
}
