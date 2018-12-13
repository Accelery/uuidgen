set -e

# build
ng build --prod

# navigate into the build output directory
cd backend

gcloud app deploy\
 --project=uuidgen-20016\
 --version=prod\
 --quiet

cd -
