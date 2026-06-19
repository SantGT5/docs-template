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

install: install/ci ## Install pre commit & npm dependencies
	@echo "\nInstalling pre-commit"
	@pipx install pre-commit

	@echo "\nInstalling pre-commit hook"
	@pre-commit install --hook-type pre-commit --hook-type commit-msg

install/ci: ## Install dependencies
	@echo "\nInstalling doc npm dependencies"
	@cd doc && npm ci

quality: ## Runs pre-commit tasks
	@pre-commit run --all-files
