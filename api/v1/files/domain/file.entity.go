package domain

import (
	"mime/multipart"
)

type File struct {
	File multipart.File
	// Extension  string
	Filename   string
	Created_At int64
}

type FileResponse struct {
	Filename   string
	Created_At int64
}
