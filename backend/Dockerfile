FROM python:3.6.5

MAINTAINER William Bertrand "w.bertrand@hey.com"

RUN apt-get update \
 && apt-get install -y bash \
 && apt-get clean

RUN apt-get install -y vim
RUN apt-get install -y tmux

RUN pip install 'pip==10.0.1'
RUN pip install pylint

WORKDIR /app

ADD . .

RUN pip install -r requirements.txt
RUN pip freeze

ARG ProjectID
ARG BuildID
ARG RepoName
ARG Branch
ARG CommitID
ARG CommitMessage
ARG CommitDescription
ARG CommitterName
ARG CommitterEmail
ARG CommitterUsername
ARG Time
ARG Timestamp
ARG StringTime

RUN echo "\
ProjectID: ${ProjectID}\n\
BuildID: ${BuildID}\n\
RepoName: ${RepoName}\n\
Branch: ${Branch}\n\
CommitID: ${CommitID}\n\
CommitMessage: \"${CommitMessage}\"\n\
CommitDescription: ${CommitDescription}\n\
CommitterName: ${CommitterName}\n\
CommitterEmail: ${CommitterEmail}\n\
CommitterUsername: ${CommitterUsername}\n\
Time: ${Time}\n\
Timestamp: ${Timestamp}\n\
StringTime: ${StringTime}\n\
" >> /ci.yaml && cat /ci.yaml

EXPOSE 5000