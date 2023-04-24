export type Transaction = {
    transaction_id: string;
    date: Date;
    type: "CREDIT" | "DEBIT";
    value: number;
    description: string;
    account_id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}