const fs = require('fs/promises');
const path = require('path');

const version = process.argv[2];

// URL taken from the SpaceTraders API documentation
const openApiDocUrl = version === 'staging' ? 'https://api.staging.spacetraders.io/v2/documentation/json' : 'https://spacetraders.io/SpaceTraders.json';
const openApiDocPath = './tmp/openapi-spec.json';

(async () => {
  const response = await fetch(openApiDocUrl);
  const content = await response.json();

  await fs.mkdir(path.dirname(openApiDocPath), { recursive: true });


  content.components.schemas = Object.fromEntries(
    Object.entries(content.components.schemas)
      .sort(([aName], [bName]) => aName.localeCompare(bName))
  );
  content.paths = Object.fromEntries(
    Object.entries(content.paths)
      .sort(([aPath], [bPath]) => aPath.localeCompare(bPath))
      .map(([path, pathDefinition]) => [
        path,
        Object.fromEntries(Object.entries(pathDefinition)
            .sort(([aMethod], [bMethod]) => aMethod.localeCompare(bMethod))
        )
      ])
  );

  await fs.writeFile(openApiDocPath, JSON.stringify(content, null, 2));
})();
