@echo off

for /f %%i in (dir.txt) do type %%i >> main-min.css
java -jar yuicompressor-2.4.7.jar --type css --charset utf-8 -o ..\assets\css\main.min.css main-min.css
del main-min.css

pause