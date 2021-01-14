import bcrypt from 'bcrypt';
import BcryptAdapter from './bcrypt.adapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve('hashed_value'));
  },
}));

const salt = 12;

const makeSut = (): BcryptAdapter => new BcryptAdapter(salt);

describe('Bcrypt Adapter', () => {
  test('Should call Bcrypt with correct values', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });

  test('Should return a hash on success', async () => {
    const sut = makeSut();
    const hashedValue = await sut.encrypt('any_value');
    expect(hashedValue).toBe('hashed_value');
  });

  test('Should throw if Bcrypt throws', async () => {
    const sut = makeSut();
    jest
      .spyOn(bcrypt, 'hash')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const hashedValue = sut.encrypt('any_value');
    await expect(hashedValue).rejects.toThrow();
  });
});
