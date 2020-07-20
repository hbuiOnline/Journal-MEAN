//This file define our importnt feature of our angular app has
//Application divided into components

//This file is to used to import the  module we created in the project

//This is where we include/link the modules from angular
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //Linking the file path
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; //For ngModule
import { HttpClientModule } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input'; //Material module
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatExpansionModule} from '@angular/material/expansion';

//This is for component we create for our app
import { AppComponent } from './app.component';
import { PostCreateComponent} from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';

@NgModule({
  declarations: [ //declare the AppComponent
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent] //Adding the bootstrap array, tell the angular it should search the index.html file
                            //For the AppComponent identified by its selector
})
export class AppModule { }
