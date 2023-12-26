package infrastructure

import (
	"fmt"
	"io"
	"os"
	"server/v1/files/domain"
)

func CreateFile(fileEntity domain.File) error {
	fmt.Println("Create file with name: " + fileEntity.Filename)
	fullPath := domain.DESTINATION + fileEntity.Filename
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
