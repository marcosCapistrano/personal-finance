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

type TransactionController struct {
	db *pgxpool.Pool
}

func NewTransactionController(db *pgxpool.Pool) *TransactionController {
	return &TransactionController{db}
}

func (ctrl *TransactionController) AddTransaction(context *gin.Context) {
	var input models.Transaction
	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := input.Save(ctrl.db)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusCreated, gin.H{"data": []models.Transaction{}})
}

func (ctrl *TransactionController) GetAllTransactions(context *gin.Context) {
	user, err := helpers.CurrentUser(context, ctrl.db)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	transactions, err := models.GetAllTransactionsByUser(user, ctrl.db)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"data": transactions})
}
