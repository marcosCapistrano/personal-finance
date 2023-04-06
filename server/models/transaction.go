package models

import (
	"server/types"
	"time"

	"github.com/gofrs/uuid"
)

type Transaction struct {
	Base
	Date        time.Time             `gorm:"column:date;not null;" json:"date"`
	Type        types.TransactionType `gorm:"column:type:transaction_type;not null;" json:"transaction_type"`
	Value       float32               `gorm:"column:value;not null;" json:"value"`
	Description string                `gorm:"column:description;size:50;not null;" json:"description"`
	AccountID   uuid.UUID             `gorm:"type:uuid;column:account_id;" json:"account_id"`
}
