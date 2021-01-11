const fs = require('fs');
const { parse } = require('path');



const readTxt = async (path) => {
    /*
    @function : reads txt and returns array of values
    @params :
        path : path-to-.txt.
    */
    console.log('----READING FILE----')

    let data = fs.readFileSync(path, 'utf8')
    if (!data) throw new Error('cannot process file');

    console.log('----READ FILE COMPLETE----')

    let dataArray = data.split(/\r\n|\n/);
    return dataArray;
}

const writeTxt = (output, data) => {
    /*
    @function : writes txt to file
    @params :
        output : path-to-.txt.
    */
    fs.writeFile(output, data, (err) => {
        if (err) throw new Error('cannot write file');

        console.log('----DONE----')
    })
}


const mapAndCalculate = (data_array) => {
    let resultArray = [];
    data_array.map((line, index) => {
        if (index % 2 !== 0 && index !== 0) {
            let tempRes = []
            let int = data_array[--index]
            let nums = line.split(' ');
            nums.forEach(num => {

                switch (nums.indexOf(num)) {
                    case 0:
                        int *= parseInt(num)
                        break;

                    case 1:
                        int += parseInt(num)
                        break;

                    case 2:
                        int /= parseInt(num)
                        break;

                    default:
                        console.log('ARRAY LENGTH EXCEEDS 3')
                        break;
                }
            });
            resultArray.push(int.toFixed(4))
        }
        return resultArray
    })

    return resultArray.join('\n')
}

const App = async (input, output) => {
    let txt_content = await readTxt(input);
    let calc_result = mapAndCalculate(txt_content);
    writeTxt(output, calc_result);
}

App('./input_file.txt', './output_file.txt');