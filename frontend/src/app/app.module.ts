import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{ HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './tasks/create/create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { ListComponent } from './tasks/list/list.component';
import { MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    HeaderComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressBarModule,
    HttpClientModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
