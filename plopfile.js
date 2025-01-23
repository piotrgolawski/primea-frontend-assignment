module.exports = function (plop) {
    plop.setHelper('getComponentName', function () {
        const args = process.argv;

        const nameArg = args.find(arg => arg.startsWith('--name='));

        if (nameArg) {
            const componentName = nameArg.split('=')[1];
            return componentName.charAt(0).toUpperCase() + componentName.slice(1);
        }

        return 'DefaultComponent';
    });

    plop.setGenerator('component', {
        description: 'Generate a new React component',
        prompts: [],
        actions: [
            {
                type: 'add',
                path: 'src/components/{{getComponentName}}/{{getComponentName}}.tsx', // PascalCase used here
                templateFile: 'plop-templates/Component.tsx.hbs',
            },
            {
                type: 'add',
                path: 'src/components/{{getComponentName}}/{{getComponentName}}.test.tsx', // Jest test file
                templateFile: 'plop-templates/Component.test.tsx.hbs',
            },
        ],
    });
};

module.exports = function (plop) {
    plop.setHelper('getHookName', function () {
        const args = process.argv;
        const nameArg = args.find(arg => arg.startsWith('--name='));

        if (nameArg) {
            const hookName = nameArg.split('=')[1];
            return hookName.charAt(0).toUpperCase() + hookName.slice(1);
        }

        return 'DefaultHook';
    });

    plop.setGenerator('hook', {
        description: 'Generate a new React hook',
        prompts: [],
        actions: [
            {
                type: 'add',
                path: 'src/hooks/use{{getHookName}}.ts',
                templateFile: 'plop-templates/useCustomHook.ts.hbs',
            }
        ],
    });
};
