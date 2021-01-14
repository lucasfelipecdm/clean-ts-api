import bcrypt from 'bcrypt';
import { Encrypter } from '../../data/protocols/encrypter';

export default class BcryptAdapter implements Encrypter {
  private readonly salt: number;

  constructor(salt: number) {
    this.salt = salt;
  }

  async encrypt(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt);
    return new Promise((resolve) => resolve(hash));
  }
}
