import { AddAccountRepository } from '../../../../data/protocols/add-account-repository';
import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/usecases/add-account';
import { MongoHelper } from '../helpers/mongo-helper';

export default class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);
    const [account] = result.ops;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _id, ...accountWithoutId } = account;
    return { id: _id, ...accountWithoutId };
  }
}
