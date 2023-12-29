package application

import (
	"fmt"
	"server/v1/users/domain"
	"server/v1/users/infrastructure"
	"time"

	"github.com/golang-jwt/jwt"
)

func Register(username string, email string, password string) error {
	userEntity := domain.UserAggregate{
		Username:   username,
		Email:      email,
		Password:   password,
		Created_at: time.Now().UnixMilli(),
	}
	return infrastructure.Register(userEntity)
}

func Login(email string, password string) (string, error) {
	user, err := infrastructure.GetUserByEmailAndPassword(email, password)
	if err != nil {
		return "", err
	}
	token, err := infrastructure.GetTokenByUserId(user.Id)
	if err != nil {
		return createToken(user.Id)
	}
	return token, err
}
func GetUserByToken(tokenString string) (int64, error) {
	token, err := CheckToken(tokenString)
	if err != nil {
		return -1, err
	}
	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		return int64(claims["user"].(float64)), nil
	}
	return -1, nil
}
func GetTokenExists(token string) bool {
	id, err := infrastructure.GetTokenId(token)
	if err != nil {
		fmt.Printf("Error retrieving token: %v\n", err)
		return false
	}
	return id >= 0
}
func createToken(user_id int64) (string, error) {
	jwtToken, err := GenerateToken(user_id)
	if err != nil {
		fmt.Println(err)
		return "", err
	}
	token := domain.TokenAggregate{
		User_id:    user_id,
		Token:      jwtToken,
		Created_at: time.Now().UnixMilli(),
	}
	responseErr := infrastructure.GenerateToken(token)
	if responseErr != nil {
		return "", err
	}
	return token.Token, nil
}
