#!/bin/bash

if [ "$1" == "--start" ]; then
    declare -a dirs=(
        "storage"
        "storage/prometheus.data"
        "storage/grafana.data"
        "storage/promtail.data"
        "storage/tempo.data"
        "storage/application.node_modules"
        "storage/mongo.db"
    )

    for dir in ${dirs[@]}; do
        if [ -d "$dir" ]; then
            echo "Directory $dir is exist, skipping."
        else
            mkdir -p "$dir"
        fi
    done

    docker-compose down
    docker-compose up -d
elif [ "$1" == "--update-prometheus" ]; then
    docker-compose stop -t 1 prometheus
    docker-compose up --no-start prometheus
    docker-compose start prometheus
elif [ "$1" == "--stop" ]; then
    docker-compose down
else
    echo "No arguments defined."
    exit 1
fi
