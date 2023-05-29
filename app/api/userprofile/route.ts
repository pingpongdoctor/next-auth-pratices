import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request) {
  const session: { user: UserSession } | null = await getServerSession(
    authOptions
  );

  if (session) {
    //DO SOMETHING
    return NextResponse.json({ message: "return data" });
  } else {
    //DO SOMETHING
    return NextResponse.json(
      { error: "fail authentication" },
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
