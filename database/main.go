package main

import (
	"backend/database"
	"backend/server"
	"fmt"
	"time"
)

func main() {
	db := database.Create()
	db.Connect()
	defer db.Shutdown()

	fmt.Println(time.Now())
	server := server.Create(db)
	server.Start()

}
