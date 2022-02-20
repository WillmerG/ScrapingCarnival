const { writeFile } = require('fs');

module.exports = async (dir, data) => {

  await writeFile(dir, data, (err) => {
    if (err) {
      console.error('Generando JSON', err);
      return;
    }

    console.log('Datos Generados:', dir);
  })
};
