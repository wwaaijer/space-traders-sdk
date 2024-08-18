const fs = require('fs/promises');
const path = require('path');

// URL taken from the SpaceTraders API documentation
const openApiDocUrl = 'https://stoplight.io/api/v1/projects/spacetraders/spacetraders/nodes/reference/SpaceTraders.json?fromExportButton=true&snapshotType=http_service&deref=optimizedBundle';
const openApiDocPath = './tmp/openapi-spec.json';

(async () => {
  const response = await fetch(openApiDocUrl);
  const content = await response.json();

  await fs.mkdir(path.dirname(openApiDocPath), { recursive: true });
  await fs.writeFile(openApiDocPath, JSON.stringify(content, null, 2));
})();
