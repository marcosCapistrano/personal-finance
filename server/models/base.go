package models

import (
	"time"

	"github.com/gofrs/uuid"
	"gorm.io/gorm"
)

// Base contains common columns for all tables.
type Base struct {
	ID        uuid.UUID `gorm:"column:id;type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time `sql:"index"`
}

// BeforeCreate will set a UUID rather than numeric ID.
func (base *Base) BeforeCreate(scope *gorm.DB) error {
	uuid, err := uuid.NewV4()
	if err != nil {
		return err
	}
	base.ID = uuid

	return nil
}
