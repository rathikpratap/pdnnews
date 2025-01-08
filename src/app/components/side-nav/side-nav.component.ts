import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit {

  @Input() sideNavStatus: boolean = false;

  private readonly adminRoutes = ['/admin-dashboard', '/new-employee', '/all-employee','/update-employee', '/all-projects', '/update-projects'];
  private readonly writerRoutes = ['/writer-home/writer-dashboard', '/writer-home/new-task', '/writer-home/writer-projects','/writer-home/writer-update'];
  private readonly anchorRoutes = ['/anchor-home/anchor-dashboard','/anchor-home/anchor-projects','/anchor-home/anchor-update'];
  private readonly editorRoutes = ['/editor-home/editor-dashboard','/editor-home/editor-projects'];

  Adminlist = [
    {
      number: '1',
      name: 'Dashboard',
      icon: 'bi bi-house',
      route: '/admin-dashboard'
    },
    {
      number: '2',
      name: 'Add Employee',
      icon: 'bi bi-person-fill-add',
      route: '/new-employee'
    },
    {
      number: '3',
      name: 'Employees',
      icon: 'bi bi-person-badge',
      route: '/all-employees'
    },
    {
      number: '4',
      name: 'All Tasks',
      icon: 'bi bi-card-list',
      route: '/all-projects'
    }

  ];
  writerList = [
    {
      number: '1',
      name: 'Writer Dashboard',
      icon: 'bi bi-house',
      route: '/writer-home/writer-dashboard'
    },
    {
      number: '2',
      name: 'Add New Task',
      icon: 'bi bi-file-plus',
      route: '/writer-home/new-task'
    },
    {
      number: '3',
      name: 'All Projects',
      icon: 'bi bi-card-list',
      route: '/writer-home/writer-projects'
    }
  ];
  anchorList = [
    {
      number: '1',
      name: 'Anchor Dashboard',
      icon: 'bi bi-house',
      route: '/anchor-home/anchor-dashboard'
    },
    {
      number: '2',
      name: 'All Projects',
      icon: 'bi bi-card-list',
      route: '/anchor-home/anchor-projects'
    }
  ];
  editorList = [
    {
      number: '1',
      name: 'Editor Dashboard',
      icon: 'bi bi-house',
      route: '/editor-home/editor-dashboard'
    },
    {
      number: '2',
      name: 'All Projects',
      icon: 'bi bi-card-list',
      route: '/editor-home/editor-projects'
    }
  ]
  list = this.Adminlist;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      if (event instanceof NavigationEnd) {
        this.updateListBasedOnRoute(this.router.url);
      }
    });

    this.updateListBasedOnRoute(this.router.url);
  }

  private updateListBasedOnRoute(currentUrl: string): void {
    if (this.adminRoutes.some(route => currentUrl.startsWith(route))) {
      this.list = this.Adminlist;
    } else if(this.writerRoutes.some(route => currentUrl.startsWith(route))) {
      this.list = this.writerList;
    } else if(this.anchorRoutes.some(route => currentUrl.startsWith(route))) {
      this.list = this.anchorList;
    } else if(this.editorRoutes.some(route => currentUrl.startsWith(route))) {
      this.list = this.editorList;
    }
  }
}
