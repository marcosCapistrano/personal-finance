package database

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5"
)

type DB struct {
	conn *pgx.Conn
}

func Create() *DB {
	return new(DB)
}

func (db *DB) Connect() error {
	var err error

	db.conn, err = pgx.Connect(context.Background(), "postgres://postgres:6081849@127.0.0.1:5432/personal-finance")
	if err != nil {
		fmt.Fprintf(os.Stderr, "database: unable to connect to database: %v\n", err)
		os.Exit(1)
	}

	fmt.Println("database: connected to database!")

	return nil
}

func (db *DB) Shutdown() {
	db.conn.Close(context.Background())
}
