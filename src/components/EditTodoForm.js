import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import todoPropType from './todoPropType';
import UpdateTodoForm from './UpdateTodoForm';

export default class EditTodoForm extends PureComponent {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.focusTextField();
  }

  componentDidUpdate() {
    this.focusTextField();
  }

  onSubmit(event) {
    const text = this.refs.text.value;
    this.props.updateTodo({
      ...this.props.todo,
      text,
      editMode: false
    });
    event.preventDefault();
  }

  focusTextField() {
    const { text } = this.refs;
    text.select();
    text.focus();
  }

  render() {
    const newTodo = {
      ...this.props.todo,
      editMode: false
    };
    const fields = [ 'text' ];
    return <UpdateTodoForm todo={newTodo} fields={fields}
      onSubmit={this.onSubmit}>
      <label>
        <span className='accessible-hidden'>Edit todo:</span>
        {/*
        autofocus will not be in the server-rendered markup:
        https://github.com/facebook/react/issues/3066
        */}
        <input ref='text' type='text' name='text' defaultValue={newTodo.text}
          placeholder='e.g., do the laundry' className='EditTodoForm__input' />
      </label>
      <button type='submit' className='EditTodoForm__submitButton'>
        💾 Save
      </button>
    </UpdateTodoForm>;
  }

}

EditTodoForm.propTypes = {
  todo: todoPropType.isRequired,
  updateTodo: PropTypes.func.isRequired
};
