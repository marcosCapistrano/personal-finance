package database

import (
	"context"
	"time"

	"github.com/jackc/pgx/v5"
)

type Balance struct {
	ID        string    `json:"id" db:"id"`
	Date      time.Time `json:"date" db:"date"`
	Value     float64   `json:"value" db:"value"`
	AccountID string    `json:"account_id" db:"account_id"`
}

func (db *DB) GetBalances() ([]Balance, error) {
	rows, err := db.conn.Query(context.Background(), "SELECT * FROM balances ORDER BY date")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	balances, err := pgx.CollectRows(rows, pgx.RowToStructByName[Balance])
	if err != nil {
		return nil, err
	}

	return balances, nil
}

func (db *DB) PostBalance(balance Balance) error {
	rows, err := db.conn.Query(context.Background(), "INSERT INTO balances(date, value, account_id) VALUES($1, $2, $3)", balance.Date, balance.Value, balance.AccountID)
	if err != nil {
		return err
	}
	defer rows.Close()

	return nil
}
