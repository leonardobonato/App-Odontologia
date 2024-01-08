import { useForm } from "react-hook-form"
import { useState } from "react"

function App() {

  const { register, handleSubmit, reset } = useForm()
  const [pacientes, setPacientes] = useState([]) //declarando um array de pacientes, é desse jeito
  const [emAtendimento, setEmAtendimento] = useState("")

  function adicionaPaciente(data) {
    const pacientes2 = [...pacientes] //atribui para paciantes 2, todos os pacientes
    pacientes2.push(data.nome)        //acrescenta um novo paciente de último na fila
    setPacientes(pacientes2)          //altera a variável de estado
    reset({ nome: "" }) //depois que eu adicionar o paciente que quero, essa função reset vai esvaziar o input com o register "nome" pra eu poder adicionar outro sem ter que ficar apagando o nome anterior. Ela precisa ser declarada na variável do useForm
  }

  function atendePaciente() {
    if (pacientes.length == 0) {
      alert("Não há pacientes na fila de espera!") //se não tiver nenhum paciente na fila, ao clicar no botão atender, executa o alert, se não, executa a parte de baixo da função normal
      return //faz com que as ações de baixo não executem caso execute a ação de cima
    }
    const pacientes2 = [...pacientes] //atribui para variável auxiliar (pacientes2), todos os pacientes
    const atendido = pacientes2.shift() //tira dessa variável auxiliar o primeiro paciente
    setPacientes(pacientes2)  //atualiza a lista de pacientes, agora sem aquele primeiro paciente
    setEmAtendimento(atendido) //atualiza a variável de estado que está em atendimento

  }

  function adicionaUrgencia(data) {
    const pacientes2 = [...pacientes]
    pacientes2.unshift(data.nome)
    setPacientes(pacientes2)
    reset({ nome: "" })
  }
  

  //pacientes.map -> ele pega cada paciente e vai me devolver o paciente envolvido de uma li
  const listaPacientes = pacientes.map(paciente => (
    <li>{paciente}</li>
  ))

  return (
    <div className="container-fluid">
      <nav class="navbar bg-info">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img src="./logo.png" alt="Logo" width="50" height="40" class="d-inline-block me-3" />Consultório Odontológico</a>
        </div>
      </nav>
      <div class="card text-center mt-3 w-75 mx-auto">
        <div class="card-header">
          <img src="./principal.png" alt="principal" width={200} />
          <h4>Controle de atendimentos</h4>
        </div>
        <div class="card-body" >

          <form className="row" onSubmit={handleSubmit(adicionaPaciente)}>

            <div className="col">
              <input type="text" class="form-control" placeholder="Nome do paciente" required {...register("nome")} />
            </div>

            <div className="col">

              <button type="submit" className="btn btn-primary me-2">Adicionar</button>
              <button type="button" className="btn btn-danger me-2" onClick={handleSubmit(adicionaUrgencia)}>Urgência</button >
              <button type="button" className="btn btn-success" onClick={atendePaciente}>Atender</button>

            </div>

          </form>
          <h4 className="mt-3 text-start">Pacientes na fila de espera: </h4>
          <ol className="text-start fs-2 mt-3">
            {listaPacientes}
          </ol>

        </div>
        <div class="card-footer text-body-secondary">
          <h4 className="text-start">Paciente em atendimento: <span className="text-success">{emAtendimento}</span></h4>
        </div>
      </div>
    </div>

  )
}

export default App