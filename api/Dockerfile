FROM golang:1.21.5 AS build-stage

WORKDIR /app

# Build Args
ARG BUCKET_DIR=/app/bucket/
ARG THUMBS_DIR=/app/bucket/thumbs/

# Create Bucket Directory
RUN mkdir -p ${BUCKET_DIR}
RUN mkdir -p ${THUMBS_DIR}

# Environment Variables
ENV BUCKET_DIR=${BUCKET_DIR} 
ENV THUMBS_DIR=${THUMBS_DIR} 

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o /docker-gs-ping

# Deploy the application binary into a lean image
FROM gcr.io/distroless/base-debian11 AS build-release-stage

WORKDIR /

COPY --from=build-stage /docker-gs-ping /docker-gs-ping

# Environment Variables
ENV BUCKET_DIR=${BUCKET_DIR} 
ENV THUMBS_DIR=${THUMBS_DIR} 

EXPOSE 8080

# Declare volumes to mount
VOLUME [${BUCKET_DIR}, ${THUMBS_DIR}]

USER nonroot:nonroot

ENTRYPOINT ["/docker-gs-ping"]