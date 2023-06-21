import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { AssessmentService } from './assessment.service';

@Component({
  selector: 'assessment-component',
  templateUrl: './assessment.component.html',
})
export class AssessmentComponent {
  private personColumnName = 'person';

  public formData: FormGroup = this.formBuilder.group({
    user: this.formBuilder.control('krzysztof.lipiec@appfire.com'),
    board: this.formBuilder.control(1214370699),
    group: this.formBuilder.control(''),
  })

  constructor(
    private formBuilder: FormBuilder,
    private assessmentService: AssessmentService,
  ) {
    this.assessmentService
      .getUsersAndBoards()
      .subscribe((response) => {
        console.log(response);
      });
  }

  public getAssessmentFromApi(): void {
    let { user, board } = this.formData.getRawValue();
    this.assessmentService.getAssessment(user, board, this.personColumnName).pipe(
      tap((response) => {
        this.assessmentService.updateDocumentBody(response);
      }),
    ).subscribe();
  }
}
