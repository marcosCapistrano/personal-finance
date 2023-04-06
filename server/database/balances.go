package database

import (
	"github.com/gin-gonic/gin"
)

func GetBalances(c *gin.Context) {
	// balances := db.Table("balances").Select("", "").Find(&models.Balance)
	// if err != nil {
	// 	fmt.Printf("server: error getting accounts: %v", err)
	// 	return
	// }
	// c.IndentedJSON(http.StatusOK, balances)
}
