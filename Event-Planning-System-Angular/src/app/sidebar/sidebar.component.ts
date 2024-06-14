import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';



@Component({
  selector: 'app-sidebar',
  
  standalone: true,
  imports: [SidebarModule,FormsModule,ButtonModule,AvatarModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {                          
  sidebarVisible :boolean = false;
}
