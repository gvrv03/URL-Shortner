"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Redirect = ({ params }) => {
  const router = useRouter();
  const [error, seterror] = useState("");
  const [loading, setloading] = useState("");
  const redirectdata = async () => {
    setloading(true);
    const res = await fetch(`/api/Redirect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ShortID: params?.ShortID }),
    });
    const link = await res.json();
    if (link?.url) {
      setloading(false);
      return router.push(link?.url);
    }
    setloading(false);
    return seterror(link?.error);
  };
  useEffect(() => {
    redirectdata();
  }, []);

  return (
    <>
      {loading && "Waiting..."} {error}
    </>
  );
};

export default Redirect;
