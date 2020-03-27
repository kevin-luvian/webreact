    //"postbuild": "@powershell -NoProfile -ExecutionPolicy Unrestricted -Command ./post_build.ps1",

Copy-Item "./build/*" -Destination "../src/main/resources/templates" -Recurse -force
Copy-Item "./build/assets/**" -Destination "../src/main/resources/static/assets" -Recurse -force
