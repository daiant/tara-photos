package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func Connect() *sql.DB {
	// Configure the database connection (always check errors)
	// Local: 127.0.0.1:3306
	// Docker (mysql)
  // db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	dsn := fmt.Sprintf("%s:%s@(%s:%s)/%s", "files", "files", "localhost", "3306", "files")  + "?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("Error openning db connection: ", err)
	}
	// Initialize the first connection to the database, to see if everything works correctly.
	// Make sure to check the error.
	pingErr := db.Ping()
	if pingErr != nil {
		log.Fatal("Error connecting to db: ", pingErr)
	}
	return db
}
