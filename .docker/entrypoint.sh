#!/bin/bash

if [ ! -f ".env.local" ]; then
  cp .env.local.example .env.local
fi

# loop infinito para manter o container rodando
/bin/sh -c "while sleep 1000; do :; done"
