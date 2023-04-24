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

  const res = await fetch("http://localhost:8080/api/institutions", {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  const data = await res.json();

  return NextResponse.json(data);
}
