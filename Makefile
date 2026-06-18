#----
# Imports
#----

include $(wildcard task/*.mk)

#----
# Variables
#----

.DEFAULT_GOAL := help

PROJECT_NAME := docs-template

#----
# Info
#----

urls: ## Show the urls to the running applications
	@echo "*------"
	@echo "* docs-template"
	@echo "*"
	@echo "* Doc: http://localhost:5173/"
	@echo "*------\n"
.PHONY: urls

#----
# General
#----

install: ## Install dependencies
	@echo "\nInstalling doc npm dependencies"
	@cd doc && npm install
