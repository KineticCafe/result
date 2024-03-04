/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  entryPoints: ['src/index.ts'],
  excludeInternal: true,
  includeVersion: true,
  intentionallyNotExported: ['ErrorClass', 'InferErr', 'InferOk'],
  plugin: ['typedoc-material-theme'],
  sort: ['static-first', 'source-order'],
}
