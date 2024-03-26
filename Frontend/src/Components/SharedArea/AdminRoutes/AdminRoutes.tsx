import { useEffect, useState } from "react";
import cyberService from "../../../Services/CyberService";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";

// Higher order component for validating admin routes

// Recieve route to be checked
interface AdminRoutes  {
  Route: JSX.Element;
};

function AdminRoutes(props: AdminRoutes): JSX.Element {

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const navigate = useNavigate();

  // Verify if admin, redirect if not
  useEffect(() => {
    const verifyAdmin = async () => {
      const isAdmin = await cyberService.verifyAdmin();
      setIsAdmin(isAdmin);

      if (!isAdmin) {
        redirectUser();
      }

    };
    verifyAdmin();
  }, []);

  function redirectUser() {
    notifyService.error("Acesss Denied");
    navigate("/landingPage");
  }

  return (

    <div className="AdminRoutes">

      {isAdmin ? props.Route : null}
      
    </div>
    
  );
}

export default AdminRoutes;
