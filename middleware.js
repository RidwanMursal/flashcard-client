import { NextResponse } from "next/server";
import { CLIENTURL } from "./constants";

export const middleware = (req) => {
  const url = req.url;
  const cookie = req.cookies.get("refreshToken");

  console.log("IN: MIDDLEWARE.JS, cookies is: ", cookie);
  console.log("IN: MIDDLEWARE.JS, url is: ", url);

  if (url.includes("/dashboard") && !cookie) {
    return NextResponse.redirect(`${CLIENTURL}/login`);
  }
  return;
};
