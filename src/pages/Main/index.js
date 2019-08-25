import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import api from '../../services/api';
import Container from '../../components/Container/index';
import { Form, SubmitButton, List, ErrorMessage, LinkButton } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
    errorMessage: '',
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) this.setState({ repositories: JSON.parse(repositories) });
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories)
      localStorage.setItem('repositories', JSON.stringify(repositories));
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value, error: false, errorMessage: '' });
  };

  handleSubmit = async e => {
    try {
      e.preventDefault();

      this.setState({
        loading: true,
      });

      const { newRepo, repositories, errorMessage } = this.state;

      const repoExist = this.state.repositories.filter(repo => {
        return repo.name.toLocaleLowerCase() == newRepo.toLocaleLowerCase();
      });

      // Verifica se esse repo já não está na listagem
      if (repoExist.length) {
        throw new Error('Repositório duplicado');
      }

      // Busca info do repositório no git
      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
        owner: {
          avatar_url: response.data.owner.avatar_url,
          login: response.data.owner.login,
        },
        forks: response.data.forks,
      };

      this.setState({
        newRepo: '',
        loading: false,
        repositories: [...repositories, data],
      });
    } catch (e) {
      // repositório não existe ou já foi adicionado
      this.setState({
        error: true,
        loading: false,
        errorMessage: String(e).includes('Repositório duplicado')
          ? 'Repositório duplicado'
          : 'Repositório não encontrado!',
      });
    }
  };

  render() {
    const { newRepo, loading, repositories, error, errorMessage } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adicionar Repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading.value}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
              <div>
                <span>{repository.name}</span>
                <LinkButton
                  to={`/repository/${encodeURIComponent(repository.name)}`}
                >
                  Ver Detalhes
                </LinkButton>
              </div>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
