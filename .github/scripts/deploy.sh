#! /bin/bash

set -eux

git config git-ftp.url ftpes://sv38.star.ne.jp/negaposi.crepemaker.xyz
git config git-ftp.user ${FTP_USER}
git config git-ftp.password ${FTP_PASSWORD}
git config git-ftp.syncroot public

git ftp catchup
git ftp push -a