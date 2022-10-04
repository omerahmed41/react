#!/usr/bin/env bash

if [[ -z $IMAGE_TAG ]]; then
  echo "IMAGE_TAG is empty"
  exit 1
fi

if [[ -z $BITBUCKET_REPO_SLUG ]]; then
    echo "BITBUCKET_REPO_SLUG is empty"
    exit 1
fi

if [[ -z $NAMESPACE ]]; then
    echo "NAMESPACE is empty"
    exit 1
fi

export DOCKER_REGISTRY="854911248207.dkr.ecr.me-south-1.amazonaws.com"

# envsubst < k8s/$SERVICE/config.$ENV.yml > k8s-config.yml
envsubst < k8s/$SERVICE/main.yml > k8s-main.yml

# Update k8s config to access EKS cluster
aws eks --region me-south-1 update-kubeconfig --name $EKS_CLUSTER

# Apply deployment template
# kubectl apply -f k8s-config.yml -n $NAMESPACE
# if [[ $? != 0 ]]; then exit 1; fi
kubectl apply -f k8s-main.yml -n $NAMESPACE
if [[ $? != 0 ]]; then exit 1; fi

kubectl rollout status deployments/$BITBUCKET_REPO_SLUG -n $NAMESPACE
if [[ $? != 0 ]]; then
    kubectl logs -n $NAMESPACE $(kubectl get pods --sort-by=.metadata.creationTimestamp -n $NAMESPACE | grep "$BITBUCKET_REPO_SLUG" | awk '{print $1}' | tac | head -1 ) --tail=20 && exit 1;
fi