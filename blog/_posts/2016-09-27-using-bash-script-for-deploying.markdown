---
layout: post
title:  "Using bash script for deploying"
date:   2016-09-27 21:19:35 +0400
categories: bash deploy ssh
---
Recently I had to connect the phpCI as a continuous integration system to the system consisting of several distributed servers with access via ssh+password (sad but ssh-keys were disallowed). It was decided to use ssh+scp+sshpass and then phpCI could upload builds to remote servers. For this purpose I wrote the following script:

{% highlight bash %}
#!/bin/bash

# example: ./build.sh -b mylatestbuild -a myuser@myserver.ru -d /var/www/myuser/data -r /var/www/myuser/data/www/mysite.ru -p 123456

while [[ $# -gt 1 ]]
do
key="$1"

case $key in
    -b|--buildpath)
    BUILD_PATH="$2"
    shift # past argument
    ;;
    -a|--remoteauth)
    REMOTE_AUTH="$2"
    shift # past argument
    ;;
    -r|--remoteprojectroot)
    REMOTE_PROJECT_ROOT="$2"
    shift # past argument
    ;;
    -p|--password)
    SSH_PASSWORD="$2"
    shift # past argument
    ;;
    -d|--remotedestination)
    REMOTE_DESTINATION="$2"
    shift # past argument
    ;;
    --default)
    DEFAULT=YES
    ;;
    *)
            # unknown option
    ;;
esac
shift # past argument or value
done

tar -cf $BUILD_PATH/build.tar --directory=$BUILD_PATH index.php
tar -uf $BUILD_PATH/build.tar --directory=$BUILD_PATH frontend
tar -uf $BUILD_PATH/build.tar --directory=$BUILD_PATH acme
gzip build.tar
sshpass -p $SSH_PASSWORD scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no $BUILD_PATH/build.tar.gz $REMOTE_AUTH:$REMOTE_DESTINATION
sshpass -p $SSH_PASSWORD ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no $REMOTE_AUTH "rm -rf $REMOTE_PROJECT_ROOT/frontend $REMOTE_PROJECT_ROOT/acme"
sshpass -p $SSH_PASSWORD ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no $REMOTE_AUTH "tar -zxf $REMOTE_DESTINATION/build.tar.gz -C $REMOTE_PROJECT_ROOT"
{% endhighlight %}

The script is simple.
`frontend` and `acme` are just example folders - use your own instead. 

`sshpass` using only for password authorization. So You can remove it for ssh-keys auth.

`-o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no` is using for pass unknown host error.

Hope that I saved a little bit of your time.