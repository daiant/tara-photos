package database

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func Connect() *sql.DB {
	// Configure the database connection (always check errors)
	db, err := sql.Open("mysql", "root:files@(mysql)/files?parseTime=true")
	if err != nil {
		log.Fatal("Error openning db connection: ", err)
	}
	// Initialize the first connection to the database, to see if everything works correctly.
	// Make sure to check the error.
	pingErr := db.Ping()
	if pingErr != nil {
		log.Fatal("Error connecting to db: ", err)
	}
	return db
}
