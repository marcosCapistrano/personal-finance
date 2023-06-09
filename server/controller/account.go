package controller

import (
	"fmt"
	"net/http"
	"server/helpers"
	"server/models"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

type AccountController struct {
	db *pgxpool.Pool
}

func NewAccountController(db *pgxpool.Pool) *AccountController {
	return &AccountController{db}
}

func (ctrl *AccountController) AddAccount(context *gin.Context) {
	var input models.Account
	if err := context.ShouldBindJSON(&input); err != nil {
		fmt.Printf("error binding account: %s\n", err.Error())
		fmt.Printf("input: %v\n", context.Request.Body)
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	fmt.Println(context.GetRawData())

	user, err := helpers.CurrentUser(context, ctrl.db)
	if err != nil {
		fmt.Printf("error getting current user: %s", err.Error())
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	input.UserID = user.ID
	err = input.Save(ctrl.db)

	if err != nil {
		fmt.Printf("error saving user: %s", err.Error())
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	fmt.Println(input)

	context.JSON(http.StatusCreated, gin.H{"data": nil})
}

func (ctrl *AccountController) GetAllAccounts(context *gin.Context) {
	user, err := helpers.CurrentUser(context, ctrl.db)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	accounts, err := models.FindAccountsByUser(user, ctrl.db)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	context.IndentedJSON(http.StatusOK, accounts)
}
