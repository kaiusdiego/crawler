#!/bin/bash

npm install

echo "###### Building nestjs ######"

npm run build 

echo "###### Running auth application ######"

npm run start:dev
