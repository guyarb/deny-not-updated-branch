import * as core from '@actions/core'
import {context, getOctokit} from '@actions/github'

async function run(): Promise<void> {
  try {
    const token: string = core.getInput('github-token', {required: true})
    const github = getOctokit(token, {})

    if (context.eventName !== 'pull_request') {
      core.info('Action is available only for pull request.')
      return
    }
    const state = await github.pulls.get({
      pull_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo
    })
    if (['behind', 'dirty'].includes(state.data.mergeable_state)) {
      core.setFailed('You are not up to date')
    }
    core.info('Branch is up to date')
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
