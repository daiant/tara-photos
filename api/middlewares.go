package main

import (
	"fmt"
	"net/http"
	"server/v1/users/application"
	"strings"
)

type Middleware func(http.HandlerFunc) http.HandlerFunc

func Cors() Middleware {
	// Create a new Middleware
	return func(f http.HandlerFunc) http.HandlerFunc {
		// Define the http.HandlerFunc
		return func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")
			f(w, r)
		}
	}
}

func Authentication() Middleware {
	return func(f http.HandlerFunc) http.HandlerFunc {
		// Define the http.HandlerFunc
		return func(w http.ResponseWriter, r *http.Request) {
			if r.Method == "OPTIONS" {
				fmt.Fprintln(w, "Eiiieeee")
				return
			}
			token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
			if token != "" && application.GetTokenExists(token) {
				f(w, r)
			} else {
				http.Error(w, "No fucking token", http.StatusUnauthorized)
				return
			}

		}
	}
}
func Chain(f http.HandlerFunc, middlewares ...Middleware) http.HandlerFunc {
	for _, m := range middlewares {
		f = m(f)
	}
	return f
}
