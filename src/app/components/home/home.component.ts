import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { SideNavComponent } from "../side-nav/side-nav.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [NavbarComponent, SideNavComponent, CommonModule, RouterModule]
})
export class HomeComponent {
  sideNavStatus: boolean = false;
}
