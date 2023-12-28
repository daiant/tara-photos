package presentation

import (
	"fmt"
	"net/http"
	"server/v1/users/application"
)

func Hello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello auth controller")
}
func Register(w http.ResponseWriter, r *http.Request) {
	username := r.PostFormValue("username")
	email := r.PostFormValue("email")
	password := r.PostFormValue("password")
	if username == "" || email == "" || password == "" {
		http.Error(w, "Bad form", http.StatusBadRequest)
		return
	}
	err := application.Register(username, email, password)
	if err != nil {
		fmt.Println(err.Error())
		http.Error(w, "Something went wrong.", http.StatusInternalServerError)
		return
	}
	fmt.Fprintln(w, "huloasssss")
}

func Login(w http.ResponseWriter, r *http.Request) {
	email := r.PostFormValue("email")
	password := r.PostFormValue("password")
	if email == "" || password == "" {
		http.Error(w, "Bad form", http.StatusBadRequest)
		return
	}
	token, err := application.Login(email, password)
	if err != nil {
		fmt.Println(err.Error())
		http.Error(w, "Something went wrong.", http.StatusInternalServerError)
		return
	}
	// TODO: Set Cookie maybe?
	fmt.Fprintln(w, token)
}
