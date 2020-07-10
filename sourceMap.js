const sourceMap = require('source-map');
const fs = require('fs');

fs.readFile('./sourcemap.android.js', 'utf8', async function (err, data) {

    const whatever = await sourceMap.SourceMapConsumer.with(data, null, consumer => {
        console.log(consumer.sources);

        console.log(
          consumer.originalPositionFor({
            line: 512,
            column: 973
          })
        );

        consumer.eachMapping(function(m) {
          // ...
        });

        return computeWhatever();
      });

});


