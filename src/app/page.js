"use client";

import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";

export default function Home() {
  const [loading, setloading] = useState(false);
  const [shortURL, setshortURL] = useState("");
  const [longURL, setlongURL] = useState("");
  const textRef = useRef(null);
  const router = useRouter();
  const HandleShortURL = async () => {
    setloading(true);

    if (!longURL) {
      setloading(false);
      return toast.error("Enter the Link");
    }
    const res = await fetch(`/api/URLShort`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ longUrl: longURL }),
    });
    const Data = await res.json();
    if (Data?.error) {
      setloading(false);
      return toast.error(Data?.error);
    }
    setloading(false);
    return setshortURL(Data?.shortUrl);
  };

  const handleCopyClick = () => {
    if (textRef.current) {
      textRef.current.select();
      document.execCommand("copy");
      toast.success("Text copied to clipboard!");
    }
  };

  return (
    <main className="bg-gray-950 h-screen grid place-items-center p-5 text-white ">
      <div className="p-5 rounded-md w-full md:w-[30%]  bg-gray-900">
        <p className="font-semibold text-2xl border-b-2 pb-2">URL Shortner</p>
        <div className="mt-5 flex-col gap-2 flex">
          <input
            onChange={(e) => {
              setlongURL(e.target.value);
            }}
            type="text"
            className="w-full p-2 outline-none text-sm py-4 bg-gray-800 rounded-md"
            placeholder="Enter Link"
          />
          <button
            onClick={HandleShortURL}
            disabled={loading}
            className=" font-semibold p-2 hover:bg-gray-950 bg-gray-500 transition-all ease-linear rounded-md"
          >
            {loading ? "Generating..." : "Create Link"}
          </button>

          {shortURL && (
            <div className="p-5 flex items-center justify-between bg-gray-800 rounded-md mt-5">
              <input
                type="text"
                ref={textRef}
                className="w-full bg-gray-800 outline-none "
                contentEditable="false"
                value={shortURL}
              />
              <div className="flex gap-4  ">
                <button
                  onClick={handleCopyClick}
                  type="button"
                  className="uil p-1 bg-gray-700 w-10 h-10 rounded-full text-xl uil-copy"
                />
                <button
                  onClick={() => {
                    router.push(shortURL);
                  }}
                  type="button"
                  className="uil p-1 bg-gray-700 w-10 h-10 rounded-full text-xl uil-arrow-up-right"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
