import initDB from "@/config/db";
import Url from "@/Modal/Url";
import { NextResponse } from "next/server";
initDB();
// --------------Short URL--------------
export const POST = async (request) => {
  try {
    const { ShortID } = await request.json();
    const url = await Url.findOne({ urlCode: ShortID });
    if (!url) {
      throw new Error("URL Not Found");
    }
    return NextResponse.json({ url: url?.longUrl });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};
