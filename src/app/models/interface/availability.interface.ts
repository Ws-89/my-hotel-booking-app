import { Grade } from "src/app/enum/grade-type.enum";
import { RoomType } from "src/app/enum/room-type.enum";
import { BookingDetails } from "./bookingDetails.interface";


export interface AvailabilityInterface {
    availabilityId: number;
    bookingDetails: Partial<BookingDetails>;
    // hotelId: number;
    // hotelName: string;
    // city: string;
    // grade: Grade;
    // roomId: number;
    // description: string;
    // roomType: RoomType;
    // roomGroupId: number;
    // startDate: Date;
    // endDate: Date;
    // price: number;
    // image: string;
}