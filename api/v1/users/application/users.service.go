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
		return CreateAccessToken(user.Id)
	}
	return token, err
}
func GetUserByToken(tokenString string) (int64, error) {
	token, err := CheckAccessToken(tokenString)
	if err != nil {
		return -1, err
	}
	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		return int64(claims["user"].(float64)), nil
	}
	return -1, nil
}

func GetUserInfo(id int64) (string, error) {
	user, err := infrastructure.GetUserById(id)
	if err != nil {
		return "", nil
	}
	return generateIdToken(user)
}
func generateIdToken(user domain.UserResponse) (string, error) {
	fmt.Printf("Generating id token for user %v\n", user.Id)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"Id":         user.Id,
		"Username":   user.Username,
		"Email":      user.Email,
		"Created_at": user.Created_at,
	})
	tokenString, err := token.SignedString([]byte(domain.TOKEN_SECRET))
	return tokenString, err
}
