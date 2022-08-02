import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Hotel } from 'src/app/models/hotel';
import { AvailabilityRequestInterface } from 'src/app/models/interface/availabilityRequest.interface';
import { AvailabilityResponse } from 'src/app/models/interface/availabilityResponse.interface';
import { HotelInterface } from 'src/app/models/interface/hotelInterface.interface';
import { ReservationRequest } from 'src/app/models/reservation';
import { RoomInterface } from 'src/app/models/interface/room.interface';
import { MessengerService } from 'src/app/_services/messenger.service';
import { ReservationsService } from 'src/app/_services/reservations.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {

  constructor(private router: Router, private messengerService: MessengerService) { }

  
  hotelDetail: HotelInterface;;
  availabilityResponse: AvailabilityResponse;
  reservationRequest = new ReservationRequest;

  ngOnInit(): void {
    this.availabilityResponse = this.messengerService.getHotelDetails$()
    console.log(this.availabilityResponse)
  
  }
  
//   groupRoomsToDisplay(data: AvailabilityInterface[]){
//     var result: RoomGroupToDisplayInterface[] = [];
//     data.forEach(availableRoom => {
//       let roomGroup = result.find(group => group.groupId == availableRoom.bookingDetails.roomGroupId)
//       if(roomGroup){
//         roomGroup.rooms.push(availableRoom)
//       }else {
//         var newRoom: AvailabilityInterface[] = [availableRoom]
//         var newRoomGroup: RoomGroupToDisplayInterface = {
//           groupId: availableRoom.bookingDetails.roomGroupId,
//           rooms: newRoom,
//           quantity: 1
//         }
//         result.push(newRoomGroup);
//       }
//     })
//     return result;
//   }

bookThisRoom(room: RoomInterface){
    this.reservationRequest.room = room;
    this.reservationRequest.endDate = this.availabilityResponse.endDate;
    this.reservationRequest.startDate = this.availabilityResponse.startDate;
    this.reservationRequest.partySize = this.availabilityResponse.partySize;
    this.reservationRequest.numberOfRooms = this.availabilityResponse.numberOfRooms;
    this.messengerService.sendReservationRequest(this.reservationRequest);
    this.router.navigate(['complete-the-transaction'])
}

}
