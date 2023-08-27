import { Drivers } from "./drivers.model";

export interface Orders {
        _id?: string;
        id_order: number;
        location: string;
        distance_in_km: string;
        estimated_time: string;
        total: string;
        city: string;
        driver: string 
}