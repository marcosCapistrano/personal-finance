package main

import (
	"log"
	"server/database"
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

	server := server.New(db)
	server.Start()
}
