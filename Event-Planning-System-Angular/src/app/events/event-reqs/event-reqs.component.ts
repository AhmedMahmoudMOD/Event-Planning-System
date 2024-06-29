import { Component, OnInit } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Req } from './req.model';
import { SelectItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-event-reqs',
  standalone: true,
  imports: [DataViewModule, TagModule, ButtonModule, CommonModule, DropdownModule,FormsModule],
  templateUrl: './event-reqs.component.html',
  styleUrl: './event-reqs.component.css'
})
export class EventReqsComponent implements OnInit{

  reqs: Req[] = [];
  filters!: SelectItem[];
  selectedFilter!: SelectItem;
  
  ngOnInit() {
    this.populateReqs();
    this.filters = [
      { label: 'All', value: 'All'},
      { label: 'Accepted', value: 'Accepted' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Rejected', value: 'Rejected' }
    ];

    this.selectedFilter = this.filters[0];
  }

  getSeverity(req: Req) {
    switch (req.status) {
        case 'Accepted':
            return 'success';

        case 'Pending':
            return 'warning';

        case 'Rejected':
            return 'danger';

        default:
            return null;
    }
  }

  populateReqs() {
    this.reqs=[
      {
        fullName: 'John Doe',
        email: 'ahmed@gmail.com',
        image: 'https://storageattendanceiti.blob.core.windows.net/eventplanning/9b098843-7145-492e-9322-e56eae60ccd9.jpg',
        status: 'Pending'
      },
      {
      fullName: 'John Doe',
        email: 'ahmed@gmail.com',
        image: 'https://storageattendanceiti.blob.core.windows.net/eventplanning/9b098843-7145-492e-9322-e56eae60ccd9.jpg',
        status: 'Accepted'
      },
      {
        fullName: 'John Doe',
        email: 'ahmed@gmail.com',
        image: 'https://storageattendanceiti.blob.core.windows.net/eventplanning/9b098843-7145-492e-9322-e56eae60ccd9.jpg',
        status: 'Rejected'
      }

    ];
  }

  changeFilter($event: DropdownChangeEvent) {
    this.populateReqs();
    if ($event.value !== 'All') {
      this.reqs = this.reqs.filter(req => req.status === $event.value);
    }
   
  }
}
