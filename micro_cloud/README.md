# Cloud Microservice

Use this command to authenticate the docker container:

```bash
docker run -it --name gcloud-config google/cloud-sdk gcloud auth login
```

To list compute instances using these credentials, run the container with
`--volumes-from`:

```bash
docker run --rm -ti --volumes-from gcloud-config google/cloud-sdk gcloud compute instances list --project your_project
```
