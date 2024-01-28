package infrastructure

import (
	"fmt"
	"io"
	"os"
	"server/v1/files/domain"
	"strconv"

	"github.com/prplecake/go-thumbnail"
)

func GetFilePath(fileEntity domain.File) string {
	return domain.BUCKET + strconv.Itoa(int(fileEntity.User_id)) + "/" + fileEntity.Filename
}
func CheckAndCreateBaseFolder(path string) error {
	if _, err := os.Stat(path); err != nil {
		if os.IsNotExist(err) {
			// file does not exist
			return os.MkdirAll(path, os.ModePerm)
		} else {
			// other error
			return err
		}
	}
	return nil
}
func CheckAndCreateThumbnail() error {
	path := domain.THUMBNAIL
	return CheckAndCreateBaseFolder(path)
}
func CheckAndCreateFolder(user_id int64) error {
	path := domain.BUCKET + strconv.Itoa(int(user_id))
	return CheckAndCreateBaseFolder(path)
}
func CreateFile(fileEntity domain.File) error {
	fmt.Println("Create file with name: " + fileEntity.Filename)

	fullPath := GetFilePath(fileEntity)
	// Check for existing folder
	err := CheckAndCreateFolder(fileEntity.User_id)
	if err != nil {
		return err
	}
	osFile, err := os.Create(fullPath)

	if err != nil {
		fmt.Println(err)
		return err
	}
	defer osFile.Close()
	fileBytes, err := io.ReadAll(fileEntity.File)
	if err != nil {
		fmt.Println(err)
		return err
	}
	osFile.Write(fileBytes)
	fmt.Println("Successfully created file.")
	return nil
}

func CreateThumbnail(fileEntity domain.File) error {
	err := CheckAndCreateThumbnail()
	if err != nil {
		return err
	}
	fmt.Println("Create thumbnail for file: " + fileEntity.Filename)
	var config = thumbnail.Generator{
		DestinationPath:   "",
		DestinationPrefix: "thumb_",
		Scaler:            "CatmullRom",
	}

	imagePath := GetFilePath(fileEntity)
	dest := domain.THUMBNAIL + fileEntity.Filename
	gen := thumbnail.NewGenerator(config)

	i, err := gen.NewImageFromFile(imagePath)
	if err != nil {
		return err
	}

	thumbBytes, err := gen.CreateThumbnail(i)
	if err != nil {
		return err
	}

	err = os.WriteFile(dest, thumbBytes, 0644)
	if err != nil {
		return err
	}
	return nil
}
