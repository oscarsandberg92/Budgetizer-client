export type Transaction = {
    id: number;
    amount: number;
    title: string;
    interval: number;
    transactionType: number;
    transactionDate?: Date;
}