import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Recorridos } from 'src/app/api/models';
import { RecorridosService } from 'src/app/services/recorridos.service';


@Component({
  selector: 'app-recorridos',
  templateUrl: './recorridos.component.html',
  styleUrls: ['./recorridos.component.css']
})
export class RecorridosComponent {

  listOfRecorridos: Recorridos[] = [];
  form!: FormGroup;
  http: any;
  visible = false;
  accion: boolean = true;
  idModificar: string = '';

  constructor(
    private RecorridosService: RecorridosService,
    private nzMessageService: NzMessageService,
    private formBuilder: FormBuilder
  ) { this.buildForm(); }

  private buildForm() {
    this.form = this.formBuilder.group({
      asignacion: [''],
      calcularRuta: [''],
    });
  }
  ngOnInit(): void {
    this.RecorridosService.getAllRecorridos().toPromise().then(
      (data: Recorridos[]) => this.listOfRecorridos = data
    )
  }

  delete(id: string) {
    this.RecorridosService.deleteRecorridos(id).toPromise().then(() => {
      this.nzMessageService.warning('El registro fue eliminado con exito!');
      this.listOfRecorridos = this.listOfRecorridos.filter(x => x.id !== id);
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

      this.RecorridosService.postRecorridos(this.form.value).toPromise().then((data: any) => {
        
        this.nzMessageService.success('El registro fue ingresado con exito!');
        this.listOfRecorridos = [...this.listOfRecorridos, data]
        //Limpia el formulario y lo cierra

        this.buildForm();
        this.visible = false;
      }, (error) => {
        this.nzMessageService.error('El registro no pudo ser ingresado, por favor intente de nuevo');
        console.error(error);
      })
    } else {
      this.RecorridosService.putRecorridos(this.idModificar, this.form.value).toPromise().then(() => {
        for (let elemento of this.listOfRecorridos.filter(x => x.id === this.idModificar)) {
          elemento.asignacion = this.form.value.asignacion;
          elemento.calcularRuta = this.form.value.calcularRuta;
        }
        this.visible = false;
        this.nzMessageService.success('El registro fue actualizado con exito!');
      }, (error) => {
        this.nzMessageService.error('El registro no pudo ser actualizado, por favor intente de nuevo');
        console.error(error);
      })
    }
  }

  modificar(item: Recorridos): void {
    this.accion = false;
    this.idModificar=item.id
    this.visible = true;
    this.form = this.formBuilder.group({
      asignacion: [item.asignacion],
      calcularRuta: [item.calcularRuta],
    })
  }

  submitForm(): void {
    for (const i in this.form?.controls) {
      this.form?.controls[i].markAsDirty();
      this.form?.controls[i].updateValueAndValidity();
    }
  }
}