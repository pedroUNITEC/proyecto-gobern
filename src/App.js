import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios'

function App() {
  return (
    <div class="App">
      <form class="form-container">
        <h2>Reportar Problema</h2>
        <label for="radio-button-container" class="form-label">Tipo</label>
        <div class="radio-button-container">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="radio-type" id="bug" value="bug"/>
            <label class="form-check-label" for="bug">
              Bug
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="radio-type" id="funcionalidad" value="feature" />
            <label class="form-check-label" for="funcionalidad">
              Funcionalidad
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="radio-type" id="soporte" value="support" />
            <label class="form-check-label" for="soporte">
              Soporte
            </label>
          </div>
        </div>
        <div>
          <label for="asunto" class="form-label">Asunto</label>
          <textarea id="asunto" class="form-control" placeholder="Describa aquí su problema" required/>
        </div>
        <button type="submit" class="upload-button btn btn-primary">Reportar</button>
      </form>
    </div>
  );
}

export default App;
