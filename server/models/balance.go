package models

import (
	"context"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Balance struct {
	Base
	ID        string    `json:"balance_id" db:"balance_id"`
	Date      time.Time `json:"date"`
	Value     float32   `json:"value"`
	AccountID string    `json:"account_id"`
}

type BalanceByAccount struct {
	ID        string    `json:"balance_id" db:"balance_id"`
	Date      time.Time `json:"date" db:"date"`
	Value     float32   `json:"value" db:"value"`
	AccountID string    `json:"account_id" db:"account_id"`
}

const balanceByUserQuery = `
SELECT b.balance_id, b.date, b.value, b.account_id 
	FROM balances b
	JOIN accounts a ON b.account_id = a.account_id
	JOIN users u ON a.user_id = u.user_id
	WHERE u.user_id = $1;
`

func FindBalancesByUser(user *User, db *pgxpool.Pool) ([]BalanceByAccount, error) {
	rows, err := db.Query(context.Background(), balanceByUserQuery, user.ID)
	if err != nil {
		return []BalanceByAccount{}, err
	}

	balances, err := pgx.CollectRows(rows, pgx.RowToStructByName[BalanceByAccount])
	if err != nil {
		return []BalanceByAccount{}, err
	}

	return balances, nil
}
