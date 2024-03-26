import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import "./AuthMenu.css";
import { authStore } from "../../../Redux/AuthState";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    const navigate = useNavigate();

    // Upon component creation, get user from global state, and subscribe for changes, unsubscribe on component destruction
    useEffect(() => {
        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });

        return () => unsubscribe();

    }, []);

    // Logout user and delete his token, notify user of successful logout
    function logout(): void {
        authService.logout();
        notifyService.success("Goodbye!");
        // navigate("/landingPage");
    }

    return (
        <div className="AuthMenu">

			{ !user && 
                <>
                    <span>Hello Guest |</span>
                    <NavLink to="/auth/login">Login</NavLink>
                    <span> | </span>
                    <NavLink to="/auth/register">Register</NavLink>
                </>
            }

            { user && 
                <>
                    <span>Hello {user.firstName} {user.lastName} | </span>
                    <NavLink to="/landingPage" onClick={logout}>Logout</NavLink>
                </>
            }

        </div>
    );
}

export default AuthMenu;
