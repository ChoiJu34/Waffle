FROM openjdk:11
# Build된 JAR파일
ARG JAR_FILE=./build/libs/chocobank-0.0.1-SNAPSHOT.jar
# JAR 파일 디렉토리에 복사
COPY ${JAR_FILE} app.jar
EXPOSE 8001
ENTRYPOINT ["java", "-jar", "/app.jar"]