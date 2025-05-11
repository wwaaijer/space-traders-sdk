const fs = require('fs/promises');
const path = require('path');

const version = process.argv[2];

// URL taken from the SpaceTraders API documentation
const openApiDocUrl = version === 'staging' ? 'https://api.staging.spacetraders.io/v2/documentation/json' : 'https://api.spacetraders.io/v2/documentation/json';
const openApiDocPath = './tmp/openapi-spec.json';

(async () => {
  const response = await fetch(openApiDocUrl);
  const content = await response.json();

  await fs.mkdir(path.dirname(openApiDocPath), { recursive: true });
  await fs.writeFile(openApiDocPath, JSON.stringify(content, null, 2));
})();
