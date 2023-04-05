package database

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
)

type AccountType string

const (
	Credit AccountType = "CREDIT"
	Debit  AccountType = "DEBIT"
)

type Account struct {
	ID            string      `json:"id" db:"id"`
	Type          AccountType `json:"type" db:"type"`
	Name          string      `json:"name" db:"name"`
	InstitutionID string      `json:"institution_id" db:"institution_id"`
}

func (db *DB) GetAccounts() ([]Account, error) {
	rows, err := db.conn.Query(context.Background(), "SELECT * FROM accounts")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	accounts, err := pgx.CollectRows(rows, pgx.RowToStructByName[Account])
	if err != nil {
		return nil, err
	}

	return accounts, nil
}

func (db *DB) PostAccount(account Account) error {
	fmt.Println(account)
	rows, err := db.conn.Query(context.Background(), "INSERT INTO ACCOUNTS(type, name, institution_id) VALUES($1, $2, $3)", account.Type, account.Name, account.InstitutionID)
	if err != nil {
		return err
	}
	defer rows.Close()

	return nil
}
