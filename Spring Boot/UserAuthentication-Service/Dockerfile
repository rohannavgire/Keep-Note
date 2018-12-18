FROM java:8-jre
COPY ./target/UserAuthentication-Service-0.0.1-SNAPSHOT.jar /usr/src/keepnote/UserAuthentication-Service-0.0.1-SNAPSHOT.jar
WORKDIR /usr/src/keepnote
EXPOSE 8089
CMD ["java", "-jar", "UserAuthentication-Service-0.0.1-SNAPSHOT.jar"]