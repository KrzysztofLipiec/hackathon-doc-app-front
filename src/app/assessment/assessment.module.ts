import { NgModule } from '@angular/core';
import { AssessmentComponent } from './assessment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AssessmentService } from './assessment.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AssessmentComponent,
  ],
  exports: [
    AssessmentComponent,
  ],
  providers: [
    AssessmentService,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class AssessmentModule {
}
