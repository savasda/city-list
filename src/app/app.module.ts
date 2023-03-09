import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TuiAlertModule, TuiDialogModule, TuiRootModule} from '@taiga-ui/core';

@NgModule({
  declarations: [
    AppComponent,
    MainContainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiAlertModule,
    TuiDialogModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
