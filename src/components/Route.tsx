import { useEffect, useState, useRef } from "react"
import { RideData } from "./RideDataInterface";



function Station(props: any) {
    return (
        <div className={props.stationIsActive ? "station station-active" : "station"}>
            <p className="station-name">{props.stationName}</p>
        </div>
    )
}


const TrainAnimation = (props: any) => {
    const trainStyle: any = {
        "--start-left": `${props.startLeft}px`,
    };
  
    return <img src="images/train.svg" className="train-icon" style={trainStyle} />;
};



export default function Route(props: any) {
    // the idx of the station the train is currently at
    let [activeStationIdx, setActiveStationIdx] = useState<number>(0);
    // the "left" position of the train (distance to left border)
    let [trainLeftPosition, setTrainLeftPosition] = useState<number>(0);
    // true, when the train is waiting at a station, else false
    let [trainWaiting, setTrainWaiting] = useState<boolean>(false);
    // stores the distance the train can move (180 to right, or -180 to left)
    let [trainMovementDelta, setTrainMovementDelta] = useState<number>(180);
    // stores the value for counting stations (1 if the train does right, -1 if it goes left)
    let [trainStationDelta, setTrainStationDelta] = useState<number>(1);
    // stores the value for counting stations (1 if the train does right, -1 if it goes left)
    let [userInTrain, setUserInTrain] = useState<boolean>(false);
    // stores amount of stations the user has driven in the train
    let [userStationAmount, setUserStationAmount] = useState<number>(0);

    let [journeyDateTimes, setJourneyDateTimes] = useState<{startTime: Date, endTime: Date}>({startTime: new Date(), endTime: new Date()});
    let [journeyStations, setJourneyStations] = useState<{startStation: String, endStation: String}>({startStation: "", endStation: ""})
    let [journeyFinished, setJourneyFinished] = useState<boolean>(false);

    let [journeyCapReached, setJourneyCapReached] = useState<boolean>(false);
    let [dailyCapReached, setDailyCapReached] = useState<boolean>(false);
    let [totalJourneyPrice, setTotalJourneyPrice] = useState<number>(0);
    let [totalDayPrice, setTotalDayPrice] = useState<number>(0);

    const STATIONS: String[] = ["Station A", "Station B", "Station C", "Station D", "Station E", "Station F"]

    const PRICE_PER_STATION = 1.0;
    const PRICE_CAP_RIDE = 3.0;
    const PRICE_CAP_DAY = 8.0;
    const PRICE_CAP_WEEK = 20.20;
    const PRICE_CAP_MONTH = 20.20;

    // if the "userInTrain" state changes (i.e the user entered or left the train) update the phone with the current journey data
    useEffect(() => {
        // the user is in the train and the journey is still going on, initialize a new journey on the phone
        if (userInTrain && !journeyFinished) {
            let newJourney: RideData = {
                rideOnGoing: true,
                startTime: journeyDateTimes.startTime.toLocaleString(),
                endTime: "",
                startStation: journeyStations.startStation,
                endStation: "",
                stationAmount: 0,
                price: 0,
                maxPrice: PRICE_CAP_RIDE,
                priceCapReached: false,
                id: props.currentJourneyId
            }
            props.addNewJourney(newJourney);
        }
        // if the journey has finished, update the journey on the phone with the final data
        if (journeyFinished) {
            let newJourney: RideData = {
                rideOnGoing: false,
                startTime: journeyDateTimes.startTime.toLocaleString(),
                endTime: journeyDateTimes.endTime.toLocaleString(),
                startStation: journeyStations.startStation,
                endStation: journeyStations.endStation,
                stationAmount: userStationAmount,
                price: Math.min(totalJourneyPrice, PRICE_CAP_RIDE),
                maxPrice: PRICE_CAP_RIDE,
                priceCapReached: dailyCapReached,
                id: props.currentJourneyId
            }
            setTotalJourneyPrice(0);
            props.addNewJourney(newJourney); 
        }
        setUserStationAmount(0);
    }, [userInTrain]);

    // every time the price of the current journey changes, check if a price cap was reached
    useEffect(() => {
        // week and month caps will never happen in the simulation, so no need to handle them
        if (totalDayPrice >= PRICE_CAP_DAY) {
            setDailyCapReached(true);
        }
        else if (totalJourneyPrice >= PRICE_CAP_RIDE && totalDayPrice < PRICE_CAP_DAY) {
            setJourneyCapReached(true);
        }
        
    }, [totalJourneyPrice]);

    // if the "trainIsWaiting" state changes (i.e the train either stops or starts) handle the train animation, station and prices 
    useEffect(() => {
        let interval: NodeJS.Timer;

        // every 3 seconds, move train to the next station, update station number and prices
        interval = setInterval(() => {
        
            // handle train animation movement direction
            if (activeStationIdx == 4) {
                setTrainMovementDelta(-180);
            }
            else if (activeStationIdx == 3) {
                setTrainMovementDelta(180);
            }

            // handle train direction for counting at which station the train is
            if (activeStationIdx == 5) {
                setTrainStationDelta(-1);
            }
            else if (activeStationIdx == 2) {
                setTrainStationDelta(1);
            }

            setActiveStationIdx(activeStationIdx => activeStationIdx + trainStationDelta);
            setTrainWaiting(true);

            // let train wait at the current station
            setTimeout(() => {
                setTrainWaiting(false);
                setTrainLeftPosition(prevPosition => prevPosition + trainMovementDelta);
            }, 2500)

            // if the user is still in the train and the journey not finished...
            if (!journeyFinished && userInTrain) {
                // ... update the amount of stations the user has driven
                setUserStationAmount(amount => amount + 1);

                // ... if neither the daily cap nor journey cap is reached, update the prices
                if (!dailyCapReached && !journeyCapReached) {
                    setTotalDayPrice(prevPrice => prevPrice + PRICE_PER_STATION);
                    setTotalJourneyPrice(prevPrice => prevPrice + PRICE_PER_STATION);
                }
            }
            
        }, 3000);
        return () => clearInterval(interval);
    }, [trainWaiting])

    return (
        <div className="route">
            <div className="route-informations">
                <div className="route-information">
                    <p className="route-information-title">Preis pro Station:</p>
                    <p className={"route-information-data " + (!userInTrain ? "info-grayed" : null)}>{`${PRICE_PER_STATION}€`}</p>
                </div>
                <div className="route-information">
                    <p className="route-information-title">Nutzer fährt:</p>
                    <p className={"route-information-data " + (!userInTrain ? "info-grayed" : null)}>
                        {userInTrain ? "ja" : "nein"}
                    </p>
                </div>
                <div className="route-information">
                    <p className="route-information-title">Anzahl gefahrener Stationen:</p>
                    <p className={"route-information-data " + (!userInTrain ? "info-grayed" : null)}>
                        {userStationAmount}
                    </p>
                </div>
                <div className="route-information">
                    <p className="route-information-title">Momentane Fahrtkosten:</p>
                    <p className={"route-information-data " + (!userInTrain ? "info-grayed" : null)}>
                        {`${totalJourneyPrice}€`}
                    </p>
                </div>
                <div className="route-information">
                    <p className="route-information-title">Tageskosten insg.:</p>
                    <p className={"route-information-data " + (!userInTrain ? "info-grayed" : null)}>
                        {`${totalDayPrice}€`}
                    </p>
                </div>
            </div>

            <div className="price-informations">
                <div className="route-information">
                    <p className="route-information-title">{`Kostendeckel erreicht (${PRICE_CAP_RIDE}€):`}</p>
                    <div className={"price-cap-status " + (journeyCapReached ? "price-capped" : null)}/>
                </div>
                <div className="route-information">
                    <p className="route-information-title">{`Tageskostendeckel erreicht (${PRICE_CAP_DAY}€):`}</p>
                    <div className={"price-cap-status " + (dailyCapReached ? "price-capped" : null)}/>
                </div>
            </div>

            <div className="route-line">
                <TrainAnimation startLeft={trainLeftPosition}/>

                <div className="route-stations">
                    {STATIONS.map((stationName: String, idx: number) => {
                        return <Station stationIsActive={idx == activeStationIdx - 1 && trainWaiting} stationName={stationName} key={idx}/>
                    })}
                </div>
                <div className="station-connection"/>
            </div>

            <div className="route-actions">
                <button className="route-action" disabled={!trainWaiting || userInTrain} onClick={() => {
                    // start new journey
                    setJourneyFinished(false);
                    setUserInTrain(true);
                    setJourneyDateTimes(dateTimes => ({ ...dateTimes, startTime: new Date() }));
                    setJourneyStations(stations => ({ ...stations, startStation: STATIONS[activeStationIdx - 1] }));
                }}>einsteigen</button>
                <button className="route-action" disabled={!trainWaiting || !userInTrain} style={{float: "right"}} onClick={() => {
                    // end current journey
                    setUserInTrain(false);
                    setJourneyDateTimes(dateTimes => ({ ...dateTimes, endTime: new Date(dateTimes.startTime.getTime() + 3 * 60000) }));
                    setJourneyStations(stations => ({ ...stations, endStation: STATIONS[activeStationIdx - 1] }));
                    setJourneyFinished(true);
                    setJourneyCapReached(false);
                }}>aussteigen</button>
            </div>
        </div>
    )
}