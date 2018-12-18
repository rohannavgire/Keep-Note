FROM java:8-jre
COPY ./target/UserService-0.0.1-SNAPSHOT.jar /usr/src/keepnote/UserService-0.0.1-SNAPSHOT.jar
WORKDIR /usr/src/keepnote
EXPOSE 8080
CMD ["java", "-jar", "UserService-0.0.1-SNAPSHOT.jar"]