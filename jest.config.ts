// jest.config.ts
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  coverageDirectory: "coverage",
  collectCoverage: true,
  testPathIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}", // Specify the directories and file extensions to collect coverage from
    "!src/**/*.d.ts", // Exclude TypeScript declaration files
    "!src/**/*.interface.ts", // Exclude TypeScript interface files
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  coverageReporters: ["text-summary", "lcov"],
  setupFiles: ["<rootDir>/setupTests.ts"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1" // Adjust this if you use path aliases
  }
};

export default config;