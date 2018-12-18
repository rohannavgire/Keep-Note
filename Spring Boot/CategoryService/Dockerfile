FROM java:8-jre
COPY ./target/CategoryService-0.0.1-SNAPSHOT.jar /usr/src/keepnote/CategoryService-0.0.1-SNAPSHOT.jar
WORKDIR /usr/src/keepnote
EXPOSE 8083
CMD ["java", "-jar", "CategoryService-0.0.1-SNAPSHOT.jar"]