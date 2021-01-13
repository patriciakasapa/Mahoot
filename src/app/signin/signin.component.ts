import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { Router } from "@angular/router";
import { HostNameService } from "src/app/services/host-name/host-name.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public user: SocialUser = new SocialUser;
  domainAddress: any = "@turntabl.io";

  constructor(private authService: SocialAuthService,
    private router:Router,
    private hostNameService: HostNameService) { }

  ngOnInit(): void {
    
  }


  //form slide trigger
  slideCheck: boolean = false;

  slideTrigger(){
    if (this.slideCheck == false) {
      this.slideCheck = true;
    } else {
      this.slideCheck = false;
    }
  }
  //OAuth
  hostSignInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData;
      this.hostNameService.setHostName(this.user.name);
      if (this.user.email.includes(this.domainAddress)) {
        this.router.navigate(['/host-dashboard'])
      } else {
        alert("Invalid Account")
      }
      }, error => {
        console.log(error)
    });
  }

  playerSignInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData;
      if (this.user.email.includes(this.domainAddress)) {
        this.router.navigate(['/gamer-name'])
      } else {
        alert("Invalid Account")
      }
      }, error => {
        console.log(error)
    });
    
  }

  //445477872194-pnae5bs7bsm8pubromf5rtpjvur97ao3.apps.googleusercontent.com

}
