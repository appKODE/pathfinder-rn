#!/bin/bash
# update version & create changelog via standard-version, create release notes for version

# GitLab environment variables:
# $GITLAB_ACCESS_TOKEN
# $GITLAB_REPOSITORY
# $GITLAB_USER_EMAIL
# $GITLAB_USER_NAME
# $GITLAB_PROJECT_NAME
# $GITLAB_PROJECT_ID
# $ISSUE_URL_FORMAT

# remember home directory
HOME_DIRECTORY=$(echo $PWD)

# configure gitlab user
git remote set-url origin https://gitlab-ci-token:$GITLAB_ACCESS_TOKEN@$GITLAB_REPOSITORY.git
git config --global user.email $GITLAB_USER_EMAIL
git config --global user.name $GITLAB_USER_NAME

# delete common "release" tag
git push --delete origin release
git tag -d release

# delete common "update-version" tag
git push --delete origin update-version
git tag -d update-version

# move to /tmp and clone repo
cd /tmp
git clone https://gitlab-ci-token:$GITLAB_ACCESS_TOKEN@$GITLAB_REPOSITORY.git
cd $GITLAB_PROJECT_NAME

# get previous version
PREV_VERSION=$(node -p -e "require('./package.json').version")
PREV_TAG=v$PREV_VERSION

# update version & generate changelog via standard-version package
npx standard-version --issueUrlFormat $ISSUE_URL_FORMAT

# get new version
VERSION=$(node -p -e "require('./package.json').version")
TAG=v$VERSION

# generate release notes from diff CHANGELOG.md
RELEASE_NOTES=$(git diff $PREV_TAG $TAG CHANGELOG.md | egrep '^\+' | cut -c2-1024 | awk '{printf "%s\\n", $0}')
RELEASE_NOTES=$(echo${RELEASE_NOTES/++ b\/CHANGELOG.md\\n/ })

# remove new version tag (created by standard-version)
git tag -d $TAG

# replace commit message created by standard-version
git commit --amend -m "$TAG release notes: https://$GITLAB_REPOSITORY/-/tags/$TAG"

# create tag with new version and push to origin
git tag -a $TAG -m release
git push origin master --follow-tags

# create release notes for new version tag via gitlab api
JSON_FMT='{"description":"%s","tag_name":"%s","name":"%s"}'
JSON=$(printf "$JSON_FMT" "$RELEASE_NOTES<br><br><br><br><br><br><br><br><br>*Have a nice bug hunting, dude!* :smiling_imp: <br>" "$TAG" "Release $TAG")
curl -X POST -H "Content-Type: application/json" -H "PRIVATE-TOKEN: $GITLAB_ACCESS_TOKEN" -d "$JSON" https://git.appkode.ru/api/v4/projects/$GITLAB_PROJECT_ID/releases > /dev/null

# move to home directory (need if we going to run another script after update-version)
cd $HOME_DIRECTORY
git pull
git checkout $TAG
