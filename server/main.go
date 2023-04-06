package main

import (
	"log"
	"server/database"
	"server/models"
	"server/server"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load(".env.local")
	if err != nil {
		log.Fatal("error loading .env file")
	}

	db, err := database.Connect()
	if err != nil {
		log.Fatalf("error connecting to db: %v", err)
	}

	db.AutoMigrate(&models.User{})
	db.AutoMigrate(&models.Institution{})
	db.AutoMigrate(&models.Account{})
	db.AutoMigrate(&models.Balance{})
	db.AutoMigrate(&models.Transaction{})

	server.Start()
}
