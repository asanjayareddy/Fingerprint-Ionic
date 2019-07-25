import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 600,
    autoplay: {
      disableOnInteraction: false,
      waitForTransition: true
    },
    preloadImages: true,
    updateOnImagesReady: true
  };

  imageUrls: string[] = [
    'women-technology.jpg',
    'events.jpg',
    'diversity.jpg',
    'fligh-high.jpg'
  ];

  categories: any;
  isUserLoggedIn: boolean;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.checkUserLogin();
  }

  logout() {
    this.authenticationService.logout();
  }

  checkUserLogin() {
    if ( this.authenticationService.currentUserValue !== undefined
         && this.authenticationService.currentUserValue !== null) {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
  }

}
