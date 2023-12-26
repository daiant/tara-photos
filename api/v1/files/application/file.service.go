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

func getFilename(date int64, handler *multipart.FileHeader) string {
	return strconv.Itoa(int(date)) + "-" + handler.Filename
}
func getDate() int64 {
	return time.Now().UnixMilli()
}
