import { useEffect, useState } from "react";
import Phone from "./components/Phone";
import Route from "./components/Route";
import { RideData } from "./components/RideDataInterface";

function App() {
    
	const PRICE_CAP_RIDE: number = 3.0;
    const PRICE_CAP_DAY = 8.8;
    const PRICE_CAP_WEEK = 20.20;
    const PRICE_CAP_MONTH = 20.20;

    // initial example journeys
	const EXAMPLE_JOURNEYS: RideData[] = [
        {   
            rideOnGoing: false,
            startTime: "6/17/2023, 3:46:33 PM",
			endTime: "6/17/2023, 3:49:33 PM",
            startStation: "Station A",
            endStation: "Station B",
            stationAmount: 1,
            price: 1.0,
            maxPrice: PRICE_CAP_RIDE,
            priceCapReached: false,
            id: 1,
        },
        {
            rideOnGoing: false,
            startTime: "6/16/2023, 7:21:02 PM",
			endTime: "6/16/2023, 7:30:02 PM",
            startStation: "Station A",
            endStation: "Station D",
            stationAmount: 3,
            price: 3,
            maxPrice: PRICE_CAP_RIDE,
            priceCapReached: false,
            id: 0
        }
    ];

    let [journeyData, setJourneyData] = useState<RideData[]>(EXAMPLE_JOURNEYS);
    let [currentJourneyId, setCurrentJourneyIdx] = useState<number>(3);

    // handle new journeys
	const addNewRideHandler = (newJourneyData: RideData) => {
        // if a journey has been finished, update the last journey
        if (!newJourneyData.rideOnGoing) {
            let updatedJourneyData = [...journeyData];
            newJourneyData.rideOnGoing = false;
            
            updatedJourneyData[0] = newJourneyData;

            setJourneyData(updatedJourneyData);
            setCurrentJourneyIdx(previousIdx => previousIdx + 1)
        }
        else {
            setJourneyData(prev => [newJourneyData, ...prev]); 
        } 
	}

	return (
		<div className="App">
			<div className="phone-container">
				<Phone journeys={journeyData}/>
			</div>
			<div className="train-ride-container">
				<Route addNewJourney={(rideData: RideData) => { addNewRideHandler(rideData) }} nextId={currentJourneyId}/>
			</div>
		</div>
	);
}

export default App;
