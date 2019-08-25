import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import api from '../../services/api';
import {
  Loading,
  Owner,
  IssueList,
  ButtonPrevious,
  ButtonNext,
  ButtonFilter,
  ButtonRow,
} from './styles';
import Container from '../../components/Container/index';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    state: 'all',
    repoName: '',
    page: 1,
  };

  async componentDidUpdate(_, prevState) {
    const { state, repoName, page } = this.state;

    if (prevState.state !== state) {
      const issues = await api.get(`/repos/${repoName}/issues`, {
        params: {
          state: state,
          per_page: 30,
          page: page,
        },
      });

      this.setState({
        issues: issues.data,
        loading: false,
      });
    }
  }

  handleChangePage = async page => {
    const { state, repoName } = this.state;

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: state,
        per_page: 30,
        page: page,
      },
    });

    this.setState({
      issues: issues.data,
      loading: false,
      page: page,
    });
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const { page } = this.state;

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: this.state.state,
          per_page: 30,
          page: page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
      repoName: repoName,
    });
  }

  handleSelectChange = e => {
    this.setState({ state: e, page: 1 });
  };

  render() {
    const { repository, issues, loading, page, state } = this.state;

    if (loading) return <Loading>Carregando..</Loading>;

    return (
      <Container>
        <Owner>
          <Link to="/">
            <FaArrowLeft></FaArrowLeft>
            Voltar aos repositórios
          </Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <ButtonRow>
          <ButtonFilter
            onClick={() => this.handleSelectChange('all')}
            enabled={state === 'all'}
          >
            Todas
          </ButtonFilter>

          <ButtonFilter
            onClick={() => this.handleSelectChange('open')}
            enabled={state === 'open'}
          >
            Abertas
          </ButtonFilter>

          <ButtonFilter
            onClick={() => this.handleSelectChange('closed')}
            enabled={state === 'closed'}
          >
            Fechadas
          </ButtonFilter>
        </ButtonRow>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <ButtonPrevious
          onClick={() => this.handleChangePage(page - 1)}
          disabled={page === 1}
        >
          Anterior
        </ButtonPrevious>
        <ButtonNext
          onClick={() => this.handleChangePage(page + 1)}
          disabled={!issues.length}
        >
          Próxima
        </ButtonNext>
      </Container>
    );
  }
}
