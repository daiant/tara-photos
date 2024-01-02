package domain

import (
	"database/sql"
	"mime/multipart"
)

type File struct {
	File       multipart.File
	Filename   string
	User_id    int64
	Created_at int64
}

type FileResponse struct {
	Id         int
	Filename   string
	Thumbnail  sql.NullString
	User_id    int64
	Created_at int64
}

type FileDelete struct {
	Id         int
	Deleted_at int64
}
