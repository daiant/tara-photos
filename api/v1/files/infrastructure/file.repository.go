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
	result := db.QueryRow(`SELECT posts.id, posts.filename, thumbnails.filename AS thumbnail, posts.created_at 
		FROM posts
		LEFT JOIN thumbnails
		ON posts.id = thumbnails.post_id
		WHERE id = ? 
		AND posts.deleted_at IS NULL
	`, id)
	var file domain.FileResponse
	if err := result.Scan(&file.Id, &file.Filename, &file.Thumbnail, &file.Created_At); err != nil {
		fmt.Println(err)
		return domain.FileResponse{}, err
	}
	defer db.Close()
	return file, nil
}

func GetAllFiles() ([]domain.FileResponse, error) {
	db := database.Connect()
	defer db.Close()
	rows, err := db.Query(`SELECT posts.id, posts.filename, thumbnails.filename AS thumbnail, posts.created_at 
		FROM posts 
		LEFT JOIN thumbnails 
		ON posts.id = thumbnails.post_id 
		WHERE posts.deleted_at IS NULL
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var files []domain.FileResponse
	for rows.Next() {
		var file domain.FileResponse
		if err := rows.Scan(&file.Id, &file.Filename, &file.Thumbnail, &file.Created_At); err != nil {
			return files, err
		}
		files = append(files, file)
	}
	if err = rows.Err(); err != nil {
		return files, err
	}
	return files, nil
}

func GetDeletedFiles() ([]domain.FileResponse, error) {
	db := database.Connect()
	defer db.Close()
	rows, err := db.Query(`SELECT posts.id, posts.filename, thumbnails.filename AS thumbnail, posts.created_at 
		FROM posts 
		LEFT JOIN thumbnails 
		ON posts.id = thumbnails.post_id 
		WHERE posts.deleted_at IS NOT NULL
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var files []domain.FileResponse
	for rows.Next() {
		var file domain.FileResponse
		if err := rows.Scan(&file.Id, &file.Filename, &file.Thumbnail, &file.Created_At); err != nil {
			return files, err
		}
		files = append(files, file)
	}
	if err = rows.Err(); err != nil {
		return files, err
	}
	return files, nil
}

func DeleteFileEntry(file domain.FileDelete) error {
	db := database.Connect()
	defer db.Close()
	_, err := db.Exec(`UPDATE posts SET deleted_at = ? WHERE id = ?`, file.Deleted_At, file.Id)
	return err
}

func getFilenameWithBucket(filename string) string {
	return domain.BUCKET + filename
}
