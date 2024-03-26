import "./PageNotFound.css";
import imageSource from "../../../Assets/Images/Fat cats.jpg";
import { Typography } from "@mui/material";

function PageNotFound(): JSX.Element {
    
    return (
        <div className="PageNotFound">

            <Typography variant="h2">
                404
            </Typography>

            <Typography variant="h4">
                The page you are looking for wasn't found, instead you get a picture of my fat cats,
                it's probably better than what you were looking for anyway, so cheer up
            </Typography>
            
			<img src={imageSource}/>

        </div>
    );
}

export default PageNotFound;
