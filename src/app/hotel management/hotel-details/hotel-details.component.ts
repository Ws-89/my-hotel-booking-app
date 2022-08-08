
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { CustomResponse } from 'src/app/models/interface/customResponse';
import { HotelInterface } from 'src/app/models/interface/hotelInterface.interface';
import { HotelsService } from '../../_services/hotels.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
}) 
export class HotelDetailsComponent implements OnInit {

  hotelDetails$: Observable<({ appState: string, appData?: CustomResponse<HotelInterface>, error?: HttpErrorResponse })>;
  form: FormGroup;

  selectedFile: File = null;
  private dataSubject = new BehaviorSubject<CustomResponse<HotelInterface>>(null);

  constructor(private route: ActivatedRoute, private hotelService: HotelsService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      lastName: new FormControl(''),
    })
    

    this.hotelDetails$ = this.hotelService.getHotelById$(this.route.snapshot.params['id']).pipe(
      map((response: CustomResponse<HotelInterface>) =>  {
        console.log('response',response)
        this.dataSubject.next(response)
        return ({ appState: 'APP_LOADED', appData: response })
      }),
      startWith({ appState: 'APP_LOADING'}),
      catchError((error:HttpErrorResponse) => {
        return of({ appState: 'APP_ERROR', error }) 
      })) 
  }


  updateHotel(id: number){
    this.router.navigate(['update-hotel', id]);
  }

  deleteHotel(id: number){
    this.hotelService.deleteHotel(id).then(data => {
      this.router.navigate(['hotels']);
    })
  }

  showRoomList(id: number){
    this.router.navigate(['rooms', id]);
  }

  showReservationsOfThisHotel(id: number){
    this.router.navigate(['hotel-reservation-list', id])
  }

  switchHotelState(id: number, state: boolean){
    this.hotelService.switchHotelState(id, state).then(response => {
      this.hotelDetails$ = this.hotelService.getHotelById$(this.route.snapshot.params['id']).pipe(
        map((response: CustomResponse<HotelInterface>) =>  {
          console.log('response',response)
          return ({ appState: 'APP_LOADED', appData: response })
        }),
        startWith({ appState: 'APP_LOADED' , appData: this.dataSubject.value }),
        catchError((error:HttpErrorResponse) => {
          return of({ appState: 'APP_ERROR', error }) 
        })) 
    }
    )
  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(){
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name)
    this.hotelService.uploadImage(this.route.snapshot.params['id'], fd).then(res => {
      console.log(res);
    })
  }


}
