import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AvailabilityInterface } from 'src/app/models/interface/availability.interface';
import { AvailabilityRequestInterface } from 'src/app/models/interface/availabilityRequest.interface';
import { RoomGroupToDisplayInterface } from 'src/app/models/interface/roomGroupToDisplay.interface';
import { MessengerService } from 'src/app/_services/messenger.service';
import { ReservationsService } from 'src/app/_services/reservations.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private reservationService: ReservationsService,
              private messengerService: MessengerService, 
              private userAuthService: UserAuthService) { }

  id: number;
  searchResult: AvailabilityInterface[];
  hotelDetail: Partial<AvailabilityInterface>;
  availabilityRequest: AvailabilityRequestInterface;
  availableGroups: RoomGroupToDisplayInterface[];
  startDate: string;
  endDate: string;
  

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    

    this.messengerService.getAvailabilitySearchData().pipe(
      switchMap(searchData => this.messengerService.getSearchResultData().pipe(map(
        data => {
          this.hotelDetail = {
            image: data[0].image,
            hotel_name: data[0].hotel_name,
            city: data[0].city
          }
          this.availabilityRequest = searchData;
          let tempStartDate = new Date(searchData.from_date)
          this.startDate = tempStartDate.toISOString().split('T')[0]
          let tempEndDate = new Date(searchData.to_date)
          this.endDate = tempEndDate.toISOString().split('T')[0]
          this.availableGroups = this.groupRoomsToDisplay(data.filter(x => x.hotel_id == this.id));
        }
      )
        
      ))
    ).subscribe();
  }
  
  groupRoomsToDisplay(data: AvailabilityInterface[]){
    var result: RoomGroupToDisplayInterface[] = [];
    data.forEach(availableRoom => {
      let roomGroup = result.find(group => group.group_id == availableRoom.room_group_id)
      if(roomGroup){
        roomGroup.rooms.push(availableRoom)
      }else {
        var newRoom: AvailabilityInterface[] = [availableRoom]
        var newRoomGroup: RoomGroupToDisplayInterface = {
          group_id: availableRoom.room_group_id,
          rooms: newRoom,
          quantity: 1
        }
        result.push(newRoomGroup);
      }
    })
    return result;
  }

  

  bookThisRoom(
  group: RoomGroupToDisplayInterface): void {
  let availabilities: AvailabilityInterface[] = [];
    for(let i = 0; i < group.quantity; i++){
      group.rooms[i].from_date = this.availabilityRequest.from_date;
      group.rooms[i].to_date = this.availabilityRequest.to_date;
      availabilities.push(group.rooms[i])
    }

    if(this.userAuthService.isLoggedIn()){
    this.reservationService.addReservationItemCart(availabilities).subscribe(data => {
      this.router.navigateByUrl('/reservation-page')
    })
    }else{
      this.messengerService.sendReservationForNonLoggedInUser(availabilities)
      this.router.navigateByUrl('/complete-the-transaction')   
    }
  }
  


}
