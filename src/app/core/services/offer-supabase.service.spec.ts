import { OfferSupabaseService } from './offer-supabase.service';
import { supabase } from './supabase.service';
import { Offer } from '../intefaces/offer.interface';

jest.mock('./supabase.service', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(),
      insert: jest.fn(),
      delete: jest.fn(),
      eq: jest.fn(),
    })),
  },
}));

describe('OfferSupabaseService', () => {
  let service: OfferSupabaseService;

  beforeEach(() => {
    service = new OfferSupabaseService();
    jest.clearAllMocks();
  });

  it('should return an offer by ID', (done) => {
    const mockOffer: Offer = {
      id: '1',
      name: 'Standard Ticket',
      price: 10,
      age: 'adult',
      start_date: '2025-01-01',
      end_date: '2025-12-31'
    };

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({ data: mockOffer, error: null }),
        }),
      }),
    });

    service.getOfferById('1').subscribe(result => {
      expect(result).toEqual(mockOffer);
      done();
    });
  });

  it('should throw error if getOfferById fails', (done) => {
    const mockError = new Error('Offer not found');

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({ data: null, error: mockError }),
        }),
      }),
    });

    service.getOfferById('1').subscribe({
      error: (err) => {
        expect(err).toBe(mockError);
        done();
      }
    });
  });

  it('should create a new offer', (done) => {
    const offerToCreate: Offer = {
      id: '1',
      name: 'Promo Offer',
      price: 15,
      age: 'child',
      start_date: '2025-06-01',
      end_date: '2025-06-30'
    };

    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue({ data: [offerToCreate], error: null }),
      }),
    });

    service.createOffer(offerToCreate).subscribe(result => {
      expect(result).toEqual(offerToCreate);
      done();
    });
  });

  it('should throw error if createOffer fails', (done) => {
    const mockError = new Error('Insert failed');

    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue({ data: null, error: mockError }),
      }),
    });

    const offerToCreate: Offer = {
      id: '1',
      name: 'Promo Offer',
      price: 15,
      age: 'child',
      start_date: '2025-06-01',
      end_date: '2025-06-30'
    };

    service.createOffer(offerToCreate).subscribe({
      error: (err) => {
        expect(err).toBe(mockError);
        done();
      }
    });
  });

  it('should delete an offer', (done) => {
    (supabase.from as jest.Mock).mockReturnValue({
      delete: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({ data: null, error: null }),
      }),
    });

    service.deleteOffer('1').subscribe(result => {
      expect(result).toBeUndefined();
      done();
    });
  });

  it('should throw error if deleteOffer fails', (done) => {
    const mockError = new Error('Delete failed');

    (supabase.from as jest.Mock).mockReturnValue({
      delete: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({ data: null, error: mockError }),
      }),
    });

    service.deleteOffer('1').subscribe({
      error: (err) => {
        expect(err).toBe(mockError);
        done();
      }
    });
  });

  it('should return all offers', (done) => {
    const offers: Offer[] = [
      { id: '1', name: 'A', price: 5, age: 'child', start_date: '2025-01-01', end_date: '2025-01-31' },
      { id: '2', name: 'B', price: 8, age: 'adult', start_date: '2025-02-01', end_date: '2025-02-28' }
    ];

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: offers, error: null }),
    });

    service.getOffers().subscribe(result => {
      expect(result).toEqual(offers);
      done();
    });
  });

  it('should throw error if getOffers fails', (done) => {
    const mockError = new Error('Fetch failed');

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: null, error: mockError }),
    });

    service.getOffers().subscribe({
      error: (err) => {
        expect(err).toBe(mockError);
        done();
      }
    });
  });
});
