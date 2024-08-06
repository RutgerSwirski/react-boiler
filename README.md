# React Boiler CLI

A CLI tool for quickly scaffolding React projects with Vite, TypeScript, Tailwind CSS, React Query, Jotai, and Prettier integration.

## Features

- Create new React projects using Vite
- Optionally use TypeScript
- Install Tailwind CSS, React Query, and Jotai
- Automatically set up Prettier with default configuration

## Installation

To use the React Boiler CLI, follow these steps:

### Clone the Repository:

\```
git clone https://github.com/rutgerswirski/react-boiler.git
\```

### Navigate to the Project Directory:

\```
cd react-boiler
\```

### Install Dependencies:

\```
npm install
\```

### Link the CLI Tool Globally:

\```
npm link
\```

This will make the `react-boiler` command available globally on your system.

## Usage

To create a new React project using the CLI, run:

\```
react-boiler create <project-name>
\```

You will be prompted to configure the following options:

- **Use TypeScript?**: Choose whether to use TypeScript or not.
- **Install Tailwind CSS?**: Decide if you want Tailwind CSS installed.
- **Install React Query?**: Choose whether to include React Query.
- **Install Jotai?**: Decide if you want to include Jotai for state management.
- **Install Prettier?**: Choose whether to set up Prettier for code formatting.

### Example

To create a new project named `my-react-app` with TypeScript, Tailwind CSS, React Query, Jotai, and Prettier, run:

\```
react-boiler create my-react-app
\```

After the CLI finishes, navigate to your new project directory and start developing:

\```
cd my-react-app
npm install
npm run dev
\```

## Configuration

- **TypeScript**: Set up with the `react-ts` template if chosen.
- **Tailwind CSS**: Configured with a basic setup and `.css` imports.
- **React Query**: Installed and ready for use.
- **Jotai**: Installed for state management.
- **Prettier**: Configured with a `.prettierrc` file and `.prettierignore`.

## Contributing

- **Fork the Repository**: Click the "Fork" button on the repository page.

### Clone Your Fork:

\```
git clone https://github.com/rutgerswirski/react-boiler.git
\```

### Create a Branch:

\```
git checkout -b feature/your-feature
\```

### Make Changes and Commit:

\```
git add .
git commit -m "Add your message here"
\```

### Push to Your Fork:

\```
git push origin feature/your-feature
\```

- **Submit a Pull Request**: Open a pull request on GitHub to merge your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
