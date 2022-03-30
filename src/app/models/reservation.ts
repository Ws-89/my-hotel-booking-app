import { Grade } from "../enum/grade-type.enum";
import { RoomType } from "../enum/room-type.enum";

export class Reservation {
    hotel_id: number;
    hotel_name: string;
    city: string;
    grade: Grade;
    image: string;
    room_id : number;
    roomType: RoomType;
    from_date: Date;
    to_date: Date;
    price: number;

    // constructor(
    //     hotel_id: number,
    //     hotel_name: string,
    //     city: string,
    //     grade: Grade,
    //     image: string,
    //     room_id : number,
    //     roomType: RoomType,
    //     from_date: Date,
    //     to_date: Date,
    //     price: number)
    //     {
    //         this.hotel_id = hotel_id;
    //         this.hotel_name = hotel_name;
    //         this.city = city;
    //         this.grade = grade;
    //         this.room_id = room_id;
    //         this.roomType = roomType;
    //         this.from_date = new Date(from_date);
    //         this.to_date = new Date(to_date);
    //         this.price = price;
    //     }
}
