# 🚀 Docker와 Kubernetes 공부 과정

이 문서는 Docker와 Kubernetes를 공부하면서 진행한 과정을 기록합니다.

---

## ✅ 1. 환경 세팅

### 1-1. 가상환경 생성 (venv)

Python 프로젝트를 독립적으로 관리하기 위해 가상환경을 만들었습니다.

```bash
python -m venv .study
venv\Scripts\activate     # Windows
```

---

## 2. GitHub 레포지토리 준비

프로젝트 코드를 관리할 깃허브 레포지토리를 생성하고, DockerHub와 연동하기 위해 Secrets를 등록했습니다.

### 2-1. GitHub Secrets 설정

```
GitHub Repo → Settings → Secrets and variables → Actions
```

ENV

- DOCKER_USERNAME → DockerHub 계정 ID
- DOCKER_PASSWORD → DockerHub 비밀번호

---

## 3. Docker 환경 구성

### 3-1. Dockerfile 작성

애플리케이션을 컨테이너로 빌드하기 위해 Dockerfile을 작성했습니다.

```yml
FROM python:3.10.11
WORKDIR /app
COPY docker/main.py .
COPY requirements.txt .
RUN pip install -r requirements.txt
CMD ["python", "main.py"]
```

---

## 4. GitHub Actions Workflow 작성

코드 Push 시, 자동으로 Docker 이미지를 빌드하고 DockerHub에 푸시하도록 GitHub Actions를 구성했습니다.
