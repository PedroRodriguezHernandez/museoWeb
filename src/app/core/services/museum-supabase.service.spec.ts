import { MuseumSupabaseService } from './museum-supabase.service';
import { supabase } from './supabase.service';
import { Museum } from '../intefaces/museum.interface'; // Asegúrate que esta ruta es correcta

jest.mock('./supabase.service', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(),
    })),
  },
}));

describe('MuseumSupabaseService', () => {
  let service: MuseumSupabaseService;

  beforeEach(() => {
    service = new MuseumSupabaseService();
    jest.clearAllMocks();
  });

  it('should return a list of museums', (done) => {
    // Mocked response from Supabase
    const mockMuseums: Museum[] = [
      { id: '1', name: 'Modern Art', location: 'NY', description: 'Contemporary museum' },
      { id: '2', name: 'History Museum', location: 'LA', description: 'Historical exhibits' }
    ];

    // Mock Supabase behavior
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: mockMuseums, error: null }),
    });

    service.getMuseum().subscribe((result) => {
      expect(result).toEqual(mockMuseums);
      done();
    });
  });

  it('should throw error if Supabase fails', (done) => {
    const mockError = new Error('Supabase fetch failed');

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: null, error: mockError }),
    });

    service.getMuseum().subscribe({
      error: (err) => {
        expect(err).toBe(mockError);
        done();
      }
    });
  });
});
