import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Room } from '../room';
import { RoomService } from '../_services/room.service';
import {Location} from '@angular/common';

// ng g c room-list
@Component({
  selector: 'app-room-list', // to skopiowalem do app.component.html
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  // zmienna zawierajaca tablice
  hotel_id: Number;
  rooms: Room[];

  constructor(private route: ActivatedRoute, private roomService: RoomService,
    private router: Router, private _location: Location) { }

  ngOnInit(): void {
    this.hotel_id = this.route.snapshot.params['id'];

    this.roomService.getRoomlistByHotelId(this.hotel_id).subscribe(data =>{
      this.rooms = data;
    })
  }

  private getRooms(){
    this.roomService.getRoomlist().subscribe(data => {
      this.rooms = data;
    });
  }

  private getRoomsByHotelId(id: Number){
    this.roomService.getRoomlistByHotelId(id).subscribe(data => {
      this.rooms = data;
    });
  }

  updateRoom(id: Number){
    this.router.navigate(['update-room', id]);
  }

  deleteRoom(id: Number, hotel_id){
    this.roomService.deleteRoom(id).subscribe(data => {
      console.log(data);
      this.getRoomsByHotelId(hotel_id)
    })
  }

  roomDetails(id: Number){
    this.router.navigate(['room-details', id]);
  }

  createRoom(hotel_id: Number){
    this.router.navigate(['create-room', hotel_id]);
  }
  
  backClicked() {
    this._location.back();
  }
}
