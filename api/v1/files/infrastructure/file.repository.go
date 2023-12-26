package infrastructure

import (
	"fmt"
	"server/database"
	"server/v1/files/domain"
)

func CreateDBEntry(fileEntity domain.File) (int64, error) {
	db := database.Connect()
	result, err := db.Exec(`
		INSERT INTO posts (filename, created_at) VALUES (?, ?)
	`, fileEntity.Filename, fileEntity.Created_At)
	if err != nil {
		fmt.Println(err)
		return -1, err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return -1, nil
	}
	return id, nil
}
