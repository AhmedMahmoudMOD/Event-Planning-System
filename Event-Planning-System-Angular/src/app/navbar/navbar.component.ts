import { Component, OnInit, HostListener } from '@angular/core';
import { ProfileService } from '../shared/services/profile.service';
import { AccountService } from '../shared/services/account.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Profile } from '../shared/models/profile';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userId!: number;
  profile: Profile | any = {};
  defaultImage = "assets/images/default_Image.jpg";
  logoImage = "assets/images/logo.png";
  isFixed: boolean = false;

  constructor(private profileService: ProfileService, public accountService: AccountService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.userId = +this.accountService.extractUserID();
    this.profileService.getProfile(this.userId).subscribe({
      next: d => {
        this.profile = d;
      }
    });
  }

  logout(){
    this.accountService.logout();
    this.router.navigate(['/auth/login']);
  }

  // Listen to scroll events
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const scrollOffset = window.pageYOffset;
    // Set navbar fixed when scroll position is greater than 50px
    this.isFixed = scrollOffset > 50;
  }
}
