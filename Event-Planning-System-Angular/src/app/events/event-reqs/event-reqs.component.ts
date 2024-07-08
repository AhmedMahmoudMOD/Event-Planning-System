import { Component, Input, OnInit, input } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Req } from './req.model';
import { SelectItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { RequestService } from '../../shared/services/request.service';
import { ReqStatus } from './req.status.enum';


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
  defaultImage = "assets/images/default_Image.jpg";
  @Input() eventId!: number;

  constructor(private requestService : RequestService) { }
  
  ngOnInit() {
    this.populatePendingReqs();
    this.filters = [
      { label: 'Pending', value: 0 },
      { label: 'Accepted', value: 1},
      { label: 'Rejected', value: 2 }
    ];

    this.selectedFilter = this.filters[0];
  }

  getStatusString(status: ReqStatus): string {
    return ReqStatus[status];
  }

  getSeverity(req: Req) {
    switch (req.requestStatus) {
        case ReqStatus.Accepted:
            return 'success';

        case ReqStatus.Pending:
            return 'warning';

        case ReqStatus.Rejected:
            return 'danger';

        default:
            return null;
    }
  }

  populatePendingReqs() {
    this.requestService.getPendingReqs(this.eventId).subscribe(reqs => {
      this.reqs = reqs;
      console.log(reqs);
    });
  }

  populateAcceptedReqs() {
    this.requestService.getAcceptedReqs(this.eventId).subscribe(reqs => {
      this.reqs = reqs;
    });
  }

  populateRejectedReqs() {
    this.requestService.getRejectedReqs(this.eventId).subscribe(reqs => {
      this.reqs = reqs;
    });
  }

  changeFilter($event: DropdownChangeEvent) {
    switch ($event.value) {
      case ReqStatus.Accepted:
          this.populateAcceptedReqs();
          break;

      case ReqStatus.Pending:
          this.populatePendingReqs();
          break;

      case ReqStatus.Rejected:
          this.populateRejectedReqs();
          break;

      default:
         break;
      }
    }

    AcceptReq(userId:number) {
      this.requestService.acceptReq(userId.toString(),this.eventId.toString()).subscribe(() => {
        this.populatePendingReqs();
      }, error => console.error(error));
    }

      RejectReq(userId:number) {
        this.requestService.rejectReq(userId.toString(),this.eventId.toString()).subscribe(() => {
          this.populatePendingReqs();
        });

    }
}
