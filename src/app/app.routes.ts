import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewEmployeeComponent } from './components/new-employee/new-employee.component';
import { AllEmployeesComponent } from './components/all-employees/all-employees.component';
import { WriterHomeComponent } from './components/writer-home/writer-home.component';
import { WriterDashboardComponent } from './components/writer-dashboard/writer-dashboard.component';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { WriterProjectsComponent } from './components/writer-projects/writer-projects.component';
import { WriterUpdateComponent } from './components/writer-update/writer-update.component';
import { AnchorHomeComponent } from './components/anchor-home/anchor-home.component';
import { AnchorDashboardComponent } from './components/anchor-dashboard/anchor-dashboard.component';
import { AnchorProjectsComponent } from './components/anchor-projects/anchor-projects.component';
import { AnchorUpdateComponent } from './components/anchor-update/anchor-update.component';
import { EditorHomeComponent } from './components/editor-home/editor-home.component';
import { EditorDashboardComponent } from './components/editor-dashboard/editor-dashboard.component';
import { EditorProjectsComponent } from './components/editor-projects/editor-projects.component';
import { AllProjectsComponent } from './components/all-projects/all-projects.component';
import { UpdateProjectsComponent } from './components/update-projects/update-projects.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'navbar',
        component: NavbarComponent
    },
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'admin-dashboard',
                component: AdminDashboardComponent
            },
            {
                path: 'new-employee',
                component: NewEmployeeComponent
            },
            {
                path: 'all-employees',
                component: AllEmployeesComponent
            },
            {
                path: 'update-employee/:id',
                component: UpdateEmployeeComponent
            },
            {
                path: 'all-projects',
                component: AllProjectsComponent
            },
            {
                path: 'update-projects/:id',
                component: UpdateProjectsComponent
            }
        ]
    },
    {
        path: 'writer-home',
        component: WriterHomeComponent,
        children: [
            {
                path: 'writer-dashboard',
                component: WriterDashboardComponent
            },
            {
                path: 'new-task',
                component: NewTaskComponent
            },
            {
                path: 'writer-projects',
                component: WriterProjectsComponent
            },
            {
                path: 'writer-update/:id',
                component: WriterUpdateComponent
            }
        ]
    },
    {
        path: 'anchor-home',
        component: AnchorHomeComponent,
        children: [
            {
                path: 'anchor-dashboard',
                component: AnchorDashboardComponent
            },
            {
                path: 'anchor-projects',
                component: AnchorProjectsComponent
            },
            {
                path: 'anchor-update/:id',
                component: AnchorUpdateComponent
            }
        ]
    },
    {
        path: 'editor-home',
        component: EditorHomeComponent,
        children: [
            {
                path: 'editor-dashboard',
                component: EditorDashboardComponent
            },
            {
                path: 'editor-projects',
                component: EditorProjectsComponent
            }
        ]
    }
];
