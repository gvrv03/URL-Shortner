import initDB from "@/config/db";
import Url from "@/Modal/Url";
import { NextResponse } from "next/server";
import shortid from "shortid";
import validUrl from "valid-url";
initDB();
export const baseUrl = "https://urlshortnernew.vercel.app";
// --------------Short URL--------------
export const POST = async (request) => {
  const { longUrl } = await request.json();

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return NextResponse.json({ error: "Invalid URL" });
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        return NextResponse.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;

        url = await Url.create({
          longUrl,
          shortUrl,
          urlCode,
        });

        return NextResponse.json(url);
      }
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: err.message });
    }
  } else {
    return NextResponse.json({ error: "Invalid URL" });
  }
};
