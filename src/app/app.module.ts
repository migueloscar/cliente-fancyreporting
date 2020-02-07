import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HomeComponent} from './home/home.component';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';


export function getHighlightLanguages() {
  return {
    csharp: () => import('highlight.js/lib/languages/cs')
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HighlightModule
  ],
  providers: [{
    provide: HIGHLIGHT_OPTIONS,
    useValue: {
      languages: getHighlightLanguages()
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
