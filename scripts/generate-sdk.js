const openApiDoc = require('../tmp/openapi-spec.json');
const fs = require('fs');

// TODO:
// [ ] Are there settings to fine-tune for openapi-typescript?
//        Currently not even using the whole paths object/interface
//        Switch to the Node API of openapi-typescript and strip that whole section from the `ts.node[]` return value?
// [ ] Error throwing?
// [ ] Proper rate limiting?
// [ ] Auto generate the method overview in the README?
// [ ] Use ts.nodes like openapi-typescript does?
// [ ] Operation logging v.s. request logging? `onOperation` and `onResult`?
// [ ] `onError` option?

const output = [
  '/**',
  ' * This file was auto-generated by ../scripts/generate-sdk.js.',
  ' * Do not make direct changes to the file.',
  ' */',
  '',
  'import { BaseClient } from "./baseClient";',
  'import type { operations } from "./openapi-typescript-export";',
  'import type { SpaceTradersOptions } from "./types";',
  '',
  'export class SpaceTradersSdk {',
  '',
  '  private client: BaseClient;',
  '',
  '  constructor(options?: SpaceTradersOptions) {',
  '    this.client = new BaseClient(options);',
  '  }',
];

for (const [path, pathDefinition] of Object.entries(openApiDoc.paths)) {

  
  for (const [method, operationDefinition] of Object.entries(pathDefinition)) {
    if (method === 'parameters') {
      continue;
    }

    
    const operationId = operationDefinition.operationId;
    const operationName = kebabToCamel(operationId);
    const parameters = [];
    
    const parameterDefinition = [
      ...(pathDefinition.parameters || []),
      ...(operationDefinition.parameters || []),
    ];

    const pathParameters = (parameterDefinition || [])
      .filter(parameter => parameter.in === 'path');
    
    parameters.push(
      ...pathParameters.map(
        parameter => `${parameter.name}: operations['${operationId}']['parameters']['path']['${parameter.name}']`
      ),
    );

    // Determine if the operation has query parameters or a request body
    
    const hasQueryParameters = parameterDefinition && parameterDefinition.some(parameter => parameter.in === 'query');
    const hasRequestBody = !!operationDefinition.requestBody;

    if (hasQueryParameters && hasRequestBody) {
      throw new Error(`Both query parameters and request body for ${operationName}`);
    }

    if (hasQueryParameters) {
      parameters.push(`query?: operations['${operationId}']['parameters']['query']`);
    }

    if (hasRequestBody) {
      // Required<...> is needed for users with strict null checks enabled, otherwise chaining on the optional property 'requestBody' will resolve to 'any' for them 
      parameters.push(`requestBody: Required<operations['${operationId}']>['requestBody']['content']['application/json']`);
    }

    // Determine if the operation has a 200 or 201 response

    const has200Response = !!operationDefinition.responses['200'];
    const has201Response = !!operationDefinition.responses['201'];

    if (!has200Response && !has201Response) {
      throw new Error(`No 200 or 201 response for ${operationName}`);
    }

    const successResponseCode = has200Response ? '200' : '201';
    
    // Like the baseClient, figure out if the response is just an object with a data property, if so, we can return that directly
    const responseSchema = operationDefinition.responses?.[successResponseCode]?.content?.['application/json']?.schema;
    const responseKeys = Object.keys(responseSchema?.properties || {});
    const dataOnlyResponse = responseKeys.length === 1 && responseKeys[0] === 'data';

    let responseType = `operations['${operationId}']['responses']['${successResponseCode}']['content']['application/json']`;
    if (dataOnlyResponse) {
      responseType += '[\'data\']';
    }

    const comment = jsDocComment(operationDefinition);
    

    // Add the operation to the output
    output.push('');

    if (comment) {
      output.push(comment);
    }

    if (parameters.length === 0) {
      output.push(`  async ${operationName}(): Promise<${responseType}> {`)
    } else {
      output.push(
        `  async ${operationName}(`,
        `    ${parameters.join(',\n    ')}`,
        `  ): Promise<${responseType}> {`,
      );
    }

    output.push(
      '    return this.client.request({',
      `      method: '${method.toUpperCase()}',`,
      `      path: \`${path.replace(/\{/g, '${')}\`,`,
    );

    if (hasQueryParameters) {
      output.push(
        '      query,',
      );
    }

    if (hasRequestBody) {
      output.push(
        '      requestBody,',
      );
    }

    output.push(
      '    });',
      '  }',
    );
  }

}
output.push(
  '}',
  '',
);

fs.writeFileSync('./src/sdk.ts', output.join('\n'));

function kebabToCamel(kebab) {
  return kebab.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
}

/**
 * Copied and stripped from openapi-typescript, to regenerate the JSDoc comments for the generated methods
 */
function jsDocComment(operationDefinition) {
  const output = [];

  if (operationDefinition.title) {
    output.push(operationDefinition.title.replace(/\r?\n/g, "\n   *     "));
  }
  if (operationDefinition.summary) {
    output.push(operationDefinition.summary.replace(/\r?\n/g, "\n   *     "));
  }

  const supportedJsDocTags = ["deprecated", "description"];
  for (const field of supportedJsDocTags) {
    if (operationDefinition[field] === undefined) {
      continue;
    }
    output.push(`@${field} ${String(operationDefinition[field]).replace(/\r?\n/g, "\n   *     ")}`);
  }

  if (output.length) {
    let text = output.length === 1 ?
      ` ${output[0]} ` : `\n   * ${output.join("\n   * ")}\n   `;
    text = text.replace(/\*\//g, "*\\/"); // prevent inner comments from leaking

    return `  /**${text}*/`;
  }
}