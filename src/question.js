import React, { Component, PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';
import Spinner from 'react-spinkit';
import htmlentities from 'he';
import Answer from './answer';
import SearchError from './search-error';
import Owner from './owner';
import KeyboardNav from './keyboard-nav';
import { get } from './search';

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      error: {
        message: null,
        type: null,
      },
    }
  }

  async componentDidMount() {
    try {
      const res = await get(this.props.question.question_id, true);
      this.setState({ answers: res.body.items });
    } catch (err) {
      this.setState({ error: { message: err, type: 'api' }});
    }
  }

  renderAnswers() {
    return this.state.answers.map((answer, idx) => (
      <Answer answer={answer} key={idx} />
    ));
  }

  renderSpinner() {
    const { answers } = this.state;
    if (! this.state.answers.length) {
      return <Spinner spinnerName='double-bounce' noFadeIn />;
    }
  }

  renderTags() {
    return this.props.question.tags.map(tag => (
      <a className='tag link-tag' key={tag}>{tag}</a>
    ));
  }

  renderBody() {
    const { question, goBack } = this.props;

    return (
      <div key='-1'>
        <div className='card is-small' tabIndex='1'>
          <div className='card-header'>
            <span className='card-header-title'>{htmlentities.decode(question.title)}</span>
          </div>

          <div className='card-content'>
            <div className='content'>
              <ReactMarkdown source={question.body} />
                <Owner owner={question.owner} />
                {this.renderTags()}
            </div>
          </div>

          <footer className='card-footer'>
            <a className='card-footer-item' onClick={goBack}>Go Back</a>
            <a className='card-footer-item' href={question.link}>Open in Browser</a>
          </footer>
        </div>

        <hr />
      </div>
    )
  }

  render() {
    const { error } = this.state;
    if (error.message) {
      return <SearchError
        error={error.message}
        type={error.type} />;
    }

    const elements = [this.renderBody(), ...this.renderAnswers()];

    return (
      <div>
        <KeyboardNav goBack={this.props.goBack} focus>
          {elements}
        </KeyboardNav>
        {this.renderSpinner()}
      </div>
    )
  }
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
  goBack: PropTypes.func.isRequired,
}
