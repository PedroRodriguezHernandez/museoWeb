import { AuthSupabaseService } from './auth-supabase.service';
import { of, throwError } from 'rxjs';

jest.mock('./supabase.service', () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      signInWithOtp: jest.fn(),
      signOut: jest.fn(),
      updateUser: jest.fn(),
      getUser: jest.fn(),
    },
  },
}));

import { supabase } from './supabase.service';

describe('AuthSupabaseService', () => {
  let service: AuthSupabaseService;

  beforeEach(() => {
    service = new AuthSupabaseService();
  });

  // Test successful login
  it('should log in successfully', (done) => {
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      data: {
        user: { id: '123', email: 'test@example.com' },
      },
      error: null,
    });

    service.login('test@example.com', 'password123').subscribe((user) => {
      expect(user).toEqual({
        uid: '123',
        userName: 'test@example.com',
      });
      done();
    });
  });

  // Test login failure returns error
  it('should fail login with error', (done) => {
    const mockError = new Error('Invalid credentials');
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      data: {},
      error: mockError,
    });

    service.login('wrong@example.com', 'wrongpass').subscribe({
      error: (err) => {
        expect(err).toBe(mockError);
        done();
      },
    });
  });

  // Test successful password change
  it('should change the password correctly', (done) => {
    (supabase.auth.updateUser as jest.Mock).mockResolvedValue({ error: null });

    service.changePassword('newPassword123').subscribe(() => {
      expect(supabase.auth.updateUser).toHaveBeenCalledWith({ password: 'newPassword123' });
      done();
    });
  });

  // Test get current logged-in user successfully
  it('should get the current user', (done) => {
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: {
        user: {
          id: '456',
          email: 'user@example.com',
        },
      },
    });

    service.getCurrentUser().subscribe((user) => {
      expect(user).toEqual({
        uid: '456',
        userName: 'user@example.com',
      });
      done();
    });
  });

  // Test successful sign up
  it('should register correctly', (done) => {
    (supabase.auth.signUp as jest.Mock).mockResolvedValue({
      data: {},
      error: null,
    });

    service.signUpWithPassword('new@example.com', '123456').subscribe(() => {
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: 'new@example.com',
        password: '123456',
      });
      done();
    });
  });

  // Test successful login with magic link
  it('should log in with magic link', (done) => {
    (supabase.auth.signInWithOtp as jest.Mock).mockResolvedValue({
      error: null,
    });

    service.signInWithMagicLink('magic@example.com', 'name').subscribe(() => {
      expect(supabase.auth.signInWithOtp).toHaveBeenCalledWith({
        email: 'magic@example.com',
        options: {
          emailRedirectTo: 'http://localhost:4200/signup',
          data: { name: 'name' },
        },
      });
      done();
    });
  });

  // Test logout calls supabase signOut
  it('should call logout correctly', () => {
    service.logout();
    expect(supabase.auth.signOut).toHaveBeenCalled();
  });

  // Test password change failure
  it('should throw an error when changing password fails', (done) => {
    const mockError = new Error('Password change failed');
    (supabase.auth.updateUser as jest.Mock).mockResolvedValue({ error: mockError });

    service.changePassword('badpassword').subscribe({
      next: () => {
        fail('Expected error, but got success');
        done();
      },
      error: (err) => {
        expect(err).toBe(mockError);
        done();
      },
    });
  });

  // Test getCurrentUser returns null when no user logged in
  it('should return null when no user is logged in', (done) => {
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: { user: null },
    });

    service.getCurrentUser().subscribe((user) => {
      expect(user).toBeNull();
      done();
    });
  });

  // Test signup failure returns error
  it('should throw an error when signup fails', (done) => {
    const mockError = new Error('Signup failed');
    (supabase.auth.signUp as jest.Mock).mockResolvedValue({
      data: {},
      error: mockError,
    });

    service.signUpWithPassword('fail@example.com', 'badpass').subscribe({
      next: () => {
        fail('Expected error, but got success');
        done();
      },
      error: (err) => {
        expect(err).toBe(mockError);
        done();
      },
    });
  });

  // Test magic link login failure returns error
  it('should throw an error when magic link login fails', (done) => {
    const mockError = new Error('Magic link failed');
    (supabase.auth.signInWithOtp as jest.Mock).mockResolvedValue({
      error: mockError,
    });

    service.signInWithMagicLink('fail@example.com', 'FailName').subscribe({
      next: () => {
        fail('Expected error, but got success');
        done();
      },
      error: (err) => {
        expect(err).toBe(mockError);
        done();
      },
    });
  });
});
