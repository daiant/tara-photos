package domain

import "database/sql"

type TokenAggregate struct {
	User_id    int64
	Token      string
	Created_at int64
}
type Token struct {
	Id         int64
	User_id    int64
	Token      string
	Created_at int64
	Deleted_at sql.NullInt64
}
