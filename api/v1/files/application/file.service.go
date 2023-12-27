package application

import (
	"mime/multipart"
	"server/v1/files/domain"
	"server/v1/files/infrastructure"
	"strconv"
	"time"
)

func CreateFile(file multipart.File, handler *multipart.FileHeader) (int64, error) {
	date := getDate()
	filename := getFilename(date, handler)
	fileEntity := domain.File{
		Filename:   filename,
		File:       file,
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

func GetFilenameById(id int64) (string, error) {
	return infrastructure.GetFilenameById(id)
}

func GetFileById(id int64) (domain.FileResponse, error) {
	return infrastructure.GetFileById(id)
}

func GetAllFiles() ([]domain.FileResponse, error) {
	return infrastructure.GetAllFiles()
}
func GetDeletedFiles() ([]domain.FileResponse, error) {
	return infrastructure.GetDeletedFiles()
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
