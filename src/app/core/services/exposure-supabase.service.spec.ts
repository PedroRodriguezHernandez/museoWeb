import { ExposureSupabaseService } from './exposure-supabase.service';
import { supabase } from './supabase.service';

jest.mock('./supabase.service', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(),
      eq: jest.fn(),
      in: jest.fn(),
      single: jest.fn(),
      insert: jest.fn(),
      delete: jest.fn(),
    })),
  },
}));

describe('ExposureSupabaseService', () => {
  let service: ExposureSupabaseService;

  beforeEach(() => {
    service = new ExposureSupabaseService();
    jest.clearAllMocks();
  });

  // getExposures
  it('should return all exposures', (done) => {
    const mockExposures = [{ name: 'Light' }, { name: 'Shadow' }];

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: mockExposures, error: null }),
    });

    service.getExposures().subscribe((result) => {
      expect(result).toEqual(mockExposures);
      done();
    });
  });

  // getExposureByName
  it('should return exposure by name', (done) => {
    const mockExposure = { name: 'Light' };

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockExposure, error: null }),
    });

    service.getExposureByName('Light').subscribe((result) => {
      expect(result).toEqual(mockExposure);
      done();
    });
  });

  // getExposuresByNames
  it('should return exposures by names', (done) => {
    const mockExposures = [{ name: 'Light' }, { name: 'Dark' }];

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      in: jest.fn().mockResolvedValue({ data: mockExposures, error: null }),
    });

    service.getExposuresByNames(['Light', 'Dark']).subscribe((result) => {
      expect(result).toEqual(mockExposures);
      done();
    });
  });

  // createExposures
  it('should create a new exposure', (done) => {
    const mockExposure = { name: 'Glow' };

    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockResolvedValue({ data: [mockExposure], error: null }),
    });

    service.createExposures('Glow').subscribe((result) => {
      expect(result).toEqual(mockExposure);
      done();
    });
  });

  // deleteExposureByName
  it('should delete exposure by name', (done) => {
    (supabase.from as jest.Mock).mockReturnValue({
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({ data: null, error: null }),
    });

    service.deleteExposureByName('Light').subscribe(() => {
      expect(supabase.from).toHaveBeenCalledWith('exposure');
      done();
    });
  });

  // Error handling: getExposures
  it('should throw error if getExposures fails', (done) => {
    const mockError = new Error('Supabase failure');

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: null, error: mockError }),
    });

    service.getExposures().subscribe({
      error: (err) => {
        expect(err).toBe(mockError);
        done();
      },
    });
  });
});
