import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomGroupInterface } from 'src/app/models/interface/roomGroup.interface';
import { RoomGroupService } from 'src/app/_services/room-group.service';
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

  form: FormGroup;
  roomType = RoomType;
  roomTypeKeys = [];
  id: Number;


  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private roomGroupService: RoomGroupService){
    this.roomTypeKeys = Object.keys(this.roomType);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.form = this.fb.group({
      description: new FormControl('',Validators.required),
      roomType: new FormControl('',Validators.required),
      quantity_of_rooms: new FormControl('', Validators.required)
    })
  }

  saveGroup(roomGroup: Partial<RoomGroupInterface>){
    this.roomGroupService.createRoomGroup(this.id, roomGroup).subscribe(data => {
      this.goToRoomList();
    },
    error => console.log(error));
  }

  goToRoomList(){
    this.router.navigate(['/rooms', this.id])
  }

  onSubmit(){
    let roomGroup = {
      description : this.form.value.description,
      quantity_of_rooms : this.form.value.quantity_of_rooms,
      roomType : this.form.value.roomType,
    }    
  
    this.saveGroup(roomGroup);
  }

}
