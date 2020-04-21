import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import AppError from '../errors/AppError';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

// criando uma transaction
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // acessando metodo create do repository
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    const balance = this.transactionsRepository.getBalance();

    console.log(balance.total);

    if (balance.total < 0) {
      throw new AppError('Saldo < Value outcome');
    }

    return transaction;
  }
}

export default CreateTransactionService;
