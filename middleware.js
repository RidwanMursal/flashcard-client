import { NextResponse } from "next/server";

export const middleware = (req) => {
  const url = req.url;
  const cookie = req.cookies.get("refreshToken");
  console.log("THIS IS THE URL", url);
  console.log("THIS IS THE COOKIE", cookie);
  //console.log(cookie)
  //console.log(`in middleware, the url is ${url}`)

  // error occurs here if you come from authorized to unauthorized
  // ie if you delete the && !cookie part. This has to do with context
  /// come back to it later
  //   if (url.includes("/dashboard")) {
  //     return NextResponse.redirect("https://flashcard-client.vercel.app/");
  //   }
  return;
};
