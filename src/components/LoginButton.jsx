import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <Button
                style={{
                  fontWeight: "bold",
                  borderRadius: "45px",
                  backgroundColor: "#72B550",
                  color: "#000",
                  borderWidth: "5px",
                  borderColor: "#000",
                  marginLeft: "128px",
                }}
                as={Link}
                to="/"
                className="my-3 p-3 fs-1 w-50"
                onClick={() => loginWithRedirect()}
              >
                Login
              </Button>
    )
  );
};

export default LoginButton;
