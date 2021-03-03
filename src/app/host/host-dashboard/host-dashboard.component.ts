import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { GamePlayDataService } from 'src/app/services/game-play-data/game-play-data.service';
import { HostNameService } from 'src/app/services/host-name/host-name.service';
import { Host } from 'src/app/classes/host/host';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { RequetsService } from 'src/app/services/http-requests/requets.service';
import { EditQuestionsComponent } from '../edit-questions/edit-questions.component';
import { EditQuestionService } from 'src/app/services/edit-question/edit-question.service';

@Component({
  selector: 'app-host-dashboard',
  templateUrl:'./host-dashboard.component.html',
  styleUrls: ['./host-dashboard.component.css'],
})
export class HostDashboardComponent implements OnInit {
  

  constructor(private router: Router, public dialog: MatDialog,
              private websocketService: WebsocketService, private gamePlayDataSerivce: GamePlayDataService,
              private hostNameService: HostNameService, private authService: AuthService,
              private requestService: RequetsService, private editQuestionService: EditQuestionService
    ) {    }

  panelOpenState = true;
  viewQuestion = false;
  viewQuestions: any[] = [];

  spinnerDisplay = false;

  currentQuiz: any[] = [];

  host: Host = new Host();

  currentQuestion: any[] = [];

  quiz_number = 0;

  // Host data from Database
  host_data: any[] = [];

  // side menu trigger
  slideCheck = false;

    // Hiding and showing question contents
    questioncontentshow = false;
    questioncontenthide = false;
    quiz_cards = false;

  ngOnInit(): void {
    this.authService.isNotLogin();
    this.host.host_name = this.hostNameService.getHostName();
  }

  slideTrigger(){
    if (this.slideCheck == false) {
        this.slideCheck = true;
      } else {
        this.slideCheck = false;
      }
    }

  signOut(): void {
    this.authService.logout();
    }


  questionContentShow(){
    this.questioncontentshow = true;
    this.questioncontenthide = false;
    this.quiz_cards = false;
    this.viewQuestion = false;
    this.spinnerDisplay = false;
    }


  questionContentHide(){
      this.questioncontentshow = false;
      this.questioncontenthide = false;
      this.quiz_cards = false;
      this.viewQuestion = false;
  }

  // Showing Quiz Cards
  public showQuizCards(){
    this.quiz_cards = true;
    this.questioncontentshow = false;
    this.questioncontenthide = true;
    this.viewQuestion = false;
    this.hostDataFromDatabase();
    this.spinnerDisplay = true;
  }

  // Begin the quiz
  startQuiz(index: number){
    this.currentQuiz.length = 0;
    this.gamePlayDataSerivce.setGamePlayData(this.host_data[index]);

    this.currentQuiz.push(this.host_data[index]);
    this.currentQuiz.forEach((host: any) => {
      host.quiz.forEach((quiz: any) => {
        this.websocketService.joinGameRoom(quiz.game_pin);
      });
    });
    this.router.navigate(['/game']);
  }

  // View Quiz Questions
  viewQuizQuestions(index: number){
    this.viewQuestions.length = 0;
    this.currentQuiz.length = 0;
    this.currentQuiz.push(this.host_data[index]);
    this.currentQuiz.forEach((host: any) => {
        host.quiz.forEach((quiz: any) => {
         quiz.questions.forEach((question: any) => {
            this.viewQuestions.push(question);
           });
       });
      });
    this.quiz_cards = false;
    this.questioncontentshow = false;
    this.questioncontenthide = false;
    this.viewQuestion = true;
    }

    // Getting host data from database
    hostDataFromDatabase(){
      this.host_data.length = 0;
      this.requestService.getRequest('/gethost').subscribe((data: any) => {
        data.forEach((element: any) => {
          if (element.quiz.length !== 0 && this.host.host_name !== '' && element.host_name == this.host.host_name){

            this.host_data.push(element);
            this.quiz_number = this.host_data.length;
          }
          if (this.host_data.length > 0){
            this.spinnerDisplay = false;
            this.quiz_cards = true;
            this.questioncontenthide = true;
          }
          else {
            this.spinnerDisplay = false;
            this.quiz_cards = false;
            this.questioncontenthide = false;
          }
        });
        });
    }

    // Delete Quiz
    deleteQuiz(index: number) {
      this.currentQuiz.length = 0;
      this.currentQuiz.push(this.host_data[index]);
      this.currentQuiz.forEach((host: any) => {
        this.host_data.length = 0;
        host.quiz.forEach((quiz: any) => {
          this.requestService.deleteRequest('quiz', quiz.quiz_id).subscribe(response =>{
            console.log(response)
            this.showQuizCards();
          });
          
        });
      });

    }

   // Delete Question
   deleteQuestion(index: number) {
     console.log("index",index)
     this.currentQuestion.push(this.host_data[index]);
      let questionId = this.currentQuestion[0]["quiz"][0]["questions"][index]["question_id"];
         this.requestService.deleteRequest('question', questionId).subscribe(response => {
           console.log(response)
          this.showQuizCards();
         }, error => {
            console.log(error)
         });
   }
  //Edit Questions
  editQuestion(index: number){
    this.dialog.open(EditQuestionsComponent, {
      width: '100%'
    });
  }
  //Editng Questions Dailog
  editQuestionDialog(index: any){
    this.currentQuiz.push(this.host_data[index]);
    this.currentQuiz.forEach((host: any) => {
      host.quiz.forEach((quiz: any) => {
       quiz.questions.forEach((question: any) => {
         this.editQuestionService.setQuestion(question);
          // this.editQuestion.push(qstn_body);

         //this.editQuestion.push(question);
         });
     });
    });
  // editQuestionDialog(index: any){
  //   this.currentQuiz.forEach((host: any) => {
  //     host.quiz.forEach((quiz: any) => {
  //       this.editQuestionService.setQuestion(quiz.questions[index]);
  //    });
  //   });

    const dialogRef = this.dialog.open(EditQuestionsComponent, {
      width: '80%',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
