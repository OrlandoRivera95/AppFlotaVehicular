import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Rutas } from 'src/app/api/models';
import { RutasService } from 'src/app/services/rutas.service';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.css']
})
export class RutasComponent implements OnInit {

  listOfRutas: Rutas[] = [];
  form!: FormGroup;
  http: any;
  visible = false;
  accion: boolean = true;
  idModificar: string = '';

  constructor(
    private RutasService: RutasService,
    private nzMessageService: NzMessageService,
    private formBuilder: FormBuilder
  ) { this.buildForm(); }

  private buildForm() {
    this.form = this.formBuilder.group({
      distancia: [''],
      lugar_inicio: [''],
      lugar_final: [''],
    });
  }
  ngOnInit(): void {
    this.RutasService.getAllRutas().toPromise().then(
      (data: Rutas[]) => this.listOfRutas = data
    )
  }

  delete(id: string) {
    this.RutasService.deleteRutas(id).toPromise().then(() => {
      this.nzMessageService.warning('El registro fue eliminado con exito!');
      this.listOfRutas = this.listOfRutas.filter(x => x.id !== id);
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

      this.RutasService.postRutas(this.form.value).toPromise().then((data: any) => {
        
        this.nzMessageService.success('El registro fue ingresado con exito!');
        this.listOfRutas = [...this.listOfRutas, data]
        //Limpia el formulario y lo cierra

        this.buildForm();
        this.visible = false;
      }, (error) => {
        this.nzMessageService.error('El registro no pudo ser ingresado, por favor intente de nuevo');
        console.error(error);
      })
    } else {
      this.RutasService.putRutas(this.idModificar, this.form.value).toPromise().then(() => {
        for (let elemento of this.listOfRutas.filter(x => x.id === this.idModificar)) {
          elemento.distancia = this.form.value.distancia;
          elemento.lugar_inicio = this.form.value.lugar_inicio;
          elemento.lugar_final = this.form.value.lugar_final;
        }
        this.visible = false;
        this.nzMessageService.success('El registro fue actualizado con exito!');
      }, (error) => {
        this.nzMessageService.error('El registro no pudo ser actualizado, por favor intente de nuevo');
        console.error(error);
      })
    }
  }

  modificar(item: Rutas): void {
    this.accion = false;
    this.idModificar=item.id
    this.visible = true;
    this.form = this.formBuilder.group({
      distancia: [item.distancia],
      lugar_inicio: [item.lugar_inicio],
      lugar_final: [item.lugar_final]
    })
  }

  submitForm(): void {
    for (const i in this.form?.controls) {
      this.form?.controls[i].markAsDirty();
      this.form?.controls[i].updateValueAndValidity();
    }
  }
}