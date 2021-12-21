import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpParams } from '@angular/common/http';
import { Posiciones} from 'src/app/api/models';
import { TransferState } from '@angular/platform-browser';
import { PosicionesService } from 'src/app/services/posiciones.service';

@Component({
  selector: 'app-posiciones',
  templateUrl: './posiciones.component.html',
  styleUrls: ['./posiciones.component.css']
})
export class PosicionesComponent{

  listOfPosiciones: Posiciones[] = [];
  form!: FormGroup;
  http: any;
  visible = false;
  accion: boolean = true;
  idModificar: string = '';

  constructor(
    private PosicionesService: PosicionesService,
    private nzMessageService: NzMessageService,
    private formBuilder: FormBuilder
  ) { this.buildForm(); }

  private buildForm() {
    this.form = this.formBuilder.group({
      latitud: [''],
      longitud: [''],
      altitud: [''],
    });
  }
  ngOnInit(): void {
    this.PosicionesService.getAllPosiciones().toPromise().then(
      (data: Posiciones[]) => this.listOfPosiciones = data
    )
  }

  delete(id: string) {
    this.PosicionesService.deletePosiciones(id).toPromise().then(() => {
      this.nzMessageService.warning('El registro fue eliminado con exito!');
      this.listOfPosiciones = this.listOfPosiciones.filter(x => x.id !== id);
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

      this.PosicionesService.postPosiciones(this.form.value).toPromise().then((data: any) => {
        
        this.nzMessageService.success('El registro fue ingresado con exito!');
        this.listOfPosiciones = [...this.listOfPosiciones, data]
        //Limpia el formulario y lo cierra

        this.buildForm();
        this.visible = false;
      }, (error) => {
        this.nzMessageService.error('El registro no pudo ser ingresado, por favor intente de nuevo');
        console.error(error);
      })
    } else {
      this.PosicionesService.putPosiciones(this.idModificar, this.form.value).toPromise().then(() => {
        for (let elemento of this.listOfPosiciones.filter(x => x.id === this.idModificar)) {
          elemento.latitud = this.form.value.latitud;
          elemento.longitud = this.form.value.longitud;
          elemento.altitud = this.form.value.altitud;
        }
        this.visible = false;
        this.nzMessageService.success('El registro fue actualizado con exito!');
      }, (error) => {
        this.nzMessageService.error('El registro no pudo ser actualizado, por favor intente de nuevo');
        console.error(error);
      })
    }
  }

  modificar(item: Posiciones): void {
    this.accion = false;
    this.idModificar=item.id
    this.visible = true;
    this.form = this.formBuilder.group({
      latitud: [item.latitud],
      longitud: [item.longitud],
      altitud: [item.altitud]
    })
  }

  submitForm(): void {
    for (const i in this.form?.controls) {
      this.form?.controls[i].markAsDirty();
      this.form?.controls[i].updateValueAndValidity();
    }
  }
}
