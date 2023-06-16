import { useEffect, useState, useRef } from "react"



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
    let [animationStep, setAnimationStep] = useState<number>(0);
    let [animationFinished, setAnimationFinished] = useState<boolean>(false);

    const ROUTE_DISTANCE = 900;
    let stations: String[] = ["Station A", "Station B", "Station C", "Station D", "Station E", "Station F"]

    useEffect(() => {
        const interval = setInterval(() => {
            setTrainLeftPosition(trainLeftPosition + 180);
            setActiveStationIdx(activeStationIdx + 1);
        }, 5000);
    }, [trainLeftPosition]);


    return (
        <div className="route">
            <div className="route-line">
                <TrainAnimation startLeft={trainLeftPosition}/>

                <div className="route-stations">
                    {
                        stations.map((stationName: String) => {
                            return <Station stationIsActive={false} stationName={stationName}/>
                        })
                    }
                </div>
                <div className="station-connection"/>
            </div>

            <div className="route-actions">
                <button className="route-action" id="get-in">einsteigen</button>
                <button className="route-action" id="get-out" style={{float: "right"}}>aussteigen</button>
            </div>
        </div>
    )
}