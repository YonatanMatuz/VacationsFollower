import {  Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "../PageNotFound/PageNotFound";
import EditVacation from "../../DataArea/Vacations/EditVacation/EditVacation";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import AdminRoutes from "../AdminRoutes/AdminRoutes";
import Insert from "../../DataArea/Vacations/AddVacation/Insert";
import UserList from "../../DataArea/Vacations/VacationLists/UserList/UserList";
import AdminList from "../../DataArea/Vacations/VacationLists/AdminList/AdminList";
import UserRoutes from "../UserRoutes/UserRoutes";
import FollowersBarChart from "../../DataArea/Vacations/VacationCharts/FollowersBarChart/FollowersBarChart";
import LandingPage from "../../LayoutArea/LandingPage/LandingPage";

function Routing(): JSX.Element {
    
    return (

		<Routes>
            
            {/* Admin Routes */}
            {/* Higher order component validation */}
            <Route path="/admin/edit/:vacationId" element={<AdminRoutes Route={<EditVacation />}/>} />
            <Route path ="/admin/insert" element={<AdminRoutes Route={<Insert />}/>}/>
            <Route path="/admin/list" element={<AdminRoutes Route={<AdminList />} />} />
            <Route path="/admin/charts/followersChart" element={<AdminRoutes Route={<FollowersBarChart />} />} />
            

            {/* User routes */}
            {/* Higher order component validation */}
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Navigate to="/landingPage" />}/>
            <Route path="/landingPage" element={<LandingPage />} />
            <Route path="/user/list" element={<UserRoutes Route={<UserList />} />} />
            <Route path="/" element={<Navigate to="/landingPage" />} />
            <Route path="*" element={<PageNotFound />} />

        </Routes>
        
    );
}

export default Routing;
