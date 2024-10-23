import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { initDatabase } from '../../src/database';

jest.mock('sqlite3', () => {
  return {
    Database: jest.fn(),
  };
});

jest.mock('sqlite', () => {
  return {
    open: jest.fn(),
  };
});

describe('Database Initialization', () => {
  const mockDb = {
    exec: jest.fn(),
  };

  beforeEach(() => {
    (open as jest.Mock).mockResolvedValue(mockDb);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize the database and create tasks table', async () => {
    const db = await initDatabase();

    expect(open).toHaveBeenCalledWith({
      filename: './tasks.db',
      driver: sqlite3.Database,
    });

    expect(mockDb.exec).toHaveBeenCalledWith(expect.stringContaining('CREATE TABLE IF NOT EXISTS tasks'));
    expect(db).toBe(mockDb);
  });

  it('should handle errors when opening the database', async () => {
    const errorMessage = 'Unable to open database';
    (open as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(initDatabase()).rejects.toThrow(errorMessage);
  });
});
