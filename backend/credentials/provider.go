package credentials

import "s3Browser/configuration"

func GetAccessKey() string {
	conf, _ := configuration.ReadDefaultConf()
	return conf.Bucket.AccessKey
}

func GetSecretKey() string {
	conf, _ := configuration.ReadDefaultConf()
	return conf.Bucket.AccessKey
}

func GetEndpoint() string {
	conf, _ := configuration.ReadDefaultConf()
	return conf.Bucket.Endpoint
}

func GetRegion() string {
	conf, _ := configuration.ReadDefaultConf()
	return conf.Bucket.Region
}
