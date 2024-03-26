import jwtDecode from "jwt-decode";
import UserModel from "../Models/UserModel";
import RoleModel from "../Models/RoleModel";

class CyberService {

  // Fetches the current user logged in
  public async fetchUser(): Promise<UserModel> {
      const token = sessionStorage.getItem("token");
      const user = jwtDecode<{ user : UserModel }>(token).user;
      if(!user) return null;
      return user;
  }

  // Verify current user has a valid token
  public async verifyUser(): Promise<boolean> {
      try {
          const token = sessionStorage.getItem("token");
          const user = jwtDecode<{ user : UserModel }>(token).user;
          return user.roleId === RoleModel.User || user.roleId === RoleModel.Admin;

      } catch (error) {
          return false;
      }
  }
  
  public async verifyAdmin(): Promise<boolean> {
      try {

        const token = sessionStorage.getItem("token");
        const user = jwtDecode<{ user: UserModel }>(token).user;

        // Check if user.roleId matches admin role value (1)
        return user.roleId === 1; 
        
      } catch (error) {
        console.error(error);
      }
    }
}

const cyberService = new CyberService();

export default cyberService;


