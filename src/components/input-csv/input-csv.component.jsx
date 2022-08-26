import Papa from 'papaparse';
import './input-csv.styles.scss';

export default function InputCSV({ setJsonDataSet }) {
  const csvToJson = data => {
    let keys = [],
      json = [];
    for (let i = 0; i < data[0].length; i++) {
      keys.push(data[0][i]);
    }
    for (let i = 1; i < data.length - 1; i++) {
      let obj = {};
      for (let j = 0; j < keys.length; j++) {
        obj[keys[j]] = data[i][j];
      }
      json.push(obj);
    }
    console.log(json);
    setJsonDataSet(json);
  };
  const handleSubmit = e => {
    e.preventDefault();
    const files = e.target.children[0].files;
    if (files) {
      Papa.parse(files[0], {
        complete: function(results) {
          csvToJson(results.data);
          e.target.children[0].value = '';
        }
      });
    }
  };
  return (
    <div className='inputCSV'>
      <label>Choose CSV file</label>
      <form onSubmit={handleSubmit}>
        <input type='file' accept='.csv,.xlsx,.xls' />
        <button>Upload</button>
      </form>
    </div>
  );
}
