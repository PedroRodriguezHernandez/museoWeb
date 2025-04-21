import {Component, Inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgIf} from '@angular/common';
import {AuthSupabaseService} from '../../../core/services/auth-supabase.service';
import {AuthInterface} from '../../../core/intefaces/auth-interface';

@Component({
  selector: 'app-header',
  imports: [
    RouterLinkActive,
    RouterLink,
    NgIf
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    private router: Router,
    @Inject(AuthSupabaseService) private authInterface: AuthInterface
  ) {}
  isSidebarOpen: boolean = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logOut() {
    this.authInterface.logout();
  }
}
