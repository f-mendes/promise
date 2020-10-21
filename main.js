/*Crie uma função que recebe a idade de um usuário e retorna uma Promise que depois de 2
segundos retornará se usuário é maior ou não que 18 anos. Se o usuário ter mais que 18 anos de
idade o resultado deve cair no .then, caso contrário, no .catch*/

function checaIdade(idade) {
    return new Promise((resolve, reject) => {
      if(idade > 18){      
        setTimeout(() =>  resolve(), 2000);
        return;
      }

      setTimeout(() =>  reject(), 2000);
    });
 }

 checaIdade(15)
  .then(() => {
    console.log("Maior que 18");
  })
  .catch(() => {
    console.log("Menor que 18");
  });

  /**Crie uma tela com um <input> que deve receber o nome de um usuário no Github. Após digitar o
nome do usuário e clicar no botão buscar a aplicação deve buscar pela API do Github (conforme
URL abaixo) os dados de repositórios do usuário e mostrá-los em tela: */

const ul = document.querySelector('#app ul');
const button = document.querySelector('#app button');
const input = document.querySelector('#app input');

function setList(value){
  const li = document.createElement('li');
  const text = document.createTextNode(value);

  li.appendChild(text);
  ul.appendChild(li);
}

function setRepos(repos){
    // for(repo of repos ) {}
    //repos.map(repo => {})
    repos.forEach(repo => {
      setList(repo.name)
    });
}

function getUserGithub(){
    ul.innerHTML = '';
    setList('Carregando...');
    const usr = input.value;

    axios.get('https://api.github.com/users/'+usr+'/repos')
    .then((response) => {
        setTimeout(() => {
          ul.innerHTML = '';
          setRepos(response.data);
        },1000);
        
    })
    .catch(function (error) {
      console.error(error.message);
      if(error.message === 'Request failed with status code 404'){
        ul.innerHTML = '';
        setList('Usuário não encontrado');
      }
    })
 }

button.onclick = getUserGithub;
 