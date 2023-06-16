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



export default function Route() {

    let [activeStationIdx, setActiveStationIdx] = useState<number>(0);
    let [trainLeftPosition, setTrainLeftPosition] = useState<number>(0);
    let [trainWaiting, setTrainWaiting] = useState<boolean>(false);
    let [trainMovementDelta, setTrainMovementDelta] = useState<number>(180);
    let [trainStationDelta, setTrainStationDelta] = useState<number>(1);

    let stations: String[] = ["Station A", "Station B", "Station C", "Station D", "Station E", "Station F"]



    /*let interval = setInterval(() => {
        setTrainLeftPosition(trainLeftPosition + 180);
        setActiveStationIdx(activeStationIdx + 1);
        setTrainWaiting(false)
    }, 4000);*/

    
    useEffect(() => {
        setTrainWaiting(true);
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timer;
        interval = setInterval(() => {
        
        // I HAVE NO IDEA WHAT I DID HERE IM SO SORRYY

        // handle train animation movement
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

        setActiveStationIdx(activeStationIdx => activeStationIdx + trainStationDelta)
        console.log(activeStationIdx, trainMovementDelta);

        setTrainWaiting(true);
        setTimeout(() => {
            setTrainWaiting(false);
            setTrainLeftPosition(prevPosition => prevPosition + trainMovementDelta);
        }, 2500)
            
        }, 4000);
        return () => clearInterval(interval);
    }, [trainWaiting])






    return (
        <div className="route">
            <div className="route-line">
                <TrainAnimation startLeft={trainLeftPosition}/>

                <div className="route-stations">
                    {
                        stations.map((stationName: String, idx: number) => {
                            return <Station stationIsActive={idx == activeStationIdx - 1 && trainWaiting} stationName={stationName}/>
                        })
                    }
                </div>
                <div className="station-connection"/>
            </div>

            <div className="route-actions">
                <button className="route-action" id="get-in" onClick={() => {
                    if (trainWaiting) {
                        console.log("waiting")
                    }
                    else {
                        console.log("driving")
                    }
                }}>{trainWaiting ? "wait" : "get in"}</button>
                <button className="route-action" id="get-in" style={{float: "right"}}>aussteigen</button>
            </div>
        </div>
    )
}