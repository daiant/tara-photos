package database

import (
	"database/sql"
	"log"
)

func CreateTables() {
	db := Connect()
	exec(db, `CREATE TABLE users (
		id INT PRIMARY KEY AUTO_INCREMENT,
		username VARCHAR(60) NOT NULL UNIQUE,
		email VARCHAR(60) NOT NULL UNIQUE,
		password TEXT NOT NULL,
		created_at BIGINT NOT NULL,
		deleted_at BIGINT
	)`)
	exec(db, `CREATE TABLE posts (
		id INT PRIMARY KEY AUTO_INCREMENT,
		filename TEXT NOT NULL,
		tumbnail TEXT,
		user_id INT,
		created_at BIGINT NOT NULL,
		deleted_at BIGINT,
		FOREIGN KEY (user_id) REFERENCES users(id)
	)`)
	exec(db, `CREATE TABLE thumbnails (
		id INT PRIMARY KEY AUTO_INCREMENT,
		filename TEXT NOT NULL,
		post_id INT NOT NULL,
		created_at BIGINT NOT NULL,
		deleted_at BIGINT,
		FOREIGN KEY (post_id) REFERENCES posts(id)
	)`)
	exec(db, `CREATE TABLE user_tokens (
		id INT PRIMARY KEY AUTO_INCREMENT,
		user_id INT NOT NULL,
		token TEXT NOT NULL UNIQUE,
		created_at BIGINT NOT NULL,
		deleted_at BIGINT,
		FOREIGN KEY (user_id) REFERENCES users(id)
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
