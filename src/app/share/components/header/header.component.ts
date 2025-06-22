import {Component, Inject, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgIf} from '@angular/common';
import {AuthSupabaseService} from '../../../core/services/auth-supabase.service';
import {AuthInterface} from '../../../core/intefaces/auth.interface';
import {ChangePasswordComponent} from '../../modals/change-password/change-password.component';
import {UserSupabaseService} from '../../../core/services/user-supabase.service';
import {UserInterface} from '../../../core/intefaces/user.interface';

@Component({
  selector: 'app-header',
  imports: [
    RouterLinkActive,
    RouterLink,
    NgIf,
    ChangePasswordComponent
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    @Inject(AuthSupabaseService) private authInterface: AuthInterface,
    @Inject(UserSupabaseService) private userInterface: UserInterface
  ) {}

  userRole: string | null = null;
  loading = true;


  isSidebarOpen: boolean = false;
  changePassword: boolean = false;


  ngOnInit(): void {
    this.authInterface.getCurrentUser().subscribe(authUser => {
      if (authUser) {
        this.userInterface.getUserByID(authUser.uid).subscribe(user => {
          this.userRole = user?.rol ?? null;
          this.loading = false
        });
      }else{
        this.loading = false
      }
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logOut() {
    console.log("logOut");
    this.router.navigate(['/']);
    this.authInterface.logout();
  }

  openPopUp() {
    this.changePassword = true;
    this.isSidebarOpen = false;
  }

  closePopUp() {
    this.changePassword =  false
  }

  isAdmin() {
    return this.userRole === 'admin';

  }

}
