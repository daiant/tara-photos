package database

import "log"

func CreatePostsTable() {
	db := Connect()
	defer db.Close()
	_, err := db.Exec(`CREATE TABLE posts (
		id INT PRIMARY KEY AUTO_INCREMENT,
		filename TEXT NOT NULL,
		created_at BIGINT NOT NULL,
		deleted_at BIGINT
	)`)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Table created")
}
