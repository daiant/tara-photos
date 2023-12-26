package presentation

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/v1/files/application"
	"server/v1/files/domain"
	"strconv"

	"github.com/gorilla/mux"
)

func CreateFile(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Creating file controller")
	r.ParseMultipartForm(10 << 20)
	file, handler, err := r.FormFile("file")
	if err != nil {
		fmt.Println(err)
		http.Error(w, "No file uploaded", http.StatusBadRequest)
		return
	}
	defer file.Close()

	id, responseErr := application.CreateFile(file, handler)
	if responseErr != nil {
		fmt.Println("Error: ", responseErr)
		http.Error(w, "Something went wrong", http.StatusInternalServerError)
		return
	}
	fmt.Fprintln(w, "Successo! ", id)
}
func GetAllFiles(w http.ResponseWriter, r *http.Request) {
	files, err := application.GetAllFiles()
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Unknown error", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(files)
}

func GetFile(w http.ResponseWriter, r *http.Request) {
	reqVars := mux.Vars(r)
	id := reqVars["id"]
	idInt, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		http.Error(w, "Id not a number", http.StatusBadRequest)
		return
	}

	fileResponse, err := application.GetFileById(idInt)
	if err != nil {
		fmt.Println(err)
		fmt.Fprintln(w, "Error getting image", http.StatusInternalServerError)
		return
	}
	fmt.Println(fileResponse)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(fileResponse)
}
func DownloadFile(w http.ResponseWriter, r *http.Request) {
	reqVars := mux.Vars(r)
	filename := reqVars["file"]
	fmt.Println(filename)
	http.ServeFile(w, r, domain.DESTINATION+filename)
}
