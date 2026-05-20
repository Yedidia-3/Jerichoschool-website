@REM ----------------------------------------------------------------------------
@REM Maven Wrapper startup batch script
@REM ----------------------------------------------------------------------------
@echo off
setlocal

set MAVEN_WRAPPER_JAR="%~dp0.mvn\wrapper\maven-wrapper.jar"
set MAVEN_WRAPPER_PROPERTIES="%~dp0.mvn\wrapper\maven-wrapper.properties"

for /F "usebackq tokens=1,2 delims==" %%a in (%MAVEN_WRAPPER_PROPERTIES%) do (
    if "%%a"=="distributionUrl" set DISTRIBUTION_URL=%%b
)

set M2_HOME=%USERPROFILE%\.m2\wrapper\dists\apache-maven-3.9.6-bin\apache-maven-3.9.6
set MAVEN_CMD="%M2_HOME%\bin\mvn.cmd"

if not exist %MAVEN_CMD% (
    echo Downloading Maven via Java wrapper...
    java -jar %MAVEN_WRAPPER_JAR% --no-transfer-progress %*
    goto end
)

%MAVEN_CMD% %*

:end
endlocal
