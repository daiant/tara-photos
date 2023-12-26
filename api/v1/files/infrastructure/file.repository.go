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

func GetFileById(id int64) (domain.FileResponse, error) {
	db := database.Connect()
	result := db.QueryRow(`SELECT filename, created_at from posts WHERE id = ?`, id)
	var (
		filename   string
		created_at int64
	)
	if err := result.Scan(&filename, &created_at); err != nil {
		fmt.Println(err)
		return domain.FileResponse{}, err
	}
	defer db.Close()
	return domain.FileResponse{
		Filename:   filename,
		Created_At: created_at,
	}, nil
}

func GetAllFiles() ([]domain.FileResponse, error) {
	db := database.Connect()
	defer db.Close()
	rows, err := db.Query(`SELECT filename, created_at from posts`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var files []domain.FileResponse
	for rows.Next() {
		var file domain.FileResponse
		if err := rows.Scan(&file.Filename, &file.Created_At); err != nil {
			return files, err
		}
		files = append(files, file)
	}
	if err = rows.Err(); err != nil {
		return files, err
	}
	return files, nil
}

func getFilenameWithBucket(filename string) string {
	return domain.DESTINATION + filename
}
