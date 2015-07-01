from fabric.api import *
import fabric.contrib.project as project
import os
import sys
import livereload
from datetime import datetime

# livereload
def live_build(port=8080):
    os.chdir('app/')
    server = livereload.Server()
    server.watch('css/')
    server.watch('fonts/')
    server.watch('images/')
    server.watch('js/')
    server.watch('*.html')
    server.serve(liveport=35729, port=port)

# publish to github pages
def publish_github():
    local('ghp-import -r origin -b master -pm "(updated): site updated" app')
    print '\n===> Successfully published to github pages.'
