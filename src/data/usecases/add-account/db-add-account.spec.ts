import DbAddAccount from './db-add-account';

describe('DbAddAccount Usecase', async () => {
  test('Should call Encrypter with correct password', () => {
    class EncrypterStub {
      async encrypt(value: string): Promise<string> {
        return !!value && new Promise((resolve) => resolve('hashed_value'));
      }
    }
    const encrypterStub = new EncrypterStub();
    const sut = new DbAddAccount(encrypterStub);
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password',
    };
    sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });
});
