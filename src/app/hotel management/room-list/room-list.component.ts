import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import {Location} from '@angular/common';
import {  RoomService } from 'src/app/_services/room.service';
import { RoomInterface } from 'src/app/models/interface/room.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  hotel_id: Number;
  rooms: RoomInterface[];


  constructor(private route: ActivatedRoute,
    private roomService: RoomService,
    private router: Router, private _location: Location) { }

  ngOnInit(): void {
    this.hotel_id = this.route.snapshot.params['id'];
    this.getRoomsByHotelId();

  }

 

  getRoomsByHotelId(){
    this.roomService.getRoomsByHotelId(this.hotel_id).subscribe(data => {
      this.rooms = data;
  })
  }

  deleteRoom(id: Number){
    this.roomService.deleteRoom(id).then(data => {
      this.getRoomsByHotelId()
    })
  }

  updateRoom(id: Number){
    this.router.navigate(['update-room', id]);
  }


  createRoom(hotel_id: Number){
    this.router.navigate(['create-room', hotel_id]);
  }

  backClicked() {
    this._location.back();
  }
}
