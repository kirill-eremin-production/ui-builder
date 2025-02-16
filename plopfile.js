module.exports = (plop) => {
    plop.setGenerator('component', {
        description: 'Create a component',
        // User input prompts provided as arguments to the template
        prompts: [
            {
                // Raw text input
                type: 'input',
                // Variable name for this input
                name: 'name',
                // Prompt to display on command line
                message: 'What is your component name?',
            },
        ],
        actions: [
            {
                // Add a new file
                type: 'add',
                // Path for the new file
                path: 'plop-gen/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
                // Handlebars template used to generate content of new file
                templateFile: 'plop-templates/component/Component.js.hbs',
            },
            {
                // Add a new file
                type: 'add',
                // Path for the new file
                path: 'plop-gen/components/{{pascalCase name}}/{{pascalCase name}}.localization.ts',
                // Handlebars template used to generate content of new file
                templateFile:
                    'plop-templates/component/Component.localization.js.hbs',
            },
            {
                // Add a new file
                type: 'add',
                // Path for the new file
                path: 'plop-gen/components/{{pascalCase name}}/{{pascalCase name}}.module.css',
            },
            {
                // Add a new file
                type: 'add',
                // Path for the new file
                path: 'plop-gen/components/{{pascalCase name}}/index.ts',
                templateFile: 'plop-templates/component/index.js.hbs',
            },
        ],
    });
};
