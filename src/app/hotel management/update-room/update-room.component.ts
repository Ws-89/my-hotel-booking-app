import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomType } from '../../enum/room-type.enum';
import { Room } from '../../models/room';
import { RoomService } from '../../_services/room.service';
import {Location} from '@angular/common';
import { RoomGroupService } from 'src/app/_services/room-group.service';
import { RoomGroupInterface } from 'src/app/models/interface/roomGroup.interface';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.css']
})
export class UpdateRoomComponent implements OnInit {

  id: number;

  roomGroup: RoomGroupInterface;
  roomType = RoomType;
  roomTypeKeys = [];

  constructor(private roomService: RoomService, private roomGroupService: RoomGroupService,
    private route: ActivatedRoute, private router: Router, private _location: Location) { 
    this.roomTypeKeys = Object.keys(this.roomType);
  }

  

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.roomGroupService.getRoomGroupById(this.id).subscribe(data => {
      this.roomGroup = data;
    }
    ,
    error => console.log(error));
  }


  onSubmit(){
    this.roomGroupService.updateRoomGroup(this.roomGroup)
    .subscribe( data => {
    this.backClicked();
    },
    error => console.log(error));
  }

  backClicked() {
    this._location.back();
  }

}
