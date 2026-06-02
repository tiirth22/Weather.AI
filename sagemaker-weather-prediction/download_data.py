import kagglehub

# Download latest version
path = kagglehub.dataset_download("rafunlearnhub/weatherhistory")

print("Path to dataset files:", path)
