package application

import (
	"fmt"
	"server/v1/users/domain"
	"server/v1/users/infrastructure"
	"time"
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
func GetUserByToken(token string) (domain.UserResponse, error) {
	return infrastructure.GetUserByAccessToken(token)
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
	token := domain.TokenAggregate{
		User_id:    user_id,
		Token:      generateRandomToken(),
		Created_at: time.Now().UnixMilli(),
	}
	err := infrastructure.GenerateToken(token)
	if err != nil {
		return "", err
	}
	return token.Token, nil
}
func generateRandomToken() string {
	return "uuuuuuquerandommmmmm"
}
