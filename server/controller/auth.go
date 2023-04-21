package controller

import (
	"fmt"
	"net/http"
	"server/helpers"
	"server/models"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

type AuthController struct {
	db *pgxpool.Pool
}

func NewAuthController(db *pgxpool.Pool) *AuthController {
	return &AuthController{db}
}

func (ctrl *AuthController) Register(context *gin.Context) {
	var input models.User

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := models.User{
		Name:     input.Name,
		Email:    input.Email,
		Password: input.Password,
	}

	savedUser, err := user.Save(ctrl.db)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusCreated, gin.H{"user": savedUser})
}

func (ctrl *AuthController) Login(context *gin.Context) {
	var input models.AuthenticationInput

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error binding": err.Error()})
		return
	}

	fmt.Println(input)

	user, err := models.FindUserByEmail(input.Email, ctrl.db)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = user.ValidatePassword(input.Password)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	jwt, err := helpers.GenerateJWT(user)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	context.SetCookie("session", jwt, 60*60*24, "/", "localhost", false, true)

	context.JSON(http.StatusOK, gin.H{"message": "cookie created"})
}
