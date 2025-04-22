import { TestBed } from '@angular/core/testing';

import { ExhibicionSupabaseService } from './exhibicion-supabase.service';

describe('ExhibicionSupabaseService', () => {
  let service: ExhibicionSupabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExhibicionSupabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
