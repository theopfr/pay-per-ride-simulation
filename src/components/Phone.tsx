import { useEffect, useState } from "react"


function RideCard(props: any) {

    let onGoing: boolean = props.rideData.rideOnGoing;

    let colorStyle: { color: any } = onGoing ? { color: "#FFFFFF" } : { color: "#4B4B4B" };
    let informationImage: string = onGoing ? "images/information-icon-white.svg" : "images/information-icon.svg"
    let connectionImage: string = onGoing ? "images/connection-icon-ongoing.svg" : "images/connection-icon.svg"

    return (
        <div className={onGoing ? "ride-card-ongoing" : "ride-card"}>
            <img className="information-icon" src={informationImage} />
            <p style={colorStyle} className="date-time-info">{props.rideData.dateTime}</p>
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
                    <span style={{ color: "#D4D4D4" }}>&nbsp;&nbsp;&nbsp;/ max{props.rideData.maxPrice}</span>
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

    let [rideData, setRideData] = useState<RideData[]>([]);

    const cards: RideData[] = [
        {   
            rideOnGoing: true,
            dateTime: "heute: 08:42 - laufend",
            startStation: "Station A",
            endStation: "Station B",
            stationAmount: 3,
            price: "3.30€",
            maxPrice: "3.70€"
        },
        {
            rideOnGoing: false,
            dateTime: "06.06.2023 08:42-09:01",
            startStation: "Station A",
            endStation: "Station B",
            stationAmount: 3,
            price: "3.30€",
            maxPrice: "3.70€"
        },
        {
            rideOnGoing: false,
            dateTime: "06.06.2023 08:42-09:01",
            startStation: "Station A",
            endStation: "Station B",
            stationAmount: 3,
            price: "3.30€",
            maxPrice: "3.70€"
        },
        {
            rideOnGoing: false,
            dateTime: "06.06.2023 08:42-09:01",
            startStation: "Station A",
            endStation: "Station B",
            stationAmount: 3,
            price: "3.30€",
            maxPrice: "3.70€"
        },
        {
            rideOnGoing: false,
            dateTime: "06.06.2023 08:42-09:01",
            startStation: "Station A",
            endStation: "Station B",
            stationAmount: 3,
            price: "3.30€",
            maxPrice: "3.70€"
        },
        {
            rideOnGoing: false,
            dateTime: "06.06.2023 08:42-09:01",
            startStation: "Station A",
            endStation: "Station B",
            stationAmount: 3,
            price: "3.30€",
            maxPrice: "3.70€"
        },
        {
            rideOnGoing: false,
            dateTime: "06.06.2023 08:42-09:01",
            startStation: "Station A",
            endStation: "Station B",
            stationAmount: 3,
            price: "3.30€",
            maxPrice: "3.70€"
        }
    ];

    useEffect(() => {
        setRideData(cards);
    }, [])


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
                    rideData.map((card: any) => {
                        return  <RideCard rideData={card}/>
                    })
                }
            </div>
        </div>
    )
}