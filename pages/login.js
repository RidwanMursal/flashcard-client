import LoginComponent from "../components/Login/index.jsx";
import jwt from "jsonwebtoken";
const Login = () => {
  return (
    <>
      <LoginComponent />
    </>
  );
};

export const getServerSideProps = async ({ req }) => {
  console.log("LOGIN GET SERVER SIDE PROPS");
  const token = req.cookies.refreshToken;
  const user = jwt.decode(token);

  console.log("decoded string is", user);
  // if user exists in refresh token, skip login
  if (user.name) {
    return {
      redirect: {
        permanent: false,
        destination: `/dashboard/${user.name}`,
      },
    };
  } else return { props: { stuff: "stuff" } };
};

export default Login;
