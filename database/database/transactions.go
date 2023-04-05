package database

import (
	"context"
	"time"

	"github.com/jackc/pgx/v5"
)

type TransactionType string

const (
	Income   TransactionType = "INCOME"
	Outgoing TransactionType = "OUTGOING"
)

type Transaction struct {
	ID          string          `json:"id" db:"id"`
	Date        time.Time       `json:"date" db:"date"`
	Type        TransactionType `json:"type" db:"type"`
	Value       float32         `json:"value" db:"value"`
	Description string          `json:"description" db:"description"`
	AccountID   string          `json:"account_id" db:"account_id"`
}

// func (db *DB) GetTransactions() ([]Transaction, error) {
// 	rows, err := db.conn.Query(context.Background(), "SELECT * FROM accounts")
// 	if err != nil {
// 		return nil, err
// 	}
// 	defer rows.Close()

// 	accounts, err := pgx.CollectRows(rows, pgx.RowToStructByName[Account])
// 	if err != nil {
// 		return nil, err
// 	}

// 	return accounts, nil
// }

func (db *DB) PostTransaction(transaction Transaction) error {
	rows, err := db.conn.Query(context.Background(), "INSERT INTO TRANSACTIONS(date, value, description, type, account_id) VALUES($1, $2, $3, $4, $5)", transaction.Date, transaction.Value, transaction.Description, transaction.Type, transaction.AccountID)
	if err != nil {
		return err
	}
	defer rows.Close()

	return nil
}

func (db *DB) GetTransactions() ([]Transaction, error) {
	rows, err := db.conn.Query(context.Background(), "SELECT * FROM transactions ORDER by date")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	transactions, err := pgx.CollectRows(rows, pgx.RowToStructByName[Transaction])
	if err != nil {
		return nil, err
	}

	return transactions, nil
}
