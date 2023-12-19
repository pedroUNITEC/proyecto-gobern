import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [asunto, setAsunto] = useState('');
  const [description, setDescription] = useState('');
  const [issueType, setIssueType] = useState('Bug')


  useEffect(() => {
    const fetchIssues = () => {
      fetch("http://localhost:3001/fetchData",
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        .then((res) => console.log(res.json()))
        .catch((err) => {
          console.log(err.message);
        }
        );
    }
    fetchIssues()
  }, [])


  const handleAsuntoChange = event => {
    setAsunto(event.target.value);
  }

  const handleDescChange = event => {
    setDescription(event.target.value);
  }

  const handleTypeChange = event => {
    setIssueType(event.target.value)
  }

  const UploadButton = () => {
    const handleSubmit = () => {
      fetch("http://localhost:3001/submit-issue", {
        method: 'POST',
        body: JSON.stringify({
          issue: {
            subject: asunto,
            description: description,
            name: issueType,
          }
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Submitted:', data);
        })
        .catch((err) => {
          console.error('Error', err.message);
        });
    }
    return (
      <button type="submit" class="upload-button btn btn-primary"
        onClick={handleSubmit}>Reportar
      </button>
    )
  }


  return (
    <div class="App">
      <form class="form-container">
        <h2>Reportar Problema</h2>
        <label for="radio-button-container" class="form-label">Tipo</label>
        <div class="radio-button-container">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="radio-type" id="bug" value="Bug"
              onChange={handleTypeChange} />
            <label class="form-check-label" htmlFor="bug">
              Bug
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="radio-type" id="funcionalidad"
              value="Feature" onChange={handleTypeChange} />
            <label class="form-check-label" htmlFor="funcionalidad">
              Funcionalidad
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="radio-type" id="soporte" value="Support"
              onChange={handleTypeChange} />
            <label class="form-check-label" htmlFor="soporte">
              Soporte
            </label>
          </div>
        </div>
        <label for="asunto" class="form-label">Asunto</label>
        <div class="asunto-container">
          <input type='text' id="asunto" class="form-control" placeholder="Escriba aquí el problema"
            onChange={handleAsuntoChange} required />
          <textarea id="description" class="form-control" placeholder="Describa aquí su problema"
            onChange={handleDescChange} required />
        </div>
        <UploadButton />
      </form>
    </div>
  );
}

export default App;
