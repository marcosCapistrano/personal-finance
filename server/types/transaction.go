package types

import "database/sql/driver"

type Transaction string

const (
	INCOME  Transaction = "INCOME"
	EXPENSE Transaction = "EXPENSE"
)

func (tt *Transaction) Scan(value interface{}) error {
	*tt = Transaction(value.(string))

	return nil
}

func (tt Transaction) Value() (driver.Value, error) {
	return string(tt), nil
}
