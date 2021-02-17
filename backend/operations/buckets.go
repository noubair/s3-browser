package operations

import (
	"fmt"
	"os"
	cr "s3Browser/credentials"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

func ListBuckets() []string {
	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String(cr.GetRegion()),
		Credentials: credentials.NewStaticCredentials(cr.GetAccessKey(), cr.GetSecretKey(), ""),
		Endpoint:    aws.String(cr.GetEndpoint())},
	)

	svc := s3.New(sess)

	result, err := svc.ListBuckets(nil)
	if err != nil {
		exitErrorf("Unable to list buckets, %v", err)

	}

	buckets := []string{}
	for _, b := range result.Buckets {
		fmt.Printf("* %s created on %s\n",
			aws.StringValue(b.Name), aws.TimeValue(b.CreationDate))
		buckets = append(buckets, aws.StringValue(b.Name))
	}

	return buckets
}

func CreateBucket(bucket string) {
	sess, err := session.NewSession(&aws.Config{
		Region:           aws.String(cr.GetRegion()),
		Credentials:      credentials.NewStaticCredentials(cr.GetAccessKey(), cr.GetSecretKey(), ""),
		Endpoint:         aws.String(cr.GetEndpoint()),
		S3ForcePathStyle: aws.Bool(true),
	},
	)

	svc := s3.New(sess)

	_, err = svc.CreateBucket(&s3.CreateBucketInput{
		Bucket: aws.String(bucket),
	})
	if err != nil {
		exitErrorf("Unable to create bucket %q, %v", bucket, err)
	}

	fmt.Printf("Waiting for bucket %q to be created...\n", bucket)

	err = svc.WaitUntilBucketExists(&s3.HeadBucketInput{
		Bucket: aws.String(bucket),
	})

	if err != nil {
		exitErrorf("Error occurred while waiting for bucket to be created, %v", bucket)
	}

	fmt.Printf("Bucket %q successfully created\n", bucket)
}

func DeleteBucket(bucket string) {
	sess, err := session.NewSession(&aws.Config{
		Region:           aws.String(cr.GetRegion()),
		Credentials:      credentials.NewStaticCredentials(cr.GetAccessKey(), cr.GetSecretKey(), ""),
		Endpoint:         aws.String(cr.GetEndpoint()),
		S3ForcePathStyle: aws.Bool(true),
	},
	)

	svc := s3.New(sess)

	_, err = svc.DeleteBucket(&s3.DeleteBucketInput{
		Bucket: aws.String(bucket),
	})
	if err != nil {
		exitErrorf("Unable to delete bucket %q, %v", bucket, err)
	}

	fmt.Printf("Waiting for bucket %q to be deleted...\n", bucket)

	err = svc.WaitUntilBucketNotExists(&s3.HeadBucketInput{
		Bucket: aws.String(bucket),
	})

	if err != nil {
		exitErrorf("Error occurred while waiting for bucket to be deleted, %v", bucket)
	}

	fmt.Printf("Bucket %q successfully deleted\n", bucket)
}

func exitErrorf(msg string, args ...interface{}) {
	fmt.Fprintf(os.Stderr, msg+"\n", args...)
	// os.Exit(1)
}
