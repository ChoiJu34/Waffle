# 베이스 이미지 명시
FROM python:3.9

# 컨테이너 실행 전 수행할 쉘 명령어
WORKDIR /app

# Copy the requirements.txt file to the container
COPY requirements.txt ./

# Install the application dependencies
RUN pip install -r requirements.txt

# Copy the application code to the container
COPY . .

# 컨테이너가 시작되었을 때 실행할 쉘 명령어
# 도커파일 내 1회만 실행할 수 있음
EXPOSE 8000

# Specify the command to run when the container starts
CMD [ "python", "./manage.py", "runserver", "0.0.0.0:8000" ]
