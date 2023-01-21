import { NextResponse } from "next/server";

export const middleware = (req) => {
    const url = req.url;  
    const cookie = req.cookies.get("refreshToken")
    //console.log(cookie)
    //console.log(`in middleware, the url is ${url}`)

    // error occurs here if you come from authorized to unauthorized 
    // ie if you delete the && !cookie part. This has to do with context
    /// come back to it later
    if (url.includes("/dashboard") && !cookie) {
        return NextResponse.redirect("http://localhost:3000/login")
    }

    
}