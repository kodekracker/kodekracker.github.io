#! /usr/bin/env python
# -*- coding: utf-8 -*-
import os
import sys
import json
import settings
from fabric.api import task, local
from livereload import Server, shell
from jinja2 import Environment, FileSystemLoader
from pprint import pprint

def gather_data(dir_name="."):
    """
    Read data from folder about website content and return them as dictionary
    """
    data = {}
    # Read head file and collect data
    try:
        with open(dir_name+"/head.json") as head_json_data:
            head_data = json.load(head_json_data)
            data.update({"head": head_data })
            print "* Head Data Loaded..."
    except Exception as e:
        print "Error while processing head.json"
        raise e

    # Read resource file and collect data
    try:
        with open(dir_name+"/resource.json") as resource_json_data:
            resource_data = json.load(resource_json_data)
            data.update({"resource": resource_data })
            print "* Resource Data Loaded"
    except Exception as e:
        print "Error while processing resource.json"
        raise e

    # Read body content file and collect data
    try:
        with open(dir_name+"/content.json") as content_json_data:
            content_data = json.load(content_json_data)
            data.update({"content": content_data })
            print "* Content Data Loaded..."
    except Exception as e:
        print "Error while processing content.json"
        raise e

    # Get Google Analytics ID and add it to data
    data.update({"google_analytics_id": settings.GOOGLE_ANALYTICS_ID})

    # Add StatsCounter Analytics should on or not
    data.update({"statscounter_on": settings.STATS_COUNTER_ON})

    return data

@task
def build(production=False):
    """
    A task to build a project
    """
    env = Environment(loader=FileSystemLoader("templates"),
        variable_start_string=settings.VARIABLE_START_STRING,
        variable_end_string=settings.VARIABLE_END_STRING
        )
    template = env.get_template("index.html")
    data = gather_data("app/data")
    with open("app/index.html", "w") as f:
        f.write(template.render(data=data, production=production))
    print "\n ==> Project Build Successfully.\n"

@task
def live_run(port=8080):
    """
    A task which run a project as a livereload
    """
    # First build project for development
    build()

    # Set livereload server watchers and start it
    server = Server()
    server.watch('app/')
    server.watch('app/data/*.json', build)
    server.watch('templates/*.html', build)
    server.serve(root="app/", open_url_delay=True, liveport=35729, port=port)

@task
def publish_github():
    """
    A task which publish a project to github pages
    """
    # Build project for production
    build(production=True)
    print "* Building project for production"

    # Push to github master branch
    local('ghp-import -r origin -b master -pm "(updated): site updated" app')

    print '\n===> Successfully published to github pages.'
    print "\n     Go to http://akshayon.net "
