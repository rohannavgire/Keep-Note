FROM java:8-jre
COPY ./target/NoteService-0.0.1-SNAPSHOT.jar /usr/src/keepnote/NoteService-0.0.1-SNAPSHOT.jar
WORKDIR /usr/src/keepnote
EXPOSE 8082
CMD ["java", "-jar", "NoteService-0.0.1-SNAPSHOT.jar"]