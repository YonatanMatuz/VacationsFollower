import { useEffect, useState } from "react";
import cyberService from "../../../Services/CyberService";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";

// Higher Order Component for blocking guests/admin from accessing user routes

// Recieve route to be checked
interface UserRoutes  {
  Route: JSX.Element;
};

function UserRoutes(props: UserRoutes): JSX.Element {

  const [isUser, setIsUser] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const navigate = useNavigate();

  // Verify user + if user is admin, navigate each case accordingly
  useEffect(() => {
    const verifyUser = async () => {
      const isUser = await cyberService.verifyUser();
      if (isUser) {
        const isAdmin = await cyberService.verifyAdmin();
        if(isAdmin) {
          setIsAdmin(true);
          redirectAdmin();
        }
        else {
          setIsUser(isUser)
        }
      }

      if (!isUser) {
        redirectGuest();
      }

    };

    verifyUser();

  }, []);

  function redirectAdmin() {
    notifyService.error("I'm sorry admin, you cannot access this user feature");
    navigate("/admin/list");
  }

  function redirectGuest() {
    notifyService.error("Please register or login");
    navigate("/landingPage");
  }

  return (

    <div className="UserRoutes">

      {isUser ? props.Route : null}
      
    </div>
    
  );
}

export default UserRoutes;

