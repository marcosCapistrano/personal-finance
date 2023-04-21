package helpers

import (
	"errors"
	"fmt"
	"net/http"
	"os"
	"server/models"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

var privateKey = []byte(os.Getenv("JWT_PRIVATE_KEY"))

func GenerateJWT(user *models.User) (string, error) {
	tokenTTL, _ := strconv.Atoi(os.Getenv("TOKEN_TTL"))
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":  user.ID,
		"iat": time.Now().Unix(),
		"eat": time.Now().Add(time.Second * time.Duration(tokenTTL)).Unix(),
	})

	return token.SignedString(privateKey)
}

func ValidateJWT(context *gin.Context) error {
	token, err := getToken(context)
	if err != nil {
		return err
	}

	_, ok := token.Claims.(jwt.MapClaims)
	if ok && token.Valid {
		return nil
	}

	return errors.New("invalid token provided")
}

func CurrentUser(context *gin.Context, db *pgxpool.Pool) (*models.User, error) {
	err := ValidateJWT(context)
	if err != nil {
		return &models.User{}, err
	}

	token, _ := getToken(context)
	claims, _ := token.Claims.(jwt.MapClaims)
	userId := string(claims["id"].(string))

	user, err := models.FindUserByID(userId, db)
	if err != nil {
		return &models.User{}, err
	}

	return user, nil
}

func getToken(context *gin.Context) (*jwt.Token, error) {
	cookie, err := getCookieFromRequest(context)
	if err != nil {
		return nil, fmt.Errorf("invalid cookie: %v", err)
	}

	tokenString := cookie.Value
	fmt.Printf("Token string: %s", tokenString)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return privateKey, nil
	})

	return token, err
}

func getCookieFromRequest(context *gin.Context) (*http.Cookie, error) {
	cookie, err := context.Request.Cookie("session")
	if err != nil {
		return nil, err
	}

	fmt.Printf("%v, %v", cookie.MaxAge, err)

	if err = cookie.Valid(); err != nil {
		return nil, err
	}

	fmt.Printf("now: %s, expires: %s", time.Now().String(), cookie.RawExpires)
	if time.Now().After(cookie.Expires) {
		return nil, fmt.Errorf("cookie expired")
	}

	return cookie, nil

}
