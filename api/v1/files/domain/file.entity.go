package domain

import (
	"mime/multipart"
)

type File struct {
	File     multipart.File
	Filename string
	// Extension  string
	Created_At int64
}
