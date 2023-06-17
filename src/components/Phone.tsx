import { useEffect, useState } from "react"


function RideCard(props: any) {

    let onGoing: boolean = props.rideData.rideOnGoing;

    let colorStyle: { color: any } = onGoing ? { color: "#FFFFFF" } : { color: "#4B4B4B" };
    let informationImage: string = onGoing ? "images/information-icon-white.svg" : "images/information-icon.svg"
    let connectionImage: string = onGoing ? "images/connection-icon-ongoing.svg" : "images/connection-icon.svg"

    let [times, setTimes] = useState<{startTime: String, endTime: String}>();

    useEffect(() => {
        setTimes({
            startTime: props.rideData.startTime.slice(0, -6).replace(/\//g, ".").replace(",", ""),
            endTime: props.rideData.rideOnGoing ? "laufend" : props.rideData.endTime.split(", ")[1].slice(0, -6).replace(/\//g, ".")
        })
    }, []);

    return (
        <div className={onGoing ? "ride-card-ongoing" : "ride-card"}>
            <img className="information-icon" src={informationImage} />
            <p style={colorStyle} className="date-time-info">{`${times?.startTime} - ${times?.endTime}`}</p>
            <div className="station-info">
                <p style={colorStyle} className="start-station-info">{props.rideData.startStation}</p>
                <img className="connection-icon" src={connectionImage} />
                { !onGoing ?
                    <>
                    <p style={colorStyle} className="end-station-info">{props.rideData.endStation}</p>
                    <p className="station-amout-info">insg.: {props.rideData.stationAmount}</p>
                    </>
                : null }
            </div>
            { !onGoing ?
                <p className="price-info">
                    Price:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={{ color: "#42EBB8" }}>&nbsp;{props.rideData.price}</span>
                    <span style={{ color: "#D4D4D4" }}>&nbsp;&nbsp;&nbsp;/ max {props.rideData.maxPrice}</span>
                </p>
            : null }
        </div>
    )
}



export default function Phone(props: any) {

    interface RideData {
        rideOnGoing: boolean,
        dateTime: string;
        startStation: string;
        endStation: string;
        stationAmount: number;
        price: string;
        maxPrice: string;
    }      

    return (
        <div className="phone">
            <div className="phone-header">
                <img className="account-icon" src="images/account-icon.svg"></img>
                <img className="settings-icon" src="images/settings-icon.svg"></img>
                <h1 className="welcome-text">Hallo, <span style={{ color: "#42EBB8" }}>{"Julia!"}</span></h1>
            </div>
            <h1 className="your-rides">Deine Fahrten:</h1>
            <div className="ride-cards">
                {
                    props.allJourneys.map((card: any) => {
                        return  <RideCard rideData={card}/>
                    })
                }
            </div>
        </div>
    )
}