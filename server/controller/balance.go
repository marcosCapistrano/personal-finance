package controller

import (
	"net/http"
	"server/helpers"
	"server/models"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

// import (
// 	"net/http"
// 	"server/helpers"
// 	"server/models"

// 	"github.com/gin-gonic/gin"
// )

type BalanceController struct {
	db *pgxpool.Pool
}

func NewBalanceController(db *pgxpool.Pool) *BalanceController {
	return &BalanceController{db}
}

// func AddBalance(context *gin.Context) {
// 	var input models.Balance
// 	if err := context.ShouldBindJSON(&input); err != nil {
// 		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	savedBalance, err := input.Save()

// 	if err != nil {
// 		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	context.JSON(http.StatusCreated, gin.H{"data": savedBalance})
// }

func (ctrl *BalanceController) GetAllBalances(context *gin.Context) {
	user, err := helpers.CurrentUser(context, ctrl.db)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	balances, err := models.FindBalancesByUser(user, ctrl.db)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"data": balances})
}
