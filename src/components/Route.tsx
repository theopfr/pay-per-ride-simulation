import { useEffect, useState, useRef } from "react"
import ReactInterval from 'react-interval';



function Station(props: any) {
    return (
        <div className={props.stationIsActive ? "station station-active" : "station"}>
            <p className="station-name">{props.stationName}</p>
        </div>
    )
}


/*function TrainAnimation(props: any) {
    const trainRef = useRef(null);
  
    useEffect(() => {
        const trainElement = trainRef.current;
  
        if (trainElement) {
            trainElement.style.setProperty('--start-left', props.startLeft);
            trainElement.style.setProperty('--end-left', props.endLeft);
        }
        
    }, [startLeft, endLeft]);
  
    return <img ref={trainRef} src="images/train.svg" className="train-icon"/>
  };
*/

const TrainAnimation = (props: any) => {

    /*let [positionLeft, setPositionLeft] = useState<number>(0);

    useEffect(() => {
        setPositionLeft(props.startLeft);
    }, [positionLeft]);*/

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

    const STATIONS: String[] = ["Station A", "Station B", "Station C", "Station D", "Station E", "Station F"]

    const PRICE_PER_STATION = 1.0;
    const PRICE_CAP = 3.0;


    useEffect(() => {
        if (!userInTrain) {
            props.getNewJourney({
                isActive: false,
                startTime: journeyDateTimes.startTime.toLocaleString(),
                endTime: journeyDateTimes.endTime.toLocaleString(),
                startStation: journeyStations.startStation,
                endStation: journeyStations.endStation,
                stationAmount: userStationAmount,
                price: Math.min(userStationAmount * PRICE_PER_STATION, PRICE_CAP)
            });
            setUserStationAmount(0);
        }
    }, [userInTrain]);

    useEffect(() => {
        let interval: NodeJS.Timer;
        interval = setInterval(() => {
        
        // handle train animation movement direction
        if (activeStationIdx == 4) {
            setTrainMovementDelta(-180);
        }
        else if (activeStationIdx == 3) {
            setTrainMovementDelta(180);
        }

        // handle current station
        if (activeStationIdx == 5) {
            setTrainStationDelta(-1);
        }
        else if (activeStationIdx == 2) {
            setTrainStationDelta(1);
        }

        // count amount of stations driven
        if (userInTrain) {
            setUserStationAmount(amount => amount + 1);
        }

        setActiveStationIdx(activeStationIdx => activeStationIdx + trainStationDelta);
        setTrainWaiting(true);

        setTimeout(() => {
            setTrainWaiting(false);
            setTrainLeftPosition(prevPosition => prevPosition + trainMovementDelta);
        }, 2500)
            
        }, 4000);
        return () => clearInterval(interval);
    }, [trainWaiting])


    const handlePrice = () => {
        if (!userInTrain) {
            return "-";
        }

        if ((userStationAmount * PRICE_PER_STATION) >= PRICE_CAP) {

            return `${PRICE_CAP}€`; 
        }
        return `${userStationAmount * PRICE_PER_STATION}€`;
    }

    return (
        <div className="route">
            <div className="route-informations">
                <div className="route-information">
                    <p className="route-information-title">Preis pro Station:</p>
                    <p className="route-information-data">{`${PRICE_PER_STATION}€`}</p>
                </div>
                <div className="route-information">
                    <p className="route-information-title">Nutzer fährt:</p>
                    <p className={"route-information-data " + (!userInTrain ? "info-grayed" : null)}>
                        {userInTrain ? "ja" : "nein"}
                    </p>
                </div>
                <div className="route-information">
                    <p className="route-information-title">Anzahl gefahrener Stationen:</p>
                    <p className={"route-information-data " + (userStationAmount === 0 ? "info-grayed" : null)}>
                        {userStationAmount}
                    </p>
                </div>
                <div className="route-information">
                    <p className="route-information-title">Momentane Kosten:</p>
                    <p className={"route-information-data " + (!userInTrain ? "info-grayed" : null)}>
                        {handlePrice()}
                    </p>
                </div>
                <div className="route-information">
                    <p className="route-information-title">Kostendeckel erreicht:</p>
                    <p className={"route-information-data " + ((userStationAmount * PRICE_PER_STATION) < PRICE_CAP ? "info-grayed" : null)}>
                        {(userStationAmount * PRICE_PER_STATION) < PRICE_CAP ? "ja": "nein"}
                    </p>
                </div>
            </div>

            <div className="route-line">
                <TrainAnimation startLeft={trainLeftPosition}/>

                <div className="route-stations">
                    {STATIONS.map((stationName: String, idx: number) => {
                        return <Station stationIsActive={idx == activeStationIdx - 1 && trainWaiting} stationName={stationName}/>
                    })}
                </div>
                <div className="station-connection"/>
            </div>

            <div className="route-actions">
                <button className="route-action" disabled={!trainWaiting || userInTrain} onClick={() => {
                    setUserInTrain(true);
                    setJourneyDateTimes(dateTimes => ({ ...dateTimes, startTime: new Date() }));
                    setJourneyStations(stations => ({ ...stations, startStation: STATIONS[activeStationIdx - 1] }));
                }}>einsteigen</button>
                <button className="route-action" disabled={!trainWaiting || !userInTrain} style={{float: "right"}}onClick={() => {
                    setUserInTrain(false);
                    setJourneyDateTimes(dateTimes => ({ ...dateTimes, endTime: new Date(dateTimes.startTime.getTime() + 3*60000) }));
                    setJourneyStations(stations => ({ ...stations, endStation: STATIONS[activeStationIdx - 1] }));
                }}>aussteigen</button>
            </div>
        </div>
    )
}