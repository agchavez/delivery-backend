/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  roots: [
    './test',
  ],
  testEnvironment: 'node',
  moduleFileExtensions: [
    "ts",
    "js"
],
};