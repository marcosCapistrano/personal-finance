package database

import (
	"context"
	"database/sql"
	"time"

	"github.com/jackc/pgx/v5"
)

type Summary struct {
	ID          string         `json:"id" db:"id"`
	Date        time.Time      `json:"date" db:"date"`
	Value       float32        `json:"value" db:"value"`
	Description sql.NullString `json:"description" db:"description"`
	Type        sql.NullString `json:"type" db:"type"`
	AccountID   string         `json:"account_id" db:"account_id"`
}

func (db *DB) GetSummary() ([]Summary, error) {
	rows, err := db.conn.Query(context.Background(), "SELECT id, date, value, description, type, account_id FROM transactions UNION ALL select id, date, value, NULL, NULL, account_id FROM consolidations ORDER by date")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	summary, err := pgx.CollectRows(rows, pgx.RowToStructByName[Summary])
	if err != nil {
		return nil, err
	}

	return summary, nil
}
