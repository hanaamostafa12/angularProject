import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../../shared/services/dark-mode.service';

@Component({
  selector: 'app-nav-auth',
  templateUrl: './nav-auth.component.html',
  styleUrls: ['./nav-auth.component.css']
})
export class NavAuthComponent implements OnInit {

  constructor(public darkModeService: DarkModeService) { }

  ngOnInit() {
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
}
