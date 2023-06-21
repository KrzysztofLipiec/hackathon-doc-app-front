import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AssessmentModule } from './assessment/assessment.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AssessmentModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
