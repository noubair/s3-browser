package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"s3Browser/client"

	"github.com/gorilla/mux"
)

const port string = ":1111"
const frontendEndpoint = "/send"

func postMessage(w http.ResponseWriter, r *http.Request) {
	requestBody, _ := ioutil.ReadAll(r.Body)
	var frontRequest client.FrontendRequest
	json.Unmarshal(requestBody, &frontRequest)
	client := &client.Client{}
	response := client.Handle(frontRequest)
	json.NewEncoder(w).Encode(response)
}

func handleRequests() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc(frontendEndpoint, postMessage).Methods("POST")
	log.Fatal(http.ListenAndServe(port, router))
}

func main() {
	fmt.Println("Explorer backend running on port", port)
	handleRequests()
}
