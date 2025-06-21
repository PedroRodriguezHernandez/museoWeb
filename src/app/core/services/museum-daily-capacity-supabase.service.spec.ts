import { TestBed } from '@angular/core/testing';

import { MuseumDailyCapacitySupabaseService } from './museum-daily-capacity-supabase.service';

describe('MuseumDailyCapacitySupabaseService', () => {
  let service: MuseumDailyCapacitySupabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MuseumDailyCapacitySupabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
