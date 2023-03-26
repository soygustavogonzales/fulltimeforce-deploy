var {Octokit} = require('octokit');

const octokit = new Octokit({ 
    auth: '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',
});

module.exports = octokit;