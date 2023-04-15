package types

import "database/sql/driver"

type Account string

const (
	CREDIT Account = "CREDIT"
	DEBIT  Account = "DEBIT"
)

func (at *Account) Scan(value interface{}) error {
	*at = Account(value.(string))

	return nil
}

func (at Account) Value() (driver.Value, error) {
	return string(at), nil
}
