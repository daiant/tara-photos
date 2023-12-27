package domain

import (
	"database/sql"
	"mime/multipart"
)

type File struct {
	File       multipart.File
	Filename   string
	Created_At int64
}

type FileResponse struct {
	Id         int
	Filename   string
	Thumbnail  sql.NullString
	Created_At int64
}

type FileDelete struct {
	Id         int
	Deleted_At int64
}
