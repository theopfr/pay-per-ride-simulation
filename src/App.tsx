import { useEffect, useState } from "react";
import Phone from "./components/Phone";
import Route from "./components/Route";

function App() {

	interface RideData {
        rideOnGoing: boolean,
        startTime: string;
		endTime: string;
        startStation: string;
        endStation: string;
        stationAmount: number;
        price: number;
        maxPrice: number;
    }

	const PRICE_CAP: number = 3.0;

	const allJourneys: RideData[] = [
        {   
            rideOnGoing: true,
            startTime: "6/17/2023, 3:46:33 PM",
			endTime: "6/17/2023, 3:49:33 PM",
            startStation: "Station A",
            endStation: "Station B",
            stationAmount: 1,
            price: 1.0,
            maxPrice: PRICE_CAP
        },
        {
            rideOnGoing: false,
            startTime: "6/16/2023, 7:21:02 PM",
			endTime: "6/16/2023, 7:30:02 PM",
            startStation: "Station A",
            endStation: "Station D",
            stationAmount: 3,
            price: 3,
            maxPrice: PRICE_CAP
        }
    ];


	let [journeyData, setJourneyData] = useState();

	const getNewRideHandler = (rideData: any) => {
		setJourneyData(rideData);
	}
	
	useEffect(() => {
		console.log(journeyData)
	}, [journeyData])

	return (
		<div className="App">
			<div className="phone-container">
				<Phone allJourneys={allJourneys}/>
			</div>
			<div className="train-ride-container">
				<Route getNewJourney={(rideData: any) => { getNewRideHandler(rideData) }} />
			</div>
		</div>
	);
}

export default App;
