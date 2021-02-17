package client

import (
	"fmt"
	"s3Browser/operations"
	"sync"
)

type FrontendRequest struct {
	MessageBody   string      `json:"messageBody"`
	Arguments     []string    `json:"arguments"`
	Action        string      `json:"action"`
	BackendOutput interface{} `json:"backendOutput"`
}

type Client struct {
	ID string
	mu sync.Mutex
}

func (c *Client) Handle(frontendRequest FrontendRequest) FrontendRequest {
	messageBody := frontendRequest.MessageBody
	fmt.Print(messageBody)
	if frontendRequest.Action == "CreateBucket" {
		operations.CreateBucket(messageBody)
	} else if frontendRequest.Action == "DeleteBucket" {
		operations.DeleteBucket(messageBody)
	} else if frontendRequest.Action == "ListBuckets" {
		frontendRequest.BackendOutput = operations.ListBuckets()
	} else if frontendRequest.Action == "UploadObject" {
		operations.UploadObject(frontendRequest.Arguments[0], frontendRequest.Arguments[1])
	} else if frontendRequest.Action == "ListObjects" {
		frontendRequest.BackendOutput = operations.ListWithFileOrFolderNames(frontendRequest.Arguments[0], frontendRequest.Arguments[1])
	}

	return frontendRequest
}
