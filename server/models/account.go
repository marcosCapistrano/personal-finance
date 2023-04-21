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
SELECT
  i.institution_id,
  i.name,
  '/images/institutions/' || lower(i.name) || '.png' AS logo,
  accounts
FROM
  institutions i
  INNER JOIN (
    SELECT
      institution_id,
      array_agg(
        json_build_object(
          'id', account_id,
          'name', name,
          'type', type
        )
      ) AS accounts
    FROM
      accounts
    WHERE
      user_id = $1
    GROUP BY
      institution_id
  ) a ON i.institution_id = a.institution_id;
`

func FindAccountsByUser(user *User, db *pgxpool.Pool) ([]map[string]interface{}, error) {
	rows, err := db.Query(context.Background(), accountsByUserQuery, user.ID)
	if err != nil {
		return nil, err
	}

	var institutions []map[string]interface{}

	for rows.Next() {
		rowMap, err := pgx.RowToMap(rows)
		if err != nil {
			return nil, err
		}
		institutions = append(institutions, rowMap)
	}

	if rows.Err() != nil {
		return nil, rows.Err()
	}

	return institutions, nil
}
