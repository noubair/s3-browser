package configuration

import (
	"fmt"
	"io/ioutil"

	"gopkg.in/yaml.v2"
)

const defaultConfigPath = "config.yaml"

type ConfigData struct {
	Bucket struct {
		AccessKey string `yaml:"accessKey"`
		SecretKey string `yaml:"secretKey"`
		Endpoint  string `yaml:"endpoint"`
		Region    string `yaml: "region"`
	}
}

func ReadConf(filename string) (*ConfigData, error) {
	buf, err := ioutil.ReadFile(filename)
	if err != nil {
		return nil, err
	}

	c := &ConfigData{}
	err = yaml.Unmarshal(buf, c)
	if err != nil {
		return nil, fmt.Errorf("in file %q: %v", filename, err)
	}

	return c, nil
}

func ReadDefaultConf() (*ConfigData, error) {
	return ReadConf(defaultConfigPath)
}
