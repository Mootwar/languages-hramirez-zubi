ThisBuild / scalaVersion := "2.13.12"

lazy val root = (project in file("."))
  .settings(
    name := "HelloWorldScalaApp",
    version := "0.1",
    libraryDependencies ++= Seq(
      // Akka dependencies (all versions set explicitly)
      "com.typesafe.akka" %% "akka-actor-typed" % "2.6.18", // Use explicit version
      "com.typesafe.akka" %% "akka-http"        % "10.2.7",  // Use explicit version
      "com.typesafe.akka" %% "akka-stream"      % "2.6.18",  // Use explicit version
      "com.typesafe.akka" %% "akka-http-spray-json" % "10.2.7", // Use explicit version
      
      // Spray JSON library
      "io.spray" %% "spray-json" % "1.3.6"
    )
  )
