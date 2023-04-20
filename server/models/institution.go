package models

import (
	"context"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Institution struct {
	Base
	ID   string `json:"institution_id" db:"institution_id"`
	Name string `json:"name"`
}

func (model *Institution) Save(db *pgxpool.Pool) (*Institution, error) {
	row, err := db.Query(context.Background(), "INSERT INTO institutions(name) VALUES($1) RETURNING *", model.Name)
	if err != nil {
		return &Institution{}, err
	}

	savedInstitution, err := pgx.CollectOneRow(row, pgx.RowToStructByName[Institution])

	return &savedInstitution, err
}

const institutionsQuery = `
SELECT * 
	FROM institutions
`

func FindInstitutions(db *pgxpool.Pool) ([]Institution, error) {
	rows, err := db.Query(context.Background(), institutionsQuery)
	if err != nil {
		return []Institution{}, err
	}

	institutions, err := pgx.CollectRows(rows, pgx.RowToStructByName[Institution])
	if err != nil {
		return []Institution{}, err
	}

	return institutions, nil
}
