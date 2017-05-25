/* eslint-disable jsx-a11y/accessible-emoji */
import { h } from 'preact';
import { Component } from 'preact-compat';
import PropTypes from 'prop-types';
import todoPropType from './todoPropType';
import UpdateTodoForm from './UpdateTodoForm';

// export default class EditTodoForm extends PureComponent {
export default class EditTodoForm extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.focusTextField();
  }

  shouldComponentUpdate(nextProps) {
    return !(
      this.props.todo === nextProps.todo &&
      this.props.updateTodo === nextProps.updateTodo
    );
  }

  componentDidUpdate() {
    this.focusTextField();
  }

  onSubmit(event) {
    const text = this.refInput.value;
    this.props.updateTodo({
      ...this.props.todo,
      text,
      editMode: false
    });
    event.preventDefault();
  }

  focusTextField() {
    this.refInput.select();
    this.refInput.focus();
  }

  render(props) {
    const newTodo = {
      ...props.todo,
      editMode: false
    };
    const fields = [ 'text' ];
    return <UpdateTodoForm
      todo={newTodo}
      fields={fields}
      onSubmit={this.onSubmit}
    >
      <label>
        <span className='accessible-hidden'>Edit todo:</span>
        <input
          ref={(input) => { this.refInput = input; }}
          type='text'
          name='text'
          defaultValue={newTodo.text}
          placeholder='e.g., do the laundry'
          className='EditTodoForm__input'
        />
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
