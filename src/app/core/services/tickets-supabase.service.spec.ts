import { TicketsSupabaseService } from './tickets-supabase.service';
import { supabase } from './supabase.service';
import { Tickets } from '../intefaces/tickets.interface';

jest.mock('./supabase.service', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(),
      eq: jest.fn(),
      single: jest.fn()
    })),
  },
}));

describe('TicketsSupabaseService', () => {
  let service: TicketsSupabaseService;

  beforeEach(() => {
    service = new TicketsSupabaseService();
    jest.clearAllMocks();
  });

  it('should return all tickets', (done) => {
    const ticketsMock: Tickets[] = [
      { id: '1', offer_id: 'a', date: '2025-06-18' },
      { id: '2', offer_id: 'b', date: '2025-06-19' }
    ];

    // Mocking Supabase call chain
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: ticketsMock, error: null })
    });

    service.getTickets().subscribe({
      next: (result) => {
        expect(result).toEqual(ticketsMock);
        done();
      },
      error: () => {
        fail('Should not fail');
      }
    });
  });

  it('should throw an error if getTickets fails', (done) => {
    const mockError = new Error('Get tickets failed');

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: null, error: mockError })
    });

    service.getTickets().subscribe({
      next: () => fail('Expected error'),
      error: (err) => {
        expect(err).toBe(mockError);
        done();
      }
    });
  });

  it('should return ticket by id', (done) => {
    const ticketMock: Tickets = {
      id: '1',
      offer_id: 'a',
      date: '2025-06-18'
    };

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: ticketMock, error: null })
    });

    service.getTicketsById('1').subscribe({
      next: (result) => {
        expect(result).toEqual(ticketMock);
        done();
      },
      error: () => fail('Should not fail'),
    });
  });

  it('should throw an error if getTicketsById fails', (done) => {
    const mockError = new Error('Not found');

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: mockError })
    });

    service.getTicketsById('1').subscribe({
      next: () => fail('Should fail'),
      error: (err) => {
        expect(err).toBe(mockError);
        done();
      }
    });
  });

});
