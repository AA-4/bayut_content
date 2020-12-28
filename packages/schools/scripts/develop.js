const { cli, sh, help } = require('tasksfile');
const dargs = require('dargs');

const config = require('./config');


const buildCommand = (options, app) => {
    app ='schools';
    const cliArgs = dargs(options);
    let environment = '';

    if (app) {
        environment = `env-cmd -f .env.${app}.dev`;
    } else {
        console.log('Building according to local .env file'); // eslint-disable-line no-console
    }

    return `${environment} gatsby develop ${cliArgs.join(' ')}`;
};

const develop = (options, app) => {
    sh(buildCommand(options, app), { nopipe: true });
};

help(
    develop,
    `Creates build in /public folder. Uses .current env file if no parameters are specified.

        app: ${config.apps.join(' | ')}
        stage: ${config.stages.join(' | ')}
        
        Options: All arguments supported by gatsby-build command`,
    {
        params: ['app', 'stage'],
        examples: `yarn develop buildings`,
    },
);
cli(develop);
