package main

import (
	"fmt"
	"net/http"
	"server/database"
	files_controllers "server/v1/files/presentation"
	auth_controllers "server/v1/users/presentation"

	"github.com/gorilla/mux"
)

func Hello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hola desde backend %v", "V1!!")
}

func main() {
	fmt.Println("Init server...")
	r := mux.NewRouter()
	r.HandleFunc("/", Hello)
	// Images Controllers

	r.HandleFunc("/post", Chain(files_controllers.CreateMultipleFiles, Authentication(), Cors())).Methods("POST", "OPTIONS")
	r.HandleFunc("/get/{id:[0-9]+}", Chain(files_controllers.GetFile, Authentication(), Cors())).Methods("GET", "OPTIONS")
	r.HandleFunc("/get/all", Chain(files_controllers.GetAllFiles, Authentication(), Cors())).Methods("GET", "OPTIONS")
	r.HandleFunc("/get/trash", Chain(files_controllers.GetDeletedFiles, Authentication(), Cors())).Methods("GET", "OPTIONS")
	r.HandleFunc("/bucket/{file}", Chain(files_controllers.DownloadFile, Authentication(), Cors())).Methods("GET", "OPTIONS")
	r.HandleFunc("/thumbs/{file}", Chain(files_controllers.DownloadThumb, Authentication(), Cors())).Methods("GET", "OPTIONS")
	r.HandleFunc("/delete/{id:[0-9]+}", Chain(files_controllers.DeleteFile, Authentication(), Cors())).Methods("GET", "OPTIONS")
	// Auth Controllers
	authRouter := r.PathPrefix("/auth/").Subrouter()
	authRouter.HandleFunc("/hello", Chain(auth_controllers.Hello, Cors())).Methods("GET", "OPTIONS")
	authRouter.HandleFunc("/register", Chain(auth_controllers.Register, Cors())).Methods("POST", "OPTIONS")
	authRouter.HandleFunc("/login", Chain(auth_controllers.Login, Cors())).Methods("POST", "OPTIONS")
	authRouter.HandleFunc("/userinfo", Chain(auth_controllers.GetUserInfoToken, Authentication(), Cors())).Methods("GET", "OPTIONS")

	port := "80"
	defer http.ListenAndServe("127.0.0.1:"+port, r)
	db := database.Connect()
	_, table_check := db.Query("select Count(*) from posts;")

	if table_check == nil {
		fmt.Println("table is there, nothing to do.")
	} else {
		fmt.Println("table not there, creating table")
		database.CreateTables()
	}
	fmt.Printf("\nServer started and listening on port: %v\n", port)
}
