import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import api from '../../services/api';
import Container from '../../components/Container/index';
import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = { newRepo: '', repositories: [], loading: false };

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
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    const { newRepo, repositories } = this.state;
    const response = await api.get(`/repos/${newRepo}`);
    console.log(response.data);
    const data = {
      name: response.data.full_name,
      owner: {
        avatar_url: response.data.owner.avatar_url,
        login: response.data.owner.login,
      },
    };

    const repoExist = this.state.repositories.filter(repo => {
      return repo.name == newRepo;
    });

    const dataToUpdate = {
      newRepo: '',
      loading: false,
      repositories: [...repositories],
    };

    if (!repoExist.length) dataToUpdate.repositories = [...repositories, data];

    this.setState(dataToUpdate);
  };

  render() {
    const { newRepo, loading, repositories } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit}>
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
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
              <div>
                <span>{repository.name}</span>
                <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                  Detalhes
                </Link>
              </div>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
