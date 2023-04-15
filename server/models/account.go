package models

import (
	"context"
	"server/types"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Account struct {
	Base
	ID            string        `json:"account_id" db:"account_id"`
	Type          types.Account `json:"type" db:"type"`
	Name          string        `json:"name" db:"name"`
	InstitutionID string        `json:"institution_id" db:"institution_id"`
	UserID        string        `json:"user_id" db:"user_id"`
}

func (input *Account) Save(db *pgxpool.Pool) error {
	_, err := db.Query(context.Background(), "INSERT INTO accounts(type, name, institution_id, user_id) VALUES($1, $2, $3, $4)", input.Type, input.Name, input.InstitutionID, input.UserID)
	if err != nil {
		return err
	}

	return nil
}

const accountsByUserQuery = `
SELECT * 
	FROM accounts
	WHERE user_id = $1;
`

func FindAccountsByUser(user *User, db *pgxpool.Pool) ([]Account, error) {
	rows, err := db.Query(context.Background(), accountsByUserQuery, user.ID)
	if err != nil {
		return []Account{}, err
	}

	accounts, err := pgx.CollectRows(rows, pgx.RowToStructByName[Account])
	if err != nil {
		return []Account{}, err
	}

	return accounts, nil
}
