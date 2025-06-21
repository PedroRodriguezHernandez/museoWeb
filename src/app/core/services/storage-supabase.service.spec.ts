import { StorageSupabaseService } from './storage-supabase.service';
import { supabase } from './supabase.service';

jest.mock('./supabase.service', () => ({
  supabase: {
    storage: {
      from: jest.fn(() => ({
        upload: jest.fn(),
        getPublicUrl: jest.fn(),
        remove: jest.fn(),
      })),
    },
  },
}));

describe('StorageSupabaseService', () => {
  let service: StorageSupabaseService;

  beforeEach(() => {
    service = new StorageSupabaseService();
    jest.clearAllMocks();
  });

  it('should upload a file and return its public URL', (done) => {
    const fakeFile = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const bucket = 'test-bucket';
    const path = '1234_test.png';
    const publicUrl = `https://supabase.io/storage/${path}`;

    // Mock getPublicUrl
    (supabase.storage.from as jest.Mock).mockReturnValueOnce({
      upload: jest.fn().mockResolvedValue({ error: null }),
    });

    (supabase.storage.from as jest.Mock).mockReturnValueOnce({
      getPublicUrl: jest.fn().mockReturnValue({
        data: { publicUrl }
      }),
    });

    service.uploadFile(bucket, fakeFile).subscribe({
      next: (url) => {
        expect(url).toBe(publicUrl);
        done();
      },
      error: () => {
        fail('Should not reach error block');
      }
    });
  });

  it('should return an error when upload fails', (done) => {
    const fakeFile = new File(['dummy'], 'fail.png', { type: 'image/png' });
    const bucket = 'fail-bucket';

    const mockError = new Error('Upload failed');

    (supabase.storage.from as jest.Mock).mockReturnValue({
      upload: jest.fn().mockResolvedValue({ error: mockError }),
    });

    service.uploadFile(bucket, fakeFile).subscribe({
      next: () => fail('Should not upload successfully'),
      error: (err) => {
        expect(err).toBe(mockError);
        done();
      }
    });
  });

  it('should return public URL for a file', (done) => {
    const bucket = 'test-bucket';
    const path = 'file.png';
    const publicUrl = `https://supabase.io/storage/${path}`;

    (supabase.storage.from as jest.Mock).mockReturnValue({
      getPublicUrl: jest.fn().mockReturnValue({
        data: { publicUrl }
      })
    });

    service.getFile(bucket, path).subscribe(url => {
      expect(url).toBe(publicUrl);
      done();
    });
  });

  it('should delete a file successfully', (done) => {
    const bucket = 'test-bucket';
    const path = 'to-delete.png';

    (supabase.storage.from as jest.Mock).mockReturnValue({
      remove: jest.fn().mockResolvedValue({ error: null }),
    });

    service.deleteFile(bucket, path).subscribe({
      next: (res) => {
        expect(res).toBeUndefined();
        done();
      },
      error: () => {
        fail('Should not throw error');
      }
    });
  });

  it('should throw error if deleteFile fails', (done) => {
    const bucket = 'test-bucket';
    const path = 'fail-delete.png';
    const mockError = new Error('Delete failed');

    (supabase.storage.from as jest.Mock).mockReturnValue({
      remove: jest.fn().mockResolvedValue({ error: mockError }),
    });

    service.deleteFile(bucket, path).subscribe({
      next: () => fail('Should not delete successfully'),
      error: (err) => {
        expect(err).toBe(mockError);
        done();
      }
    });
  });

  it('should handle exception if remove throws', (done) => {
    const bucket = 'test-bucket';
    const path = 'throw.png';
    const exception = new Error('Unexpected error');

    (supabase.storage.from as jest.Mock).mockReturnValue({
      remove: jest.fn().mockRejectedValue(exception),
    });

    service.deleteFile(bucket, path).subscribe({
      next: () => fail('Should not pass'),
      error: (err) => {
        expect(err).toBe(exception);
        done();
      }
    });
  });
});
