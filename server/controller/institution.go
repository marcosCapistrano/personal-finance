package controller

import (
	"net/http"
	"server/models"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

// import (
// 	"net/http"
// 	"server/models"

// 	"github.com/gin-gonic/gin"
// )

type InstitutionController struct {
	db *pgxpool.Pool
}

func NewInstitutionController(db *pgxpool.Pool) *InstitutionController {
	return &InstitutionController{db}
}

func (ctrl *InstitutionController) AddInstitution(context *gin.Context) {
	var input models.Institution
	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	savedInstitution, err := input.Save(ctrl.db)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusCreated, gin.H{"data": savedInstitution})
}

// func GetAllInstitutions(context *gin.Context) {
// 	institutions, err := models.FindInstitutions()

// 	if err != nil {
// 		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	context.JSON(http.StatusOK, gin.H{"data": institutions})
// }
