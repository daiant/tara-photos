package infrastructure

import (
	"fmt"
	"io"
	"os"
	"server/v1/files/domain"

	"github.com/prplecake/go-thumbnail"
)

func CreateFile(fileEntity domain.File) error {
	fmt.Println("Create file with name: " + fileEntity.Filename)
	fullPath := domain.BUCKET + fileEntity.Filename
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
	fmt.Println("Create thumbnail for file: " + fileEntity.Filename)
	// fullPath := domain.THUMBNAIL + fileEntity.Filename
	var config = thumbnail.Generator{
		DestinationPath:   "",
		DestinationPrefix: "thumb_",
		Scaler:            "CatmullRom",
	}

	imagePath := domain.BUCKET + fileEntity.Filename
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
