package application

import (
	"fmt"
	"server/v1/users/domain"
	"server/v1/users/infrastructure"
	"time"

	"github.com/golang-jwt/jwt"
)

func GenerateToken(id int64) (string, error) {
	fmt.Printf("Generating token for %v\n", id)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user":    id,
		"created": time.Now().UnixMilli(),
	})
	tokenString, err := token.SignedString([]byte(domain.TOKEN_SECRET))
	return tokenString, err
}

func CreateAccessToken(user_id int64) (string, error) {
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
func CheckAccessToken(tokenString string) (*jwt.Token, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return []byte(domain.TOKEN_SECRET), nil
	})
	if err != nil {
		return nil, err
	}
	return token, nil
}
func GetTokenExists(token string) bool {
	id, err := infrastructure.GetTokenId(token)
	if err != nil {
		fmt.Printf("Error retrieving token: %v\n", err)
		return false
	}
	return id >= 0
}
