import * as core from '@actions/core'
import {context, getOctokit} from '@actions/github'

async function run(): Promise<void> {
  try {
    const token: string = core.getInput('token', {required: true})
    const github = getOctokit(token, {})

    if (context.eventName !== 'pull_request' || context.eventName !== 'pull_request_target' ) {
      core.info('Action is available only for pull request or pull_request_target.')
      return
    }

    const state = await github.pulls.get({
      pull_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo
    })

    if (['behind', 'dirty'].includes(state.data.mergeable_state)) {
      core.setFailed('You are not up to date')
      return
    }
    core.info('Branch is up to date')
  } catch (error) {
    core.setFailed((error as Error).message)
  }
}

run()
