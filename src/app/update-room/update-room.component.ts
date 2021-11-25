import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomType } from '../enum/room-type.enum';
import { Room } from '../room';
import { RoomService } from '../_services/room.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.css']
})
export class UpdateRoomComponent implements OnInit {

  id: number;
  hotelId: number;
  room: Room = new Room();

  roomType = RoomType;
  roomTypeKeys = [];

  constructor(private roomService: RoomService,
    private route: ActivatedRoute, private router: Router, private _location: Location) { 
    this.roomTypeKeys = Object.keys(this.roomType);
  }

  

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.roomService.getRoomById(this.id).subscribe(data => {
      this.room = data;
    },
    error => console.log(error));
  }

  goToRoomList(){
    this.router.navigate(['/rooms'])
  }

  

  onSubmit(){
    this.roomService.updateRoom(this.id, this.room).subscribe( data => {
    this.backClicked();
    },
    error => console.log(error));
  }

  backClicked() {
    this._location.back();
  }

}
