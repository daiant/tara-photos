package domain

import "os"

var BUCKET = os.Getenv("BUCKET_DIR")
var THUMBNAIL = os.Getenv("THUMBS_DIR")
