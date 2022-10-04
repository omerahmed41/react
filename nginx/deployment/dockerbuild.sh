#!/usr/bin/env bash
if [[ -z $IMAGE_TAG ]]; then
  echo "IMAGE_TAG is empty"
  exit 1
fi

if [[ -z $BITBUCKET_REPO_SLUG ]]; then
  echo "BITBUCKET_REPO_SLUG is empty"
  exit 1
fi

if [[ -z $DOCKER_REGISTRY ]]; then
  echo "DOCKER_REGISTRY is empty"
  exit 1
fi

export DOCKER_REGISTRY="854911248207.dkr.ecr.me-south-1.amazonaws.com"
# Login to ECR
aws ecr get-login-password --region me-south-1 | docker login --username AWS --password-stdin $DOCKER_REGISTRY
# Create Repo if not exist
aws ecr describe-repositories --repository-names --region me-south-1 $BITBUCKET_REPO_SLUG || aws ecr create-repository --repository-name  --region me-south-1 $BITBUCKET_REPO_SLUG

DOCKER_IMAGE="$DOCKER_REGISTRY/$BITBUCKET_REPO_SLUG:$IMAGE_TAG"
# docker pull $DOCKER_REGISTRY/$BITBUCKET_REPO_SLUG:latest
docker build -f Dockerfile -t $DOCKER_IMAGE -t $DOCKER_REGISTRY/$BITBUCKET_REPO_SLUG:latest .
docker push $DOCKER_IMAGE
# docker push $DOCKER_REGISTRY/$BITBUCKET_REPO_SLUG:latest