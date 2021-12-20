import { Component, OnInit } from '@angular/core';
import { Transportistas } from 'src/app/api/models';
import { TranportistasControllerService } from 'src/app/api/services';


@Component({
  selector: 'app-transportistas',
  templateUrl: './transportistas.component.html'
})


export class TransportistasComponent implements OnInit {
  listOfData: Transportistas[] = []
  
constructor(
  private transportistasService:TranportistasControllerService
  ){}

  ngOnInit():void{
    this.getData();
  }
  
  getData():void{
    this.transportistasService.find().subscribe(data=>this.listOfData=data)
  }
}
