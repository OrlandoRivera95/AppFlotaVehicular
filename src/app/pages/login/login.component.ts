import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserControllerService } from 'src/app/api/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  loading: boolean = true;
  formulario: boolean = true;
  passwordVisible = false;

  submitForm(): void {
    if (this.validateForm.valid) {
      this.formulario = false;
      this.loading = true;
      this.userService.login({'body': this.validateForm.value}).subscribe(resp => {
        const token:any=resp.token;
        if(token){
          localStorage.setItem('token', token);
          this.message.success('Bienvenido!')
          this.route.navigate(['welcome']);
        }else{
          this.message.error('Error inesperado, contactese con su administrador de sistemas')
        }
      },
      err=>{
        console.error(err)
        this.message.error('No se pudo inicar sesion :( revisa tus credenciales')
        this.buildForm();
        this.formulario = true;
        this.loading = false;
      }
      )

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(
    private fb: FormBuilder,
    private route:Router,
    private message:NzMessageService,
    private userService:UserControllerService
    
    ) {}

    ngOnInit(): void {
      this.formulario = true;
      this.loading = false;
  
      this.buildForm();
    }
  
    buildForm():void{
      this.validateForm = this.fb.group({
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(8)]]
      });
    }
  }
