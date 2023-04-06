package models

type Institution struct {
	Base
	Name string `gorm:"column:name;size:25;not null;" json:"name"`
}
