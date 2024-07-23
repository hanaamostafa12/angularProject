import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { DarkModeService } from '../../shared/services/dark-mode.service';


@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent implements OnInit {

  constructor(private _AuthServiceService: AuthServiceService,public darkModeService: DarkModeService) { }

  ngOnInit() {
  }
  logOut(): void {
     this._AuthServiceService.logOut();
  }
  
  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
}
