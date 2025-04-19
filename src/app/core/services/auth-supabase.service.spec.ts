import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import {AuthSupabaseService} from './auth-supabase.service';
import {AuthUser} from '@supabase/supabase-js';

describe('AuthSupabaseService', () => {
  let service: AuthSupabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthSupabaseService]
    });
    service = TestBed.inject(AuthSupabaseService);
  });

  it('should log in with correct credentials', async () => {
    const email = 'admin@admin.com';
    const password = 'admin';

    const user = await firstValueFrom(service.login(email, password));

    expect(user).toBeTruthy();
    expect(user.uid).toBeDefined();
    expect(user.userName).toBe(email);
  });
});
