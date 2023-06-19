
export interface RideData {
    rideOnGoing: boolean,
    startTime: String;
    endTime: String;
    startStation: String;
    endStation: String;
    stationAmount: number;
    price: number;
    maxPrice: number;
    priceCapReached: boolean;
    id: number;
}