package models

import (
	"context"
	"server/types"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Transaction struct {
	Base
	ID          string            `json:"transaction_id" db:"transaction_id"`
	Date        time.Time         `json:"date" db:"date"`
	Type        types.Transaction `json:"type" db:"type"`
	Value       float32           `json:"value" db:"value"`
	Description string            `json:"description" db:"description"`
	AccountID   string            `json:"account_id" db:"account_id"`
}

const transactionsByUserQuery = `
	SELECT t.transaction_id, t.date, t.type, t.value, t.description, t.account_id, t.created_at, t.updated_at, t.deleted_at
		FROM transactions t
		JOIN accounts a ON a.account_id = t.account_id
		JOIN users u ON u.user_id = a.user_id
		WHERE u.user_id = $1;	
`

const saveTransactionQuery = `
	INSERT INTO transactions(date, type, value, description, account_id) 
	VALUES($1, $2, $3, $4, $5);
`

func (input *Transaction) Save(db *pgxpool.Pool) error {
	_, err := db.Query(context.Background(), saveTransactionQuery, input.Date, input.Type, input.Value, input.Description, input.AccountID)
	if err != nil {
		return err
	}

	return nil
}

func GetAllTransactionsByUser(user *User, db *pgxpool.Pool) ([]Transaction, error) {
	rows, err := db.Query(context.Background(), transactionsByUserQuery, user.ID)
	if err != nil {
		return []Transaction{}, err
	}

	transactions, err := pgx.CollectRows(rows, pgx.RowToStructByName[Transaction])
	if err != nil {
		return []Transaction{}, err
	}

	return transactions, nil
}
