import { useEffect, useState } from "react";
import "./FollowersBarChart.css";
import VacationModel from "../../../../../Models/VacationModel";
import dataService from "../../../../../Services/DataService";
import notifyService from "../../../../../Services/NotifyService";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js"
import Papa from 'papaparse';
import DownloadIcon from '@mui/icons-material/Download';
import { Fab } from "@mui/material";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { NavLink } from "react-router-dom";


function FollowersBarChart(): JSX.Element {

  ChartJS.register(
      BarElement, CategoryScale, LinearScale, Tooltip, Legend
  ) 

  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [chartData, setChartData] = useState([]);
  
  // on Mount fetch vacations, and pass them to the chart data with the relevant information
  useEffect(() => {
    dataService.getAllVacations()
      .then((dbVacations) => {
        setVacations(dbVacations);
        const updatedChartData = [
          ...dbVacations.map(v => [v.destination, v.followerCount]),
        ];
        setChartData(updatedChartData);
      })
      .catch((err) => notifyService.error(err));
  }, []);
  
  const data = {
    labels: vacations.map(v => v.destination),
    datasets: [
      {
        label: "current followers",
        data: vacations.map(v => v.followerCount),
        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
      }
    ]
  }

  // Leave blank
  const options = {

  }

  function handleDownload() {

    const formattedData = chartData.map(([destination, followerCount]) => ({
      Destination: destination,
      Followers: followerCount,
    }));

    const csvContent = Papa.unparse(formattedData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'chart_data.csv';
    link.click();
    };

  return (
    <div className="FollowersBarChart">
      <Bar
        data = {data}
        options = {options}
      ></Bar>

      <Fab color="success">
        <DownloadIcon onClick={handleDownload}/>
      </Fab>
      
      <NavLink to="/admin/list">

        <Fab color="primary" sx={{ m:1 }}>
            <KeyboardReturnIcon />
        </Fab>

      </NavLink>

    </div>
  );
}
      
export default FollowersBarChart;
