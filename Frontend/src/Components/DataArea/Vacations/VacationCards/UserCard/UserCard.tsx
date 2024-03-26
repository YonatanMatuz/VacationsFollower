import moment from "moment";
import VacationModel from "../../../../../Models/VacationModel";
import "./UserCard.css";
import FollowerModel from "../../../../../Models/FollowerModel";
import { useEffect, useState } from "react";
import notifyService from "../../../../../Services/NotifyService";
import UserModel from "../../../../../Models/UserModel";
import followersService from "../../../../../Services/FollowersService";
import {  Card, CardContent, CardMedia, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Fab from '@mui/material/Fab';

interface UserCardProps {
  vacation: VacationModel;
  // I sent the full user and not just userId in case of future cases where more user properties are needed
  user: UserModel;
  isFollowing: boolean;
  updateFollowerCount: (vacationId: number, followerCount: number) => void;
  followStatusChange: (vacationId: number, isFollowing: boolean) => void;
}

function UserCard(props: UserCardProps): JSX.Element {

  // Format both dates displayed
  const formattedStartDate = moment(props.vacation.start).format('YYYY-MM-DD');
  const formattedEndDate = moment(props.vacation.end).format('YYYY-MM-DD');

  const [followerCount, setFollowerCount] = useState<number>(props.vacation.followerCount);

  // Notify the parent component when the follow status changes
  useEffect(() => {
      props.followStatusChange(props.vacation.vacationId, props.isFollowing || false);
    }, [props.isFollowing]);
  

  // Upon loading user from parent, check if user is following this vacation, and update local state
  useEffect(() => {
    if (props.user) {
      checkIfUserIsFollowing(props.user.userId, props.vacation.vacationId)
        .then((isUserFollowing) => {
            props.followStatusChange(props.vacation.vacationId, isUserFollowing);
        })
        .catch((err) => {
            console.error(err);
        });
      }
  }, [props.user]);

  // Used in the above function to determine if the user is following this vacation
  async function checkIfUserIsFollowing(userId: number, vacationId: number): Promise<boolean> {
    try {
      const isFollowing = await followersService.isUserFollowing(userId, vacationId);
      return isFollowing;
    } catch (err) {
      notifyService.error(err);
      throw err;
    }
  }

  // Follow Unfollow logic button
  async function toggleFollowUnfollow(userId: number, vacationId: number) {

    // Define the current user attempting to follow/unfolow as a follower
    const follower = new FollowerModel(userId, vacationId);
      
    if (!props.isFollowing) {
      try {
        // Follow vacation
        await followersService.followVacation(follower);
        
        // Update local states
        setFollowerCount(currentCount => currentCount + 1);

        // Set isFollowing to true
        props.followStatusChange(props.vacation.vacationId, true);

        // Notify success to user
        notifyService.success("Vacation Followed");

        // Call on list component to render the list again
        props.updateFollowerCount(props.vacation.vacationId, followerCount + 1);

      } catch (error) {
        notifyService.error(error);
      }

    } else {

      try {
        // Unfollow the vacation
        await followersService.unfollowVacation(follower);

        // Update local states
        setFollowerCount(currentCount => currentCount - 1);

        // Set isFollowing to false
        props.followStatusChange(props.vacation.vacationId, false);

        // Notify success to user
        notifyService.success("Vacation unfollowed");

        // Call on list component to render the list again
        props.updateFollowerCount(props.vacation.vacationId, followerCount - 1);

      } catch (error) {
        notifyService.error(error);
      }

    }};

  return (

    <div className="UserCard Box">

      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

        {/* Display image */}
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: '56.25%'
          }}
          image={props.vacation.imageUrl}
        />

        <CardContent sx={{ flexGrow: 1 }}>

          {/* Destination */}
          <Typography gutterBottom variant="h5" component="h2" sx={{ zIndex: 2 }}>

            {props.vacation.destination}
            
          </Typography>

          {/* Dates */}
          <Typography sx={{ zIndex: 3 }}>

            📅{formattedStartDate} ~ 📅{formattedEndDate}

          </Typography>

          {/* Description */}
          {/* Wrapped in css class to allow scrolling */}
          <div className="descriptionStyler">

            <Typography sx={{ m: 1, zIndex: 4 }}>

              {props.vacation.description}

            </Typography>

          </div>

          {/* Price */}
          <Fab color="success" sx={{ m: 1, zIndex: 5 }}>

            ${props.vacation.price}

          </Fab>

          {/* Follow/Unfollow */}
          <Fab
            sx={{ m: 1, zIndex: 5 }}
            color={props.isFollowing ? "error" : "info"}
            aria-label="like" 
            onClick={() => toggleFollowUnfollow(props.user.userId, props.vacation.vacationId)}
          >

            <FavoriteIcon /> {props.vacation.followerCount}

          </Fab>

        </CardContent>

      </Card>

    </div>
  );
}

export default UserCard;

