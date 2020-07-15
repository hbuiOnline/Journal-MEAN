//This is the one where angular execute it first

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule) //Mainly executing this line
                                                    //Tell the angular to execute the AppModule
  .catch(err => console.error(err));
