



#!/bin/bash

# Google Drive file ID (replace with your actual FILE_ID)
FILE_ID="1SBeHCtJkxU52M8lXhJ5sO_aeQ_N8i3xi"
FILE_NAME="model.rar"

# Function to download large Google Drive files
echo "Downloading model from Google Drive..."
wget --no-check-certificate "https://docs.google.com/uc?export=download&id=$FILE_ID" -O $FILE_NAME

# Extract model.zip and clean up
echo "Extracting model..."
unzip -q $FILE_NAME
rm $FILE_NAME

echo "Model downloaded and extracted successfully!"
