import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpParams } from '@angular/common/http';
import { Vehiculos } from 'src/app/api/models';
import { VehiculosService } from 'src/app/services/vehiculos.service';
import { TransferState } from '@angular/platform-browser';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent {

    listOfVehiculos: Vehiculos[] = [];
    form!: FormGroup;
    http: any;
    visible = false;
    accion: boolean = true;
    idModificar: string = '';
  
    constructor(
      private VehiculosService:VehiculosService,
      private nzMessageService: NzMessageService,
      private formBuilder: FormBuilder
    ) { this.buildForm(); }
  
    private buildForm() {
      this.form = this.formBuilder.group({
        color: [''],
        marca: [''],
        placa: [''],
        tipoVehiculo: [''],
      });
    }
    ngOnInit(): void {
      this.VehiculosService.getAllVehiculos().toPromise().then(
        (data: Vehiculos[]) => this.listOfVehiculos = data
      )
    }
  
    delete(id: string) {
      this.VehiculosService.deleteVehiculos(id).toPromise().then(() => {
        this.nzMessageService.warning('El registro fue eliminado con exito!');
        this.listOfVehiculos = this.listOfVehiculos.filter(x => x.id !== id);
      }, (error) => {
        this.nzMessageService.error('El registro no pudo ser eliminado, por favor intente de nuevo');
        console.error(error);
      })
    }
  
    cancel(): void {
      this.nzMessageService.info('Su registro sigue activo! =D')
    }
  
    open(): void {
      this.visible = true;
      this.accion = true;
    }
  
    close(): void {
      this.visible = false;
      this.buildForm();
    }
  
    guardar(): void {
      if (this.accion) {
  
        this.VehiculosService.postVehiculos(this.form.value).toPromise().then((data: any) => {
          
          this.nzMessageService.success('El registro fue ingresado con exito!');
          this.listOfVehiculos = [...this.listOfVehiculos, data]
          //Limpia el formulario y lo cierra
  
          this.buildForm();
          this.visible = false;
        }, (error) => {
          this.nzMessageService.error('El registro no pudo ser ingresado, por favor intente de nuevo');
          console.error(error);
        })
      } else {
        this.VehiculosService.putVehiculos(this.idModificar, this.form.value).toPromise().then(() => {
          for (let elemento of this.listOfVehiculos.filter(x => x.id === this.idModificar)) {
            elemento.color = this.form.value.color;
            elemento.marca = this.form.value.marca;
            elemento.placa = this.form.value.placa;
            elemento.tipoVehiculo = this.form.value.tipoVehiculo;
          }
          this.visible = false;
          this.nzMessageService.success('El registro fue actualizado con exito!');
        }, (error) => {
          this.nzMessageService.error('El registro no pudo ser actualizado, por favor intente de nuevo');
          console.error(error);
        })
      }
    }
  
    modificar(item: Vehiculos): void {
      this.accion = false;
      this.idModificar = item.id
      this.visible = true;
      this.form = this.formBuilder.group({
        color: [item.color],
        marca: [item.marca],
        placa: [item.placa],
        tipoVehiculos: [item.tipoVehiculo]
      })
    }
  
    submitForm(): void {
      for (const i in this.form?.controls) {
        this.form?.controls[i].markAsDirty();
        this.form?.controls[i].updateValueAndValidity();
      }
    }
  }
  