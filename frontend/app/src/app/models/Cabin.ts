import { Feature } from "./Feature"

export interface Cabin {

    id: number,
    name: string,
    description: string,
    location: string,
    pricePerNight: number,
    capacity: number,
    photos: string[],
    features:Feature[] 
      
}


