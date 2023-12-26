package presentation

import (
	"fmt"
	"net/http"
	"server/v1/files/application"
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

// func Upload(w http.ResponseWriter, r *http.Request) {
// 	fmt.Println("Upload new file")
// 	fmt.Printf("Uploaded File: %+v\n", handler.Filename)
// 	fmt.Printf("File Size: %+v\n", handler.Size)
// 	fmt.Printf("MIME Header: %+v\n", handler.Header)

// 	// Create a temporary file within our temp-images directory that follows
// 	// a particular naming pattern
// 	if err != nil {
// 		fmt.Println(err)
// 		http.Error(w, "Unknown error", http.StatusInternalServerError)
// 		return
// 	}
// 	tempFile, err := os.CreateTemp("temp-images", "upload-*"+extension)
// 	if err != nil {
// 		fmt.Println(err)
// 		http.Error(w, "Unknown error", http.StatusInternalServerError)
// 		return
// 	}
// 	defer tempFile.Close()

// 	// read all of the contents of our uploaded file into a
// 	// byte array
// 	fileBytes, err := io.ReadAll(file)
// 	if err != nil {
// 		fmt.Println(err)
// 		http.Error(w, "Unknown error", http.StatusInternalServerError)
// 		return
// 	}
// 	// write this byte array to our temporary file
// 	tempFile.Write(fileBytes)
// 	// return that we have successfully uploaded our file!
// 	dbError := database.CreateEntry(tempFile.Name())
// 	if dbError != nil {
// 		fmt.Println(dbError)
// 		http.Error(w, "Error uploading to db", http.StatusInternalServerError)
// 	} else {
// 		fmt.Fprintf(w, "Successfully Uploaded File\n")
// 	}
// }
// func getFilenameExtension(filename string) (string, error) {
// 	if filename == "" {
// 		return "", errors.New("filename empty")
// 	}
// 	filenameSlice := strings.Split(filename, ".")
// 	return "." + filenameSlice[len(filenameSlice)-1], nil
// }
