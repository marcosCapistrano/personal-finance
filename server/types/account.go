package types

import "database/sql/driver"

type AccountType string

const (
	INCOME  AccountType = "INCOME"
	EXPENSE AccountType = "EXPENSE"
)

func (at *AccountType) Scan(value interface{}) error {
	*at = AccountType(value.([]byte))

	return nil
}

func (at AccountType) Value() (driver.Value, error) {
	return string(at), nil
}
