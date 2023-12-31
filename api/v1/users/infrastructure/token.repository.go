package infrastructure

import (
	"server/database"
	"server/v1/users/domain"
)

func GetTokenByUserId(id int64) (string, error) {
	db := database.Connect()
	defer db.Close()
	row := db.QueryRow(`SELECT user_tokens.token 
		FROM user_tokens 
		WHERE user_id = ?
		AND deleted_at IS NULL
	`, id)
	var token string
	if err := row.Scan(&token); err != nil {
		return "", err
	}
	return token, nil
}

func GenerateToken(token domain.TokenAggregate) error {
	db := database.Connect()
	defer db.Close()
	_, err := db.Exec(`INSERT INTO user_tokens (user_id, token, created_at) VALUES (?, ?, ?)`, token.User_id, token.Token, token.Created_at)
	return err
}

func GetTokenId(token string) (int64, error) {
	db := database.Connect()
	defer db.Close()
	var id int64
	result := db.QueryRow(`SELECT id FROM user_tokens WHERE token = ? AND deleted_at IS NULL`, token)
	if err := result.Scan(&id); err != nil {
		return -1, err
	}
	return id, nil
}
