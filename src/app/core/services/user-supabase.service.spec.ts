import { UserSupabaseService } from './user-supabase.service';
import { supabase } from './supabase.service';
import { User } from '../intefaces/user-interface';

jest.mock('./supabase.service', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      eq: jest.fn(),
      single: jest.fn()
    })),
  },
}));

describe('UserSupabaseService', () => {
  let service: UserSupabaseService;

  beforeEach(() => {
    service = new UserSupabaseService();
    jest.clearAllMocks();
  });

  it('should return all users', (done) => {
    const usersMock: User[] = [
      { id: '1', rol: 'admin', start_date: '2025-01-01', end_date: '2025-12-31', enable: true },
      { id: '2', rol: 'editor', start_date: '2025-02-01', end_date: '2025-12-31', enable: false }
    ];

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: usersMock, error: null })
    });

    service.getUsers().subscribe({
      next: (users) => {
        expect(users).toEqual(usersMock);
        done();
      },
      error: () => fail('Should not fail')
    });
  });

  it('should throw error if getUsers fails', (done) => {
    const mockError = new Error('Error fetching users');

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: null, error: mockError })
    });

    service.getUsers().subscribe({
      next: () => fail('Should throw'),
      error: (err) => {
        expect(err).toBe(mockError);
        done();
      }
    });
  });

  it('should remove a user by ID', (done) => {
    const deleteFn = jest.fn().mockResolvedValue({ data: null, error: null });

    (supabase.from as jest.Mock).mockReturnValue({
      delete: jest.fn().mockReturnThis(),
      eq: deleteFn
    });

    service.removeUser('1').subscribe({
      next: () => {
        expect(deleteFn).toHaveBeenCalledWith('id', '1');
        done();
      },
      error: () => fail('Should not fail')
    });
  });

  it('should throw error if removeUser fails', (done) => {
    const mockError = new Error('Delete error');
    (supabase.from as jest.Mock).mockReturnValue({
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({ error: mockError })
    });

    service.removeUser('1').subscribe({
      next: () => fail('Should fail'),
      error: (err) => {
        expect(err).toBe(mockError);
        done();
      }
    });
  });

  it('should update a user', (done) => {
    const userMock: User = {
      id: '1',
      rol: 'admin',
      start_date: '2025-01-01',
      end_date: '2025-12-31',
      enable: true
    };

    (supabase.from as jest.Mock).mockReturnValue({
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      select: jest.fn().mockResolvedValue({ data: [userMock], error: null })
    });

    service.updateUser(userMock).subscribe({
      next: (result) => {
        expect(result).toEqual(userMock);
        done();
      },
      error: () => fail('Should not fail')
    });
  });

  it('should throw error if updateUser fails', (done) => {
    const mockError = new Error('Update error');

    (supabase.from as jest.Mock).mockReturnValue({
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      select: jest.fn().mockResolvedValue({ data: null, error: mockError })
    });

    const userMock: User = {
      id: '1',
      rol: 'admin',
      start_date: '2025-01-01',
      end_date: '2025-12-31',
      enable: true
    };

    service.updateUser(userMock).subscribe({
      next: () => fail('Should throw'),
      error: (err) => {
        expect(err).toBe(mockError);
        done();
      }
    });
  });

  it('should get user by ID', (done) => {
    const userMock: User = {
      id: '1',
      rol: 'admin',
      start_date: '2025-01-01',
      end_date: '2025-12-31',
      enable: true
    };

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: userMock, error: null })
    });

    service.getUserByID('1').subscribe({
      next: (user) => {
        expect(user).toEqual(userMock);
        done();
      },
      error: () => fail('Should not fail')
    });
  });

  it('should throw error if getUserByID fails', (done) => {
    const mockError = new Error('User not found');

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: mockError })
    });

    service.getUserByID('1').subscribe({
      next: () => fail('Should throw'),
      error: (err) => {
        expect(err).toBe(mockError);
        done();
      }
    });
  });

});
