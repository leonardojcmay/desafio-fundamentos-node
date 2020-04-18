import { uuid } from 'uuidv4';

class Transaction {
  id: string;

  title: string;

  value: number;

  // income para entradas (depósitos) e outcome para saidas (retiradas)
  type: 'income' | 'outcome';

  constructor({ title, value, type }: Omit<Transaction, 'id'>) {
    this.id = uuid();
    this.title = title;
    this.value = value;
    this.type = type;
  }
}

export default Transaction;
