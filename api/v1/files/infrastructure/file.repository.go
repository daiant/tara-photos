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
	defer db.Close()
	return id, nil
}

func GetFilenameById(id int64) (string, error) {
	db := database.Connect()
	result := db.QueryRow(`SELECT filename, created_at from posts WHERE id = ?`, id)
	var (
		filename   string
		created_at int64
	)
	if err := result.Scan(&filename, &created_at); err != nil {
		fmt.Println(err)
		return "", err
	}
	defer db.Close()
	return getFilenameWithBucket(filename), nil
}

func getFilenameWithBucket(filename string) string {
	return domain.DESTINATION + filename
}
