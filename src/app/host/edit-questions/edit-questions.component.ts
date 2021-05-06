import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig, MatDialog} from '@angular/material/dialog';
import { ModalComponentComponent } from 'src/app/modal-component/modal-component.component';
import { EditQuestionService } from 'src/app/services/edit-question/edit-question.service';


interface Timer {
  value: number;
}

@Component({
  selector: 'app-edit-questions',
  templateUrl:'./edit-questions.component.html',
  styleUrls: ['./edit-questions.component.css']
})

export class EditQuestionsComponent implements OnInit {

  question: any[] = [];
  currentQuestion: any[] = [];
  image: any;
  imageUrl = "https://cdn.blocktoro.com/wp-content/uploads/2020/06/Money-Heist-Season-5-Plot-Spoilers-and-Storyline-.jpg";


  timers: Timer[] = [
    {value: 5},
    {value: 10},
    {value: 15},
    {value: 20},
    {value: 25},
    {value: 30}
  ];
  host_data: any;
  isEditable = true;


  constructor(public dialogRef: MatDialogRef<EditQuestionsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, 
              public matDialog: MatDialog,
              private editQuestionService: EditQuestionService
    ) { 
      
              }

  ngOnInit(): void {
    console.log("current question", this.data)
    console.log("question", this.data["question_body"])
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  save(): void{
    this.editQuestionService.updateQuestion(this.question)
    .subscribe(() => this.dialogRef.close());
  }
  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalComponentComponent, dialogConfig);
  }

  Answer(index: number){
    this.question.forEach((question: any) => {
      question.answer.forEach((answer: any) => {
        answer.is_correct = false;
      });
      if (question.answer[index].is_correct == false) {
        question.answer[index].is_correct = true;
      } else {
        question.answer[index].is_correct = false;
      }
    });
  }



}
