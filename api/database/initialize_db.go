package database

import (
	"database/sql"
	"log"
)

func CreateTables() {
	db := Connect()
	exec(db, `CREATE TABLE posts (
		id INT PRIMARY KEY AUTO_INCREMENT,
		filename TEXT NOT NULL,
		tumbnail TEXT,
		created_at BIGINT NOT NULL,
		deleted_at BIGINT
	)`)
	exec(db, `CREATE TABLE thumbnails (
		id INT PRIMARY KEY AUTO_INCREMENT,
		filename TEXT NOT NULL,
		post_id INT NOT NULL,
		created_at BIGINT NOT NULL,
		deleted_at BIGINT,
		FOREIGN KEY (post_id) REFERENCES posts(id)
	)`)
	defer db.Close()
	log.Println("Table created")
}
func exec(db *sql.DB, query string) {
	_, err := db.Exec(query)
	if err != nil {
		log.Fatal(err)
	}
}
