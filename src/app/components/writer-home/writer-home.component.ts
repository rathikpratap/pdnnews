import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { SideNavComponent } from "../side-nav/side-nav.component";

@Component({
  selector: 'app-writer-home',
  standalone: true,
  imports: [NavbarComponent, SideNavComponent, CommonModule, RouterModule],
  templateUrl: './writer-home.component.html',
  styleUrl: './writer-home.component.css'
})
export class WriterHomeComponent {
sideNavStatus: boolean = false;
}
