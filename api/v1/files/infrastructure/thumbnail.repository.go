package infrastructure

import (
	"fmt"
	"server/database"
	"server/v1/files/domain"
)

func CreateThumbnailDBEntry(id int64, fileEntity domain.File) (int64, error) {
	db := database.Connect()
	result, err := db.Exec(`
		INSERT INTO thumbnails (filename, post_id, created_at) VALUES (?, ?, ?)
	`, fileEntity.Filename, id, fileEntity.Created_At)
	if err != nil {
		fmt.Println(err)
		return -1, err
	}
	resultId, err := result.LastInsertId()
	if err != nil {
		return -1, nil
	}
	defer db.Close()
	return resultId, nil
}
