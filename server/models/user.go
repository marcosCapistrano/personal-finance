package models

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Base
	ID       string `json:"user_id" db:"user_id"`
	Name     string `json:"name" binding:"required"`
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
	Accounts []Account
}

func (input *User) Save(db *pgxpool.Pool) (*User, error) {
	hashedPass, err := bcrypt.GenerateFromPassword([]byte(input.Password), 4)
	if err != nil {
		return &User{}, err
	}

	_, err = db.Query(context.Background(), "INSERT INTO users(name, email, password) VALUES($1, $2, $3)", input.Name, input.Email, hashedPass)
	if err != nil {
		return &User{}, err
	}

	return &User{}, err
}

func (user *User) ValidatePassword(input string) error {
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input)); err != nil {
		return err
	}

	return nil
}

func FindUserByUsername(username string, db *pgxpool.Pool) (*User, error) {
	var user User
	err := db.QueryRow(context.Background(), "SELECT user_id, name, email, password FROM users WHERE name=$1", username).Scan(&user.ID, &user.Name, &user.Email, &user.Password)
	if err != nil {
		return &User{}, err
	}

	return &user, nil
}

func FindUserByID(id string, db *pgxpool.Pool) (*User, error) {
	var user User
	err := db.QueryRow(context.Background(), "SELECT user_id, name, email, password FROM users WHERE user_id=$1", id).Scan(&user.ID, &user.Name, &user.Email, &user.Password)
	if err != nil {
		return &User{}, err
	}

	return &user, nil
}
