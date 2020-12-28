const { cli, sh, help } = require('tasksfile');
const dargs = require('dargs');

const config = require('./config');

const verifyApp = app => {
    if (!config.apps.includes(app)) {
        throw new Error(`Command Failed: Incorrect app
        
        Usage: 
            yarn serve [app]
            app: ${config.apps.join(' | ')}`);
    }
};

// Build
const buildCommand = (options, app) => {
    verifyApp(app);

    const cliArgs = dargs(options);
    let environment = '';

    if (app) {
        environment = `env-cmd -f .env.${app}.dev`;
    } else {
        console.log('Serving according to local .env file'); // eslint-disable-line no-console
    }

    return `${environment} gatsby serve ${cliArgs.join(' ')}`;
};

const serve = (options, app) => {
    sh(buildCommand(options, app), { nopipe: true });
};

help(
    serve,
    `Serves the build in /public folder. Uses .current env file if no parameters are specified.

        app: ${config.apps.join(' | ')}
        stage: ${config.stages.join(' | ')}
        
        Options: All arguments supported by gatsby-build command`,
    {
        params: ['app', 'stage'],
        examples: `yarn serve buildings`,
    },
);

cli(serve);
