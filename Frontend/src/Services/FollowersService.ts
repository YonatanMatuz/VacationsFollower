import axios, { AxiosRequestConfig } from "axios";
import FollowerModel from "../Models/FollowerModel";
import appConfig from "../Utils/AppConfig";

class FollowersService {

    // Follow a vacation
    public async followVacation(follower: FollowerModel): Promise<void> {
        await axios.post<FollowerModel>(appConfig.followersUrl, follower); 
    }

    // Checks with backend if user is following the vacation
    public async isUserFollowing(userId: number, vacationId: number): Promise<boolean> {
        const response = await axios.get<boolean>(appConfig.isFollowingUrl + userId + "/" + vacationId);
        const isFollowing = response.data;
        return isFollowing;
    }

    // Unfollow a vacation
    public async unfollowVacation(follower: FollowerModel): Promise<void> {
        // Axios delete cannot accept a request.body directly, this code circumvents that
        const config: AxiosRequestConfig<any> = {
            data: follower
          };
        await axios.delete(appConfig.followersUrl, config);
    }

}

const followersService = new FollowersService();

export default followersService;