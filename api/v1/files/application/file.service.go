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
	infrastructure.CreateFile(fileEntity)
	id, err := infrastructure.CreateDBEntry(fileEntity)
	if err != nil {
		return -1, err
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

func getFilename(date int64, handler *multipart.FileHeader) string {
	return strconv.Itoa(int(date)) + "-" + handler.Filename
}
func getDate() int64 {
	return time.Now().UnixMilli()
}
