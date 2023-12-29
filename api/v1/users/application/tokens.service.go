package application

import (
	"fmt"
	"server/v1/users/domain"
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
	fmt.Println(tokenString, err)
	return tokenString, err
}

func CheckToken(tokenString string) (*jwt.Token, error) {
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
