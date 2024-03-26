class AppConfig {

    public serverUrl = "http://localhost:" + process.env.PORT;

    public imagesUrl = this.serverUrl + "/api/vacations/images/";

}

const appConfig = new AppConfig();

export default appConfig;
