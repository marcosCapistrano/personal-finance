package models

import "server/database"

type Institution struct {
	Base
	Name string `gorm:"column:name;size:25;not null;" json:"name"`
}

func (ins *Institution) Save() (*Institution, error) {
	err := database.DB.Create(&ins).Error
	if err != nil {
		return &Institution{}, err
	}
	return ins, nil
}

func FindInstitutions() ([]Institution, error) {
	var institutions []Institution
	err := database.DB.Find(&institutions).Error
	if err != nil {
		return []Institution{}, err
	}
	return institutions, nil
}
