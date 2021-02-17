package operations

import (
	"fmt"
	"os"
	cr "s3Browser/credentials"
	"strings"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

func ListObjects(bucket string, key string) []*s3.Object {
	sess, err := session.NewSession(&aws.Config{
		Region:           aws.String(cr.GetRegion()),
		Credentials:      credentials.NewStaticCredentials(cr.GetAccessKey(), cr.GetSecretKey(), ""),
		Endpoint:         aws.String(cr.GetEndpoint()),
		S3ForcePathStyle: aws.Bool(true),
	},
	)

	// Create S3 service client
	svc := s3.New(sess)

	resp, err := svc.ListObjectsV2(&s3.ListObjectsV2Input{Bucket: aws.String(bucket), Prefix: aws.String(key)})
	if err != nil {
		exitErrorf("Unable to list items in bucket %q, %v", bucket, err)
	}

	return resp.Contents
}

type KeyWithFileOrFolderName struct {
	Key              string
	FileOrFolderName string
}

func ListWithFileOrFolderNames(bucket string, key string) []KeyWithFileOrFolderName {
	// handle case of listing final empty folder

	objects := ListObjects(bucket, key)
	keys := []string{}
	for _, ob := range objects {
		keys = append(keys, strings.TrimPrefix(*ob.Key, strings.TrimSuffix(key, "/")+"/"))
	}

	return GetFirstLevelObjects(keys)
}

func GetFirstLevelObjects(keys []string) []KeyWithFileOrFolderName {
	firstLevelFoldersSet := map[string]bool{}
	keysWithFileOrFolderNames := []KeyWithFileOrFolderName{}
	for _, k := range keys {
		firstLevelFolder := strings.Split(k, "/")[0]
		if firstLevelFoldersSet[firstLevelFolder] != true {
			keysWithFileOrFolderNames = append(keysWithFileOrFolderNames, KeyWithFileOrFolderName{k, firstLevelFolder})
			firstLevelFoldersSet[firstLevelFolder] = true
		}
	}
	return keysWithFileOrFolderNames
}

func UploadObject(bucket string, filename string) {
	file, err := os.Open(filename)
	if err != nil {
		exitErrorf("Unable to open file %q, %v", err)
	}

	defer file.Close()

	sess, err := session.NewSession(&aws.Config{
		Region:           aws.String(cr.GetRegion()),
		Credentials:      credentials.NewStaticCredentials(cr.GetAccessKey(), cr.GetSecretKey(), ""),
		Endpoint:         aws.String(cr.GetEndpoint()),
		S3ForcePathStyle: aws.Bool(true),
	},
	)

	uploader := s3manager.NewUploader(sess)

	_, err = uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(filename),
		Body:   file,
	})
	if err != nil {
		// Print the error and exit.
		exitErrorf("Unable to upload %q to %q, %v", filename, bucket, err)
	}

	fmt.Printf("Successfully uploaded %q to %q\n", filename, bucket)
}
