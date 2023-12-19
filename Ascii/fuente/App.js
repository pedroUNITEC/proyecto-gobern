import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import { useState, useEffect } from 'react';
import swal from 'sweetalert2'
import Swal from 'sweetalert2';

function App() {

  const [asunto, setAsunto] = useState('');
  const [issueDesc, setIssueDesc] = useState('');

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch("http://localhost:3001/fetch-data", {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });

        const data = await response.json();
        console.dir(data)
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchIssues()
  }, [])


  const handleAsuntoChange = event => {
    setAsunto(event.target.value);
  }

  const handleDescChange = event => {
    setIssueDesc(event.target.value);
  }


  const UploadButton = () => {

    const handleSubmit = () => {
      try {
        const response = fetch("http://localhost:3001/submit-issue", {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            issue: {
              project_id: 21,
              subject: asunto,
              description: issueDesc,
            }
          })
        });

        const responseData = response;
        console.log(responseData);

        Swal.fire({
          title: 'Éxito',
          text: 'Solicitud exitosamente enviada',
          icon: 'success',
          confirmButtonText: 'Okay!'
        });

      } catch (error) {
        console.error('Fetch error:', error);

        Swal.fire({
          title: 'Error',
          text: 'Error al enviar solicitud',
          icon: 'error',
          confirmButtonText: 'Okay :('
        });

      } finally {
        setAsunto('')
        setIssueDesc('')
      }
    }

    return (
      <button type="button" className="upload-button btn btn-primary" onClick={handleSubmit}>
        Reportar
      </button>
    )
  }


  return (
    <div className="App">
      <form className="form-container">
        <h2>Reportar Problema</h2>
        <label htmlFor="asunto" className="form-label">Asunto</label>
        <div className="asunto-container">
          <input type='text' id="asunto" className="form-control" placeholder="Escriba aquí el problema"
            onChange={handleAsuntoChange} value={asunto} required />
          <textarea id="description" className="form-control" placeholder="Describa aquí su problema"
            onChange={handleDescChange} value={issueDesc} required />
        </div>
        <UploadButton />
      </form>
    </div>
  );
}

export default App;
