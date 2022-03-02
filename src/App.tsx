import TextField from "./components/TextField";

function App() {
  return (
    <div>
      <h2>Componente "TextField" com mascaras customizáveis</h2>
      <ol>
        <li>Sem mascara: <TextField name="my-input-01" /> </li>
        <li>Marcara de CPF: <TextField name="my-input-01" maskType="cpf" /> </li>
        <li>Marcara de CNPJ: <TextField name="my-input-02" maskType="cnpj" /> </li>
        <li>Marcara de CPF/CNPJ: <TextField name="my-input-03" maskType="cpf_cnpj" /> </li>
        <li>Marcara de CEP: <TextField name="my-input-04" maskType="cep" /> </li>
        <li>Marcara de DATA: <TextField name="my-input-05" maskType="date" /> </li>
        <li>Marcara de CELULAR: <TextField name="my-input-06" maskType="phone" /> </li>
        <li>Marcara de TELEFONE FIXO: <TextField name="my-input-07" maskType="landlineTelephone" /> </li>
        <li>Marcara de MOEDA REAL: <TextField name="my-input-08" maskType="money" /> </li>
        <li>Marcara de APENAS LETRAS: <TextField name="my-input-09" maskType="onlyLetters" /> </li>
        <li>Marcara de APENAS NUMEROS: <TextField name="my-input-10" maskType="onlyNumbers" /> </li>
      </ol>
    </div>
  );
}

export default App;
