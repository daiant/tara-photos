package domain

import "database/sql"

type UserAggregate struct {
	Username   string
	Email      string
	Password   string
	Created_at int64
}

type UserResponse struct {
	Id         int64
	Username   string
	Email      string
	Created_at int64
	Deleted_at sql.NullInt64
}
