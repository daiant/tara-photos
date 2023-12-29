package presentation

import (
	"fmt"
	"net/http"
	"server/v1/users/application"
	"strings"
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

func GetUserInfoToken(w http.ResponseWriter, r *http.Request) {
	user_id, err := getUser(r)
	if err != nil {
		fmt.Println(err.Error())
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}
	user_token, err := application.GetUserInfo(user_id)
	if err != nil {
		fmt.Println(err.Error())
		http.Error(w, "Something went wrong", http.StatusInternalServerError)
		return
	}
	fmt.Fprint(w, user_token)
}
func getUser(r *http.Request) (int64, error) {
	token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
	return application.GetUserByToken(token)
}
