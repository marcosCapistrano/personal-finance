package models

import (
	"server/database"
	"time"

	"github.com/gofrs/uuid"
)

type Balance struct {
	Base
	Date      time.Time `gorm:"column:date;not null;" json:"date"`
	Value     float32   `gorm:"column:value;not null;" json:"value"`
	AccountID uuid.UUID `gorm:"type:uuid;column:account_id;" json:"account_id"`
}

func (bal *Balance) Save() (*Balance, error) {
	err := database.DB.Create(&bal).Error
	if err != nil {
		return &Balance{}, err
	}
	return bal, nil
}
