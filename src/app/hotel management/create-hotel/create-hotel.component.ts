import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grade } from '../../enum/grade-type.enum';
import { Hotel } from '../../models/hotel';
import { HotelsService } from '../../_services/hotels.service';
import { Room } from '../../models/room';



@Component({
  selector: 'app-create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.css'],
})
export class CreateHotelComponent implements OnInit {

  hotel: Hotel = new Hotel();

  grades = Grade;
  gradeKeys = [];

  constructor(private hotelService: HotelsService, private router: Router) { 
    this.gradeKeys = Object.keys(this.grades);
    console.log(this.grades)
  }

  ngOnInit(): void {
  }

  saveHotel(){
    this.hotelService.saveHotel(this.hotel).subscribe(data => {
      console.log(data);
      this.goToHotelList();
    },
    error => console.log(error));
  }

  goToHotelList(){
    this.router.navigate(['/hotels'])
  }

  onSubmit(){
    this.saveHotel()
  }

}
