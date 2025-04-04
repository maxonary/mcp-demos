import anthropic
import docker
from dotenv import load_dotenv

load_dotenv()


client = anthropic.AsyncAnthropic()


anthropic_client = anthropic.AsyncAnthropic()
docker_client = docker.DockerClient(
    base_url="unix:///Users/jimzer/.docker/run/docker.sock"
)
