FROM java:8-jre
COPY ./target/ReminderService-0.0.1-SNAPSHOT.jar /usr/src/keepnote/ReminderService-0.0.1-SNAPSHOT.jar
WORKDIR /usr/src/keepnote
EXPOSE 8081
CMD ["java", "-jar", "ReminderService-0.0.1-SNAPSHOT.jar"]