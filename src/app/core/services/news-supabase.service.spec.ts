import { TestBed } from '@angular/core/testing';

import { NewsSupabaseService } from './news-supabase.service';

describe('NewsSupabaseService', () => {
  let service: NewsSupabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsSupabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
