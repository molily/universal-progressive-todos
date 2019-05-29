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
    const { todo, updateTodo } = this.props;
    const text = this.refInput.value;
    updateTodo({
      ...todo,
      text,
      editMode: false
    });
    event.preventDefault();
  }

  focusTextField() {
    this.refInput.select();
    this.refInput.focus();
  }

  render() {
    const { todo } = this.props;
    const newTodo = {
      ...todo,
      editMode: false
    };
    const fields = [ 'text' ];
    return (
      <UpdateTodoForm
        todo={newTodo}
        fields={fields}
        onSubmit={this.onSubmit}
      >
        <label htmlFor='EditTodoForm__input'>
          <span className='accessible-hidden'>Edit todo:</span>
          <input
            ref={(input) => { this.refInput = input; }}
            type='text'
            name='text'
            defaultValue={newTodo.text}
            placeholder='e.g., do the laundry'
            className='EditTodoForm__input'
            id='EditTodoForm__input'
          />
        </label>
        <button type='submit' className='EditTodoForm__submitButton'>
          <span role='img' aria-label=''>💾 </span>
          Save
        </button>
      </UpdateTodoForm>
    );
  }
}

EditTodoForm.propTypes = {
  todo: todoPropType.isRequired,
  updateTodo: PropTypes.func.isRequired
};
