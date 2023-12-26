package main

import (
	"fmt"
	"net/http"
	"server/database"
	"server/v1/files/presentation"

	"github.com/gorilla/mux"
)

func Hello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hola desde backend %v", "V1!!")
}
func main() {
	fmt.Println("Init server...")
	r := mux.NewRouter()
	r.HandleFunc("/", Hello)
	r.HandleFunc("/post", presentation.CreateFile).Methods("POST")
	r.HandleFunc("/get/{id:[0-9]+}", presentation.GetFile).Methods("GET")
	// r.HandleFunc("/get/", middlewares.Chain(GetAll, middlewares.Logging())).Methods("GET")
	// db := database.Connect()

	// if table_check == nil {
	// 	fmt.Println("table is there, nothing to do.")
	// } else {
	// 	fmt.Println("table not there, creating table")
	// 	database.CreatePostsTable()
	// }

	port := "80"
	defer http.ListenAndServe("127.0.0.1:"+port, r)
	db := database.Connect()
	_, table_check := db.Query("select Count(*) from posts;")

	if table_check == nil {
		fmt.Println("table is there, nothing to do.")
	} else {
		fmt.Println("table not there, creating table")
		database.CreatePostsTable()
	}
	fmt.Printf("\nServer started and listening on port: %v\n", port)
}
