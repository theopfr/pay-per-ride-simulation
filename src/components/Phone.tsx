import { useEffect, useState } from "react"
import { RideData } from "./RideDataInterface";


function RideCard(props: { journeyData: RideData }) {
    let onGoing: boolean = props.journeyData.rideOnGoing;

    let colorStyle: { color: any } = onGoing ? { color: "#FFFFFF" } : { color: "#4B4B4B" };
    let informationImage: string = onGoing ? "images/information-icon-white.svg" : "images/information-icon.svg"
    let connectionImage: string = onGoing ? "images/connection-icon-ongoing.svg" : "images/connection-icon.svg"

    let startTime = props.journeyData.startTime.slice(0, -6).replace(/\//g, ".").replace(",", "");
    let endTime = onGoing ? "laufend" : props.journeyData.endTime.split(", ")[1].slice(0, -6).replace(/\//g, ".");

    return (
        <div className={onGoing ? "ride-card-ongoing" : "ride-card"}>
            <img className="information-icon" src={informationImage} />
            <p style={colorStyle} className="date-time-info">{`${startTime} - ${endTime}`}</p>
            <div className="station-info">
                <p style={colorStyle} className="start-station-info">{props.journeyData.startStation}</p>
                <img className="connection-icon" src={connectionImage} />
                { !onGoing ?
                    <>
                    <p style={colorStyle} className="end-station-info">{props.journeyData.endStation}</p>
                    <p className="station-amount-info">insg.: {props.journeyData.stationAmount}</p>
                    </>
                : null }
            </div>
            { !onGoing ?
                <div className="price-info">
                    <p className="price-title">Preis:</p>
                    <p className="price-amount">{props.journeyData.price}€</p>
                    <p className="price-max">/ max {props.journeyData.maxPrice}€</p>
                </div>
            : null }
        </div>
    )
}



export default function Phone(props: { journeys: RideData[] }) {

    return (
        <div className="phone">
            <div className="phone-header">
                <img className="account-icon" src="images/account-icon.svg"></img>
                <img className="settings-icon" src="images/settings-icon.svg"></img>
                {
                    props.journeys[0].rideOnGoing ? <img className="bluetooth-icon" src="images/bluetooth-icon.svg"></img>
                    : null
                }
                <h1 className="welcome-text">Hallo, <span style={{ color: "#42EBB8" }}>User!</span></h1>
            </div>
            <h1 className="your-rides">Deine Fahrten:</h1>
            <div className="ride-cards">
                {
                    props.journeys.map((journeyData: RideData) => {
                        return <RideCard journeyData={journeyData} key={journeyData.id}/>
                    })
                }
            </div>
        </div>
    )
}