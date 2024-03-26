import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import { AppBar, Toolbar, Typography } from "@mui/material";


function Header(): JSX.Element {
   
  return (

      <div className="Header">

        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              <AuthMenu />
            </Typography>
          </Toolbar>
        </AppBar>

      </div>

  );
}

export default Header;
