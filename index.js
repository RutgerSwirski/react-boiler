#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import { execa } from "execa";
import { writeFileSync } from "fs";
import { join } from "path";

const program = new Command();

program.version("1.0.0").description("React app scaffolding tool");

// Function to prompt user for options
async function promptUser() {
  return inquirer.prompt([
    {
      type: "confirm",
      name: "installTailwind",
      message: "Install TailwindCSS?",
      default: true,
    },
    {
      type: "confirm",
      name: "installReactQuery",
      message: "Install React Query?",
      default: true,
    },
    {
      type: "confirm",
      name: "installAxios",
      message: "Install Axios?",
      default: true,
    },
    {
      type: "confirm",
      name: "installReactRouter",
      message: "Install React Router?",
      default: true,
    },
    {
      type: "confirm",
      name: "installJotai",
      message: "Install Jotai?",
      default: true,
    },
    {
      type: "confirm",
      name: "installDevtools",
      message: "Install Devtools for React and React Query?",
      default: true,
    },
    {
      type: "confirm",
      name: "installPrettier",
      message: "Install Prettier?",
      default: true,
    },
  ]);
}

// Function to create React app with Vite
async function createReactApp(projectName) {
  await execa("npm", ["create", "vite@latest", projectName], {
    stdio: "inherit",
  });
}

// Function to change directory to the project path
function changeDirectory(projectName) {
  const projectPath = join(process.cwd(), projectName);
  process.chdir(projectPath);
  return projectPath;
}

// Function to install dependencies
async function installDependencies(dependencies) {
  for (const { name, args, successMessage } of dependencies) {
    console.log(`Installing ${name}...`);
    await execa("npm", args, { stdio: "inherit" });
    console.log(successMessage);
  }
}

// Function to configure TailwindCSS
function configureTailwindCSS(projectPath) {
  console.log("Configuring TailwindCSS...");
  writeFileSync(
    join(projectPath, "tailwind.config.js"),
    `module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: { extend: {} },
    plugins: [],
  };`
  );

  writeFileSync(
    join(projectPath, "src", "index.css"),
    `@tailwind base;
   @tailwind components;
   @tailwind utilities;`
  );

  console.log("TailwindCSS configured successfully!");
}

// Function to install and configure Prettier
async function configurePrettier(projectPath) {
  console.log("Installing Prettier...");
  await execa(
    "npm",
    [
      "install",
      "--save-dev",
      "prettier",
      "eslint-config-prettier",
      "eslint-plugin-prettier",
    ],
    { stdio: "inherit" }
  );

  writeFileSync(
    join(projectPath, ".prettierrc"),
    `{
    "semi": false,
    "singleQuote": true,
    "tabWidth": 2,
    "useTabs": false
  }`
  );

  writeFileSync(join(projectPath, ".prettierignore"), "node_modules/dist/");

  console.log("Prettier configuration complete!");
  console.log("Formatting project files with Prettier...");
  await execa(
    "npx",
    ["prettier", "--write", "**/*.{js,jsx,ts,tsx,json,css,md}"],
    { stdio: "inherit" }
  );
  console.log("Project files formatted with Prettier!");
}

// Main action for the "create" command
program
  .command("create <project-name>")
  .description("Create a new react app")
  .action(async (projectName) => {
    try {
      const options = await promptUser();
      await createReactApp(projectName);
      const projectPath = changeDirectory(projectName);

      const dependencies = [
        {
          name: "TailwindCSS",
          args: ["install", "tailwindcss", "postcss", "autoprefixer"],
          successMessage: "TailwindCSS installed successfully!",
        },
        {
          name: "React Query",
          args: ["install", "@tanstack/react-query"],
          successMessage: "React Query installed successfully!",
        },
        {
          name: "Axios",
          args: ["install", "axios"],
          successMessage: "Axios installed successfully!",
        },
        {
          name: "React Router",
          args: ["install", "react-router-dom"],
          successMessage: "React Router installed successfully!",
        },
        {
          name: "Jotai",
          args: ["install", "jotai"],
          successMessage: "Jotai installed successfully!",
        },
        {
          name: "React Devtools and React Query Devtools",
          args: ["install", "react-devtools", "@tanstack/react-query-devtools"],
          successMessage:
            "React Devtools and React Query Devtools installed successfully!",
        },
      ];

      const toInstall = dependencies.filter(
        (dep) => options[`install${dep.name.replace(/[^A-Za-z]/g, "")}`]
      );
      await installDependencies(toInstall);

      if (options.installTailwind) {
        configureTailwindCSS(projectPath);
      }

      if (options.installPrettier) {
        await configurePrettier(projectPath);
      }

      console.log("Project created successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  });

program.parse(process.argv);
