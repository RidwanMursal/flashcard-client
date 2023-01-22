const env = process.env.NODE_ENV;

export const BASEURL =
  env === "development"
    ? "http://localhost:5050"
    : "https://flashcards-production-1525.up.railway.app";

console.log("BASE URL IS", BASEURL);
// export const BASEURL = "https://flashcards-production-1525.up.railway.app";
