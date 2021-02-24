import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { EditQuestionService } from 'src/app/services/edit-question/edit-question.service';
import { EditQuestionService } from 'src/app/services/edit-question/edit-question.service';




interface Timer {
  value: number;
}

@Component({
  selector: 'app-edit-questions',
  templateUrl: './edit-questions.component.html',
  styleUrls: ['./edit-questions.component.css']
})

export class EditQuestionsComponent implements OnInit {

  question: any;
currentQuestion: any[] = [];

  timers: Timer[] = [
    {value: 5},
    {value: 10},
    {value: 15},
    {value: 20},
    {value: 25},
    {value: 30}
  ];
  host_data: any;

  constructor(public dialogRef: MatDialogRef<EditQuestionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private editQuestionService: EditQuestionService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  save(): void{
    this.editQuestionService.updateQuestion(this.question)
    .subscribe(() => this.dialogRef.close());
  }

}
