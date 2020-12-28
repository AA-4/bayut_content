const { cli, sh, help } = require('tasksfile');
const dargs = require('dargs');

const config = require('./config');

const verifyApp = app => {
    if (!config.apps.includes(app)) {
        throw new Error(`Command Failed: Incorrect app
        
        Usage: 
            yarn build [app] [stage]
            app: ${config.apps.join(' | ')}`);
    }
};

const verifyStage = stage => {
    if (!config.stages.includes(stage)) {
        throw new Error(`Command Failed: Incorrect stage
        
        Usage: 
            yarn build [app] [stage]
            stage: ${config.stages.join(' | ')}`);
    }
};

// Build
const buildCommand = (options, app, stage) => {
    verifyApp(app);

    verifyStage(stage);

    const cliArgs = dargs(options);
    let environment = '';

    if (stage && app) {
        environment = `env-cmd -f .env.${app}.${stage}`;
    } else {
        console.log('Building according to local .env file'); // eslint-disable-line no-console
    }

    return `${environment} gatsby build --prefix-paths ${cliArgs.join(' ')}`;
};

const build = (options, app, stage) => {
    //if (stage === 'prod') sh('gatsby clean');
    sh(buildCommand(options, app, stage), { nopipe: true });
};

help(
    build,
    `Creates build in /public folder. Uses .current env file if no parameters are specified.

        app: ${config.apps.join(' | ')}
        stage: ${config.stages.join(' | ')}
        
        Options: All arguments supported by gatsby-build command`,
    {
        params: ['app', 'stage'],
        examples: `yarn build buildings dev`,
    },
);

cli(build);
