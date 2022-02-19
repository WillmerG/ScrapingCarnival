const { writeFile } = require('fs');

module.exports = async (dir, data) => {

  // await writeFile(path.join(path.resolve(__dirname, '../assets'), `/${website.name}.json`), JSON.stringify(cruise), (err) => {
  await writeFile(dir, data, (err) => {
      if (err) {
        console.error('Generando JSON', err);
        return;
      }

      console.log('Datos Generados');
  })
};
