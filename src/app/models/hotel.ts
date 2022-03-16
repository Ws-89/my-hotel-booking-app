
import { Grade } from "../enum/grade-type.enum";

export class Hotel {
    hotel_id: number;
    name: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    phoneNumber: string;
    email: string;
    grade: Grade;
    image: string;
}

