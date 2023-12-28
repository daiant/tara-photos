package application

import (
	"mime/multipart"
	"server/v1/files/domain"
	"server/v1/files/infrastructure"
	auth_domain "server/v1/users/domain"
	"strconv"
	"time"
)

func CreateFile(user_id int64, file multipart.File, handler *multipart.FileHeader) (int64, error) {
	date := getDate()
	filename := getFilename(date, handler)
	fileEntity := domain.File{
		Filename:   filename,
		File:       file,
		User_id:    user_id,
		Created_At: date,
	}
	err := infrastructure.CreateFile(fileEntity)
	if err != nil {
		return -1, err
	}
	err = infrastructure.CreateThumbnail(fileEntity)
	if err != nil {
		return -1, err
	}
	id, err := infrastructure.CreateDBEntry(fileEntity)
	if err != nil {
		return -1, err
	}
	_, err = infrastructure.CreateThumbnailDBEntry(id, fileEntity)
	if err != nil {
		return id, err
	}
	return id, nil
}

func GetFileById(id int64) (domain.FileResponse, error) {
	return infrastructure.GetFileById(id)
}

func GetAllFilesByUser(user auth_domain.UserResponse) ([]domain.FileResponse, error) {
	return infrastructure.GetAllFiles(user.Id)
}
func GetDeletedFiles(user auth_domain.UserResponse) ([]domain.FileResponse, error) {
	return infrastructure.GetDeletedFiles(user.Id)
}

func DeleteFile(id int) error {
	entity := domain.FileDelete{
		Id:         id,
		Deleted_At: time.Now().UnixMilli(),
	}
	return infrastructure.DeleteFileEntry(entity)
}

func getFilename(date int64, handler *multipart.FileHeader) string {
	return strconv.Itoa(int(date)) + "-" + handler.Filename
}
func getDate() int64 {
	return time.Now().UnixMilli()
}
