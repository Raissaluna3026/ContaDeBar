
import React, {useState} from 'react';

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({children, onClick}){
  return <button className="button" onClick={onClick}>{children}</button>

}

export default function App(){
  const [amigoSelecionado, setAmigoSelecionado] = useState(null)
  const [amigos,setAmigos] = useState(initialFriends);
  const [mostrarAdcAmigos, setMostrarAdcAmigos] = useState(false);

  function handleMostrarAdcAmigos(){
    setMostrarAdcAmigos((mostrar) => !mostrar);
  }

  function handleAdcAmigo(amigo){
    setAmigos((amigos) => [...amigos, amigo]);
  }

  function handleSelecao(amigo){
    setAmigoSelecionado((cur) => cur?.id === amigo.id ? null : amigo)
  }

  return(
    <div className="app">
      <div className="sidebar">
      <ListaAmigos amigos={amigos} onSelecao={handleSelecao} amigoSelecionado={amigoSelecionado}/>

      {mostrarAdcAmigos && <FormularioAdicionarMigo onAdcAmigo={handleAdcAmigo}/>}
      <Button onClick={handleMostrarAdcAmigos}>{mostrarAdcAmigos ? 'Close' : 'Add amigo'}</Button>

      </div>
      {/*//formulario de dividir conta so aparece qnd o amigo for selecionado*/}
      {amigoSelecionado && <FormularioDividirConta amigoSelecionado={amigoSelecionado}/>} 
      
    </div>
  )
}

function ListaAmigos({amigos, onSelecao, amigoSelecionado}){
  

  return(
    <ul>
      {amigos.map((amigo) => (
        <Amigo amigo={amigo} key={amigo.id} onSelecao={onSelecao} amigoSelecionado={amigoSelecionado}/>
      ))}
    </ul>
  )
}

function Amigo({amigo, onSelecao, amigoSelecionado}){
  const estaSelecionado = amigoSelecionado?.id === amigo.id;
  
  return (
  <li className={estaSelecionado ? "selected" : ""}>
    <img src={amigo.image} alt={amigo.name}/>
    <h3>{amigo.name}</h3>
    {amigo.balance < 0 && (
      <p className="red">
        Você deve R${Math.abs(amigo.balance)} para {amigo.name}!
      </p>
    )}
    {amigo.balance > 0 && (
      <p className="green">
        {amigo.name} deve R${Math.abs(amigo.balance)} para você!
      </p>
    )}
    {amigo.balance === 0 && <p>Você e {amigo.name} estão quites!</p>}

    <Button onClick={() => onSelecao(amigo)}>Selecionar</Button>

  </li>)
}



function FormularioAdicionarMigo({onAdcAmigo}){
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e){
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const novoAmigo ={
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,      
    }

    onAdcAmigo(novoAmigo);
    
    setName('');
    setImage('https://i.pravatar.cc/48'); 
  }

  return(
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Nome do amigo </label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

      <label>🏞️ Imagem</label>
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />

      <Button>Add</Button>
    </form>
  )
}



function FormularioDividirConta({amigoSelecionado}){
  return(
    <form className="form-split-bill">
      <h2>Dividir a conta com {amigoSelecionado.name}</h2>

      <label>💰 Valor da conta</label>
      <input type="text"/>
      <label>💰 Sua despesa</label>
      <input type="text"/>
      <label>💰 Despesa de {amigoSelecionado.name} </label>
      <input type="text"/>

      <label>❓Quem esta pagando a conta?</label>
      <select>
        <option value='user'>Você</option>
        <option value='friend'>{amigoSelecionado.name}</option>
      </select>

      <Button>Dividir conta</Button>
    </form>  
  )
}