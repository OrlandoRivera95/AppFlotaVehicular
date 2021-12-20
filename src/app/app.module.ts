import { BrowserModule } from '@angular/platform-browser';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms'; // se agrego el otro module
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';


//Components
import { AppComponent } from './app.component';
import { MenuComponent } from './pages/menu/menu.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { TransportistasComponent } from './pages/transportistas/transportistas.component';
import { LoginComponent } from './pages/login/login.component';
import { environment } from 'src/environments/environment';



//NgZorro
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { NgModule, Provider, forwardRef } from '@angular/core';  // se le agregaron  Provider, forwardRef
import { ApiModule } from './api/api.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzResultModule } from 'ng-zorro-antd/result';
import { ApiInterceptor } from './api.interceptor';


registerLocaleData(en);

export const API_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: forwardRef(() => ApiInterceptor),
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    WelcomeComponent,
    TransportistasComponent,
    LoginComponent


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IconsProviderModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzDividerModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzIconModule,
    NzMessageModule,
    NzResultModule,


    ApiModule.forRoot({ rootUrl: environment.API }),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    ApiInterceptor,
    API_INTERCEPTOR_PROVIDER,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
