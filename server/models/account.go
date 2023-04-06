package models

import (
	"server/database"
	"server/types"

	"github.com/gofrs/uuid"
)

type Account struct {
	Base
	Type          types.AccountType `gorm:"column:type;type:account_type;not null;" json:"type"`
	Name          string            `gorm:"column:name;size:25;not null;" json:"name"`
	InstitutionID uuid.UUID         `gorm:"type:uuid;column:institution_id;" json:"institution_id"`
	UserID        uuid.UUID         `gorm:"type:uuid;column:user_id;" json:"user_id"`
}

func (acc *Account) Save() (*Account, error) {
	err := database.DB.Create(&acc).Error
	if err != nil {
		return &Account{}, err
	}
	return acc, nil
}
