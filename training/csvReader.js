    const csv = require('csv-parser');
    const fs = require('fs');
    const data = [];
    
    fs.createReadStream('../data/data.csv')
      .pipe(csv())
      .on('data', (row) => {
        data.push(row)
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        fs.writeFile('data.json', JSON.stringify(data), function (err) {
          if (err) throw err;
          console.log('Saved!');
        });
      });