
const fs = require('fs');
const path = require('path');
const geojsonseg = require('geojson-seg');
const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}
const loadData = (path) => {
  try {
    return fs.readFileSync(path, 'utf8')
  } catch (err) {
    console.error(err)
    return false
  }
}
const dataKey = 'country_road'
const filePath = path.resolve(__dirname, `inputData/${dataKey}.json`);
const jsonstr = loadData(filePath);
const data = JSON.parse(jsonstr);

const coordinateCount = 50000;
const geojsons = geojsonseg.seg(data, coordinateCount);
geojsons.map((geojson, idx) => {
  const outDir = path.resolve(__dirname, `outData/${dataKey}`);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outPath = path.resolve(outDir, `${idx}.json`);
  storeData(geojson, outPath)
})