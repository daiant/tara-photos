package infrastructure

import (
	"server/database"
	"server/v1/users/domain"
)

func Register(user domain.UserAggregate) error {
	db := database.Connect()
	defer db.Close()
	_, err := db.Exec(`INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, ?)`, user.Username, user.Email, user.Password, user.Created_at)
	return err
}
func GetUserByEmailAndPassword(email string, password string) (domain.UserResponse, error) {
	db := database.Connect()
	defer db.Close()
	var user domain.UserResponse
	result := db.QueryRow(`SELECT id, username, email, created_at FROM users WHERE email = ? AND password = ? AND deleted_at IS NULL`, email, password)
	err := result.Scan(
		&user.Id,
		&user.Username,
		&user.Email,
		&user.Created_at,
	)
	if err != nil {
		return domain.UserResponse{}, err
	}
	return user, nil
}

func GetUserByAccessToken(token string) (domain.UserResponse, error) {
	db := database.Connect()
	defer db.Close()
	var user domain.UserResponse
	result := db.QueryRow(`SELECT users.id, users.username, users.email, users.created_at FROM users
		INNER JOIN user_tokens
		ON users.id = user_tokens.user_id
		WHERE user_tokens.token = ?
		AND user_tokens.deleted_at IS NULL
		AND users.deleted_at IS NULL
	`, token)
	err := result.Scan(
		&user.Id,
		&user.Username,
		&user.Email,
		&user.Created_at,
	)
	if err != nil {
		return domain.UserResponse{}, err
	}
	return user, nil

}
