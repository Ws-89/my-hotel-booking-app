import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Grade } from '../enum/grade-type.enum';
import { Hotel } from '../hotel';
import { HotelsService } from '../_services/hotels.service';


@Component({
  selector: 'app-update-hotel',
  templateUrl: './update-hotel.component.html',
  styleUrls: ['./update-hotel.component.css']
})
export class UpdateHotelComponent implements OnInit {

  hotel: Hotel = new Hotel();
  id: number;

  grades = Grade;
  gradeKeys = [];

  constructor(private hotelService: HotelsService, private route: ActivatedRoute, private router: Router) { 
    this.gradeKeys = Object.keys(this.grades)
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.hotelService.getHotelById(this.id).subscribe(data => {
      console.log(data)
      
        this.hotel.hotel_id = data.hotel_id
        this.hotel.name = data.name;
        this.hotel.street = data.street;
        this.hotel.city = data.city;
        this.hotel.state = data.state;
        this.hotel.country = data.country;
        this.hotel.zipcode = data.zipcode;
        this.hotel.phoneNumber = data.phoneNumber;
        this.hotel.email = data.email;
        this.hotel.grade = data.grade;
    },
    error => console.log(error));
  }

  onSubmit() {
    this.hotelService.updateHotel(this.id, this.hotel).subscribe(data => {
      console.log(this.hotel);
      this.goToHotelList();
    },
    error => console.log(error));
  }

  goToHotelList(){
    this.router.navigate(['/hotels'])
  }

  

}
