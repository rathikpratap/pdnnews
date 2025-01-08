import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  selector: 'app-anchor-home',
  standalone: true,
  imports: [NavbarComponent, SideNavComponent, CommonModule, RouterModule],
  templateUrl: './anchor-home.component.html',
  styleUrl: './anchor-home.component.css'
})
export class AnchorHomeComponent {
  sideNavStatus: boolean = false;

}
