import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

// Data Transfer Object
interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface CreateBalance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance[];

  constructor() {
    this.transactions = [];
    this.balance = [];
  }

  // listando todas transações
  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((acc, item) => acc + item.value, 0);

    const totalOutcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((acc, item) => acc + item.value, 0);

    const saldo = totalIncome - totalOutcome;

    // criando balance
    const balance = new Balance(totalIncome, totalOutcome, saldo);

    // adicionando balance na listagem
    this.balance.push(balance);

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    // criando transactions
    const transaction = new Transaction({ title, value, type });

    // adicionando transaction na listagem
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
