package types

import "database/sql/driver"

type TransactionType string

const (
	CREDIT TransactionType = "CREDIT"
	DEBIT  TransactionType = "DEBIT"
)

func (tt *TransactionType) Scan(value interface{}) error {
	*tt = TransactionType(value.([]byte))

	return nil
}

func (tt TransactionType) Value() (driver.Value, error) {
	return string(tt), nil
}
