class AppConfig {

    //Auth routes 
    public registerUrl = "http://localhost:4000/api/auth/register/";
    public loginUrl = "http://localhost:4000/api/auth/login/";

    // Generic vacation routes
    public vacationsUrl = "http://localhost:4000/api/vacations/";
    public addVacationUrl = "http://localhost:4000/api/vacations/add-vacation/";
    public specificVacationUrl = "http://localhost:4000/api/vacation/";
    public deleteVacationUrl = "http://localhost:4000/api/vacations/delete-vacation/";
    public vacationImagesUrl ="http://localhost:4000/api/vacations/images/";
    
    // Follow feature routes
    public followersUrl ="http://localhost:4000/api/vacations/followers/";
    public isFollowingUrl = "http://localhost:4000/api/vacations/following/";
    
}

const appConfig = new AppConfig();

export default appConfig;