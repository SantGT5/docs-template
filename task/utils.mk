ifneq (,$(wildcard .env))
	include .env
	export
	ENV_FILE_PARAM := --env-file .env
endif

help: ## Show command list (default)
	@awk -F ':|##' '/^[^\t].+:.*##/ { printf "\033[36mmake %-28s\033[0m -%s\n", $$1, $$NF }' $(MAKEFILE_LIST) | sort
.PHONY: help

# Usage examples:
#   Run the local environment with build:
#     $(call compose,local,up --build)
#
#   Run a command inside the local backend container (e.g., DB migration):
#     $(call compose,local,exec -t backend flask db upgrade)
#
# This macro runs docker compose with the base file and an environment-specific override.
# Arguments:
#   1 - environment (e.g., local, dev, prod)
#   2 - docker compose command (e.g., up --build, exec -t backend ...)
define compose
	docker compose -f docker/compose.yaml --project-name $(PROJECT_NAME) $(2)
endef
