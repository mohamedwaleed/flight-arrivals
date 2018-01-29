class CsvService {

    constructor() {
      'ngInject';
    }

    parseCsvData(data) {
      let parsedData = {}; // array of objects
      let lines = data.split('\n');
      for(let i = 1 ; i < lines.length; i ++ ) {
        let line = lines[i];
        if(!line){
          continue;
        }
        let fields = line.split(',');
        let origin = fields[1].trim().substring(1, fields[1].trim().length - 1);
        let dest = fields[2].trim().substring(1, fields[2].trim().length - 1);
        let departureTime = fields[3].trim().substring(1, 3) + ':' + fields[3].trim().substring(3, fields[3].trim().length - 1);
        let arrivalTime = fields[4].trim().substring(1, 3) + ':' + fields[4].trim().substring(3, fields[4].trim().length - 1);
        if(fields[5] === ''){
          fields[5] = '0.0';
        }
        let flightObject = {
          date: fields[0],
          origin: origin,
          dest: dest,
          departureTime: departureTime,
          arrivalTime: arrivalTime,
          arrivalDelay: parseFloat(fields[5]),
          elapsedTime: parseFloat(fields[6]),
          distance: parseFloat(fields[7])
        };
        if(parsedData[flightObject.origin] === undefined){
          parsedData[flightObject.origin] = [flightObject];
        }else {
          parsedData[flightObject.origin].push(flightObject);
        }
      }
      return parsedData;
    }

}

export default CsvService;