import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { TransportistasComponent } from './pages/transportistas/transportistas.component';
import { VehiculosComponent } from './pages/vehiculos/vehiculos.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },

  { path:'',
      component:MenuComponent,
    children:[
      {path:'welcome',component:WelcomeComponent},
      {path:'transportistas',component:TransportistasComponent},
      {path:'vehiculos',component:VehiculosComponent}
    ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
