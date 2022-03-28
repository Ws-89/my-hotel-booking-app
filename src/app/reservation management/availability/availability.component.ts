import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Availability } from 'src/app/models/availability';
import { AvailabilityRequest } from 'src/app/models/availabilityRequest';
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
  searchResult: Availability[];
  roomsOfSpecificHotel: Availability[];
  availabilityRequest: AvailabilityRequest;
  

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.messengerService.getSearchResultData().subscribe(x => this.searchResult = x);
    this.roomsOfSpecificHotel = this.searchResult.filter(x => x.hotel_id == this.id);
    this.messengerService.getAvailabilitySearchData().subscribe(x => this.availabilityRequest = x)
  }

  bookThisRoom(availability: Availability){
    availability.from_date = this.availabilityRequest.from_date;
    availability.to_date = this.availabilityRequest.to_date;
    if(this.userAuthService.isLoggedIn()){
    this.reservationService.addReservationItemCart(availability).subscribe(data => {
      this.router.navigateByUrl('/reservation-page')
    })
    }else{
      localStorage.setItem("reservation", JSON.stringify(availability))
      this.messengerService.sendReservationForNonLoggedInUser(availability);
      this.router.navigateByUrl('/complete-the-transaction')
    }
  }
  


}
