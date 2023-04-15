package types

import (
	"database/sql/driver"
	"time"
)

type TotalBalance struct {
	Date  time.Time
	Total float64
}

func (tt *TotalBalance) Scan(value interface{}) error {
	*tt = TotalBalance(value.(TotalBalance))

	return nil
}

func (tt TotalBalance) Value() (driver.Value, error) {
	return TotalBalance(tt), nil
}
