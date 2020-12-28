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
    if (stage === 'dev') {
        throw new Error(`Command Failed: dev stage not allowed for deployment`);
    }
};

const deployCommand = (options, app, stage) => {
    verifyApp(app);

    verifyStage(stage);

    const cliArgs = dargs(options);
    let environment = '';

    if (stage && app) {
        environment = `env-cmd -f .env.${app}.${stage}`;
    } else {
        console.log('Building according to local .env file'); // eslint-disable-line no-console
    }

    return `${environment} gatsby-plugin-s3 deploy --yes ${cliArgs.join(' ')}`;
};

const deploy = (options, app, stage) => {
    sh(deployCommand(options, app, stage), { nopipe: true });
};

help(
    deploy,
    `Deploys the build in /public folder to S3 bucket. Uses .current env file if no parameters are specified.

        app: ${config.apps.join(' | ')}
        stage: ${config.stages.join(' | ')}
        
        Options: All arguments supported by gatsby-build command`,
    {
        params: ['app', 'stage'],
        examples: `yarn deploy buildings prod`,
    },
);

cli(deploy);
