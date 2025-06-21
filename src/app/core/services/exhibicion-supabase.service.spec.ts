import { ExpositionService } from './exhibicion-supabase.service';
import { of, throwError } from 'rxjs';

jest.mock('./supabase.service', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(),
      eq: jest.fn(),
      single: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      in: jest.fn(),
    })),
  },
}));

import { supabase } from './supabase.service';

describe('ExpositionService', () => {
  let service: ExpositionService;

  beforeEach(() => {
    service = new ExpositionService();
    jest.clearAllMocks();
  });

  it('should fetch all expositions', (done) => {
    const mockData = [{ id: '1', title: 'Expo 1' }];
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: mockData, error: null }),
    });

    service.getExpositions().subscribe((result) => {
      expect(result).toEqual(mockData);
      done();
    });
  });

  // Test fetching exposition by id
  it('should fetch exposition by ID', (done) => {
    const mockExposition = { id: '1', title: 'Expo 1' };

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockExposition, error: null }),
    });

    service.getExpositionById('1').subscribe((result) => {
      expect(result).toEqual(mockExposition);
      done();
    });
  });

  // Test fetching by array of ids
  it('should fetch expositions by multiple IDs', (done) => {
    const mockData = [{ id: '1' }, { id: '2' }];

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      in: jest.fn().mockResolvedValue({ data: mockData, error: null }),
    });

    service.getExpositionsByIds(['1', '2']).subscribe((result) => {
      expect(result).toEqual(mockData);
      done();
    });
  });

  // Test adding exposition
  it('should add a new exposition', (done) => {
    const mockExpo = { title: 'New Expo' };

    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockResolvedValue({ data: [mockExpo], error: null }),
    });

    service.addExposition(mockExpo as any).subscribe((result) => {
      expect(result).toEqual(mockExpo);
      done();
    });
  });

  // Test updating exposition
  it('should update an exposition', (done) => {
    const updatedExpo = { title: 'Updated' };

    (supabase.from as jest.Mock).mockReturnValue({
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      select: jest.fn().mockResolvedValue({ data: [updatedExpo], error: null }),
    });

    service.updateExposition('1', updatedExpo).subscribe((result) => {
      expect(result).toEqual(updatedExpo);
      done();
    });
  });

  // Test deleting exposition
  it('should delete an exposition', (done) => {
    (supabase.from as jest.Mock).mockReturnValue({
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({ data: null, error: null }),
    });

    service.deleteExposition('1').subscribe(() => {
      expect(supabase.from).toHaveBeenCalledWith('exhibition');
      done();
    });
  });

  // Test error on getExpositions
  it('should throw error if getExpositions fails', (done) => {
    const mockError = new Error('DB error');
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: null, error: mockError }),
    });

    service.getExpositions().subscribe({
      error: (err) => {
        expect(err).toBe(mockError);
        done();
      },
    });
  });
});
