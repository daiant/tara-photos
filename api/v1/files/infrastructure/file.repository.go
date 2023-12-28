package infrastructure

import (
	"fmt"
	"server/database"
	"server/v1/files/domain"
)

func CreateDBEntry(fileEntity domain.File) (int64, error) {
	db := database.Connect()
	result, err := db.Exec(`
		INSERT INTO posts (filename, user_id, created_at) VALUES (?, ?, ?)
	`, fileEntity.Filename, fileEntity.User_id, fileEntity.Created_At)
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

func GetFileById(id int64) (domain.FileResponse, error) {
	db := database.Connect()
	result := db.QueryRow(`SELECT posts.id, posts.filename, thumbnails.filename AS thumbnail, posts.created_at 
		FROM posts
		LEFT JOIN thumbnails
		ON posts.id = thumbnails.post_id
		WHERE posts.id = ? 
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

func GetAllFiles(id int64) ([]domain.FileResponse, error) {
	db := database.Connect()
	defer db.Close()
	rows, err := db.Query(`SELECT posts.id, posts.filename, thumbnails.filename AS thumbnail, posts.created_at 
		FROM posts 
		LEFT JOIN thumbnails 
		ON posts.id = thumbnails.post_id 
		LEFT JOIN users
		ON users.id = posts.user_id
		WHERE posts.user_id = ? 
		AND posts.deleted_at IS NULL
		AND users.deleted_at IS NULL
	`, id)
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

func GetDeletedFiles(id int64) ([]domain.FileResponse, error) {
	db := database.Connect()
	defer db.Close()
	rows, err := db.Query(`SELECT posts.id, posts.filename, thumbnails.filename AS thumbnail, posts.user_id,  posts.created_at 
		FROM posts 
		LEFT JOIN thumbnails 
		ON posts.id = thumbnails.post_id 
		INNER JOIN users
		ON posts.user_id = users.id
		WHERE posts.user_id = ? 
		AND posts.deleted_at IS NOT NULL
	`, id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var files []domain.FileResponse
	for rows.Next() {
		var file domain.FileResponse
		if err := rows.Scan(&file.Id, &file.Filename, &file.Thumbnail, &file.User_id, &file.Created_At); err != nil {
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
