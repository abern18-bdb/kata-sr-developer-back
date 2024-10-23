import request from 'supertest';
import app, { startDatabase } from '../../src/app';
import CONFIG from '../../src/config';
import { initDatabase } from '../../src/database';


jest.mock('../../src/database');
jest.spyOn(console, 'log').mockImplementation(jest.fn());
jest.spyOn(console, 'error').mockImplementation(jest.fn());

describe('startDatabase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize the database and log a message', async () => {
    (initDatabase as jest.Mock).mockResolvedValueOnce(undefined);

    await startDatabase();

    expect(initDatabase).toHaveBeenCalled();
  });

  it('should handle errors and exit the process', async () => {
    const errorMessage = 'Unable to initialize database';
    (initDatabase as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const exitMock = jest.spyOn(process, 'exit').mockImplementation();

    await startDatabase();

    expect(exitMock).toHaveBeenCalledWith(1);

    exitMock.mockRestore();
  });
});