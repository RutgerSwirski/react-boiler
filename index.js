#!/usr/bin/env node

// i am creating a scaffolding cli tool that will allow for fast react app creation

import { Command } from "commander";
import inquirer from "inquirer";
import { execa } from "execa";
import { writeFileSync } from "fs";
import { join } from "path";

const program = new Command();

program.version("1.0.0").description("React app scaffolding tool");

program
  .command("create <project-name>")
  .description("Create a new react app")
  .action(async (projectName) => {
    try {
      const {
        installTailwind,
        installReactQuery,
        installAxios,
        installReactRouter,
        installJotai,
        installReactDevtools,
        installPrettier,
      } = await inquirer.prompt([
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

      // create react app with vite
      await execa("npm", ["create", "vite@latest", projectName], {
        stdio: "inherit",
      });

      const projectPath = join(process.cwd(), projectName);
      process.chdir(projectPath);

      //install tailwind
      if (installTailwind) {
        console.log("Installing TailwindCSS...");
        await execa(
          "npm",
          ["install", "tailwindcss", "postcss", "autoprefixer"],
          { stdio: "inherit" }
        );
        await execa("npx", ["tailwindcss", "init", "-p"], { stdio: "inherit" });

        writeFileSync(
          join(projectPath, "tailwind.config.js"),
          `module.exports = {
                      content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
                      theme: {
                        extend: {},
                      },
                      plugins: [],
                    };`
        );

        writeFileSync(
          join(projectPath, "src", "index.css"),
          `@tailwind base;
           @tailwind components;
           @tailwind utilities;`
        );

        console.log("TailwindCSS installed successfully!");
      }

      // install react query
      if (installReactQuery) {
        console.log("Installing react-query...");
        await execa("npm", ["install", "@tanstack/react-query"], {
          stdio: "inherit",
        });
        console.log("React Query installed successfully!");
      }

      // install axios
      if (installAxios) {
        console.log("Installing axios...");
        await execa("npm", ["install", "axios"], { stdio: "inherit" });
        console.log("Axios installed successfully!");
      }

      // install react router
      if (installReactRouter) {
        console.log("Installing react-router-dom...");
        await execa("npm", ["install", "react-router-dom"], {
          stdio: "inherit",
        });
        console.log("React Router installed successfully!");
      }

      // install jotai
      if (installJotai) {
        console.log("Installing jotai...");
        await execa("npm", ["install", "jotai"], { stdio: "inherit" });
        console.log("Jotai installed successfully!");
      }

      // install react query devtools
      if (installReactDevtools) {
        console.log("Installing React Devtools and React Query Devtools...");
        await execa(
          "npm",
          ["install", "react-devtools", "@tanstack/react-query-devtools"],
          { stdio: "inherit" }
        );
        console.log(
          "React Devtools and React Query Devtools installed successfully!"
        );
      }

      // Install Prettier
      if (installPrettier) {
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

        // Create .prettierignore file
        writeFileSync(
          join(projectPath, ".prettierignore"),
          `node_modules/dist/`
        );

        console.log("Prettier configuration complete!");

        // Format the project files with Prettier
        console.log("Formatting project files with Prettier...");
        await execa(
          "npx",
          ["prettier", "--write", "**/*.{js,jsx,ts,tsx,json,css,md}"],
          { stdio: "inherit" }
        );
        console.log("Project files formatted with Prettier!");
      }

      // delete unnecessary files
      console.log("Deleting unnecessary files...");
      await execa("rm", ["-rf", "src/logo.svg", "src/App.css"], {
        stdio: "inherit",
      });
      console.log("Unnecessary files deleted!");

      console.log("Project created successfully!");
    } catch (error) {
      console.error(error);
    }
  });

program.parse(process.argv);
