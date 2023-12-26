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

type Middleware func(http.HandlerFunc) http.HandlerFunc

func Cors() Middleware {

	// Create a new Middleware
	return func(f http.HandlerFunc) http.HandlerFunc {

		// Define the http.HandlerFunc
		return func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			f(w, r)
		}
	}
}

func Chain(f http.HandlerFunc, middlewares ...Middleware) http.HandlerFunc {
	for _, m := range middlewares {
		f = m(f)
	}
	return f
}
func main() {
	fmt.Println("Init server...")
	r := mux.NewRouter()
	r.HandleFunc("/", Hello)
	r.HandleFunc("/post", Chain(presentation.CreateFile, Cors())).Methods("POST")
	r.HandleFunc("/get/{id:[0-9]+}", Chain(presentation.GetFile, Cors())).Methods("GET")
	r.HandleFunc("/bucket/{file}", Chain(presentation.DownloadFile, Cors())).Methods("GET")
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
