import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomType } from '../../enum/room-type.enum';
import { Room } from '../../models/room';
import { RoomService } from '../../_services/room.service';


// ng g c create-room
@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  room: Room = new Room();

  roomType = RoomType;
  roomTypeKeys = [];

  id: Number;


  constructor(private roomService: RoomService,
    private router: Router, private route: ActivatedRoute){
    this.roomTypeKeys = Object.keys(this.roomType);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

  saveRoom(){
    this.roomService.createRoom(this.id, this.room).subscribe( data => {
      this.goToRoomList();
    },
    error => console.log(error));
  }

  goToRoomList(){
    this.router.navigate(['/rooms', this.id])
  }

  onSubmit(){
    console.log(this.room)
    this.saveRoom();
  }

}
