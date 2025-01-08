import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  selector: 'app-editor-home',
  standalone: true,
  imports: [NavbarComponent, SideNavComponent, CommonModule, RouterModule],
  templateUrl: './editor-home.component.html',
  styleUrl: './editor-home.component.css'
})
export class EditorHomeComponent {
  sideNavStatus: boolean = false;
}
