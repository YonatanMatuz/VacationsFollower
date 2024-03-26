import axios from "axios";
import VacationModel from "../Models/VacationModel";
import appConfig from "../Utils/AppConfig";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";

class DataService {

    // Fetch all vacations
    public async getAllVacations(): Promise<VacationModel[]> {
        
        // Fetch vacations from Redux
        let vacations = vacationsStore.getState().vacations;
        
        // If global state contains no vacations, fetch from backend
        if(vacations.length === 0) {
            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
            vacations = response.data;
            vacationsStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations });
        }

        return vacations;
    }

    // Fetch specific vacation
    public async getSpecificVacation(vacationId: number): Promise<VacationModel> {

        // Fetch specific vacation from Redux
        let vacations = vacationsStore.getState().vacations;

        let vacation = vacations.find(v => v.vacationId === vacationId);

        // If global state contains no specific vacation, fetch from backend
        if(!vacation) {
            const response = await axios.get<VacationModel>(appConfig.specificVacationUrl + vacationId);
            vacation = response.data;
        }

        return vacation;
    }
    
    // Add a new vacation
    public async addVacation(vacation: VacationModel): Promise<void> {

        // Add headers for image
        const headers = { "Content-Type": "multipart/form-data" };

        const response = await axios.post<VacationModel>(appConfig.addVacationUrl, vacation, { headers });

        // Return updated vacation, and dispatch to global state
        const addedVacation = response.data;
        vacationsStore.dispatch({ type: VacationsActionType.AddVacation, payload: addedVacation });
    }

    // Update a specific vacation
    public async editVacation(vacation: VacationModel): Promise<void> {

        // Add headers for image
        const headers = { "Content-Type": "multipart/form-data" };
        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationId, vacation, { headers });

        // Return updated vacation, and dispatch to global state
        const updatedVacation = response.data;
        vacationsStore.dispatch({ type: VacationsActionType.UpdateVacation, payload: updatedVacation });
        
    }
    
    // Delete a specific vacation
    public async deleteVacation(vacationId: number): Promise<void> {

        await axios.delete<VacationModel>(appConfig.deleteVacationUrl + vacationId);
        
        // Update the global state about the deleted vacation
        vacationsStore.dispatch({ type: VacationsActionType.DeleteVacation, payload: vacationId });
    }
    
}

const dataService = new DataService();

export default dataService;